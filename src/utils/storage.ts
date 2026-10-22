import type { MediaContent } from '../data/types';

const DB_NAME = 'night-kit-db';
const STORE_NAME = 'files';
const META_KEY = 'meta';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result as T);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbDelete(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbKeys(): Promise<string[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAllKeys();
    req.onsuccess = () => resolve(req.result as string[]);
    req.onerror = () => reject(req.error);
  });
}

// Upload item metadata (without blob URLs)
interface StoredItem {
  id: string;
  type: string;
  caption: string;
  hasBlob: boolean;
  textUrl?: string;
}

// Store a file: blob in IndexedDB, return metadata
export async function storeFile(file: File, type: string): Promise<MediaContent> {
  const id = `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await idbSet(`blob-${id}`, file);

  const caption = file.name.replace(/\.[^.]+$/, '');
  return { id, type: type as MediaContent['type'], url: '', caption };
}

// Store text content
export function makeTextContent(text: string, caption: string): MediaContent {
  const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return { id, type: 'text', url: text, caption };
}

// Get blob URL for a stored file
export async function getBlobUrl(id: string): Promise<string | null> {
  try {
    const blob = await idbGet<File>(`blob-${id}`);
    if (blob) return URL.createObjectURL(blob);
  } catch {}
  return null;
}

// Save the meta index
export async function saveUploads(data: Record<string, MediaContent[]>): Promise<void> {
  // Separate file-backed items from text items
  const meta: Record<string, StoredItem[]> = {};
  const textStore: Record<string, string> = {};

  for (const [sceneId, items] of Object.entries(data)) {
    meta[sceneId] = items.map(item => {
      if (item.type === 'text') {
        textStore[`text-${item.id}`] = item.url;
        return { id: item.id, type: item.type, caption: item.caption || '', hasBlob: false, textUrl: `text-${item.id}` };
      }
      return { id: item.id, type: item.type, caption: item.caption || '', hasBlob: true };
    });
  }

  await idbSet(META_KEY, meta);

  // Store text contents
  const existingKeys = await idbKeys();
  for (const key of existingKeys) {
    if (key.startsWith('text-') || key.startsWith('blob-')) {
      // Keep existing
    }
  }
  for (const [key, val] of Object.entries(textStore)) {
    await idbSet(key, val);
  }
}

// Load all uploads, resolving blob URLs
export async function loadUploads(): Promise<Record<string, MediaContent[]>> {
  try {
    const meta = await idbGet<Record<string, StoredItem[]>>(META_KEY);
    if (!meta) return {};

    const result: Record<string, MediaContent[]> = {};
    for (const [sceneId, items] of Object.entries(meta)) {
      const resolved: MediaContent[] = [];
      for (const item of items) {
        if (item.type === 'text') {
          const text = await idbGet<string>(`text-${item.id}`);
          resolved.push({ id: item.id, type: 'text', url: text || '', caption: item.caption });
        } else {
          const blobUrl = await getBlobUrl(item.id);
          if (blobUrl) {
            resolved.push({
              id: item.id,
              type: item.type as MediaContent['type'],
              url: blobUrl,
              caption: item.caption,
              thumbnail: item.type === 'photo' ? blobUrl : undefined,
            });
          }
        }
      }
      result[sceneId] = resolved;
    }
    return result;
  } catch (e) {
    console.error('Failed to load uploads:', e);
    return {};
  }
}

// Delete a specific item
export async function deleteItem(id: string): Promise<void> {
  await idbDelete(`blob-${id}`);
  await idbDelete(`text-${id}`);
}

// Check available storage estimate
export async function getStorageEstimate(): Promise<string> {
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const { usage = 0, quota = 0 } = await navigator.storage.estimate();
      const usedMB = (usage / 1024 / 1024).toFixed(1);
      const quotaMB = (quota / 1024 / 1024).toFixed(0);
      return `已用 ${usedMB}MB / 可用约 ${quotaMB}MB`;
    }
  } catch {}
  return '';
}
