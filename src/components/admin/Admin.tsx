import React, { useState, useRef, useCallback, useEffect } from 'react';
import config from '../../data/config';
import type { MediaContent, MediaType } from '../../data/types';
import { storeFile, makeTextContent, loadUploads, saveUploads, deleteItem, getStorageEstimate, getBlobUrl } from '../../utils/storage';
import './Admin.css';

const Admin: React.FC = () => {
  const [activeScene, setActiveScene] = useState(config.scenes[0].id);
  const [uploads, setUploads] = useState<Record<string, MediaContent[]>>({});
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textName, setTextName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [storageInfo, setStorageInfo] = useState('');
  const [resolvedUrls, setResolvedUrls] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadedRef = useRef(false);

  const currentScene = config.scenes.find(s => s.id === activeScene)!;
  const uploadKey = activeScene;
  const currentUploads = uploads[uploadKey] || [];

  // Resolve blob URLs for preview
  useEffect(() => {
    const resolve = async () => {
      for (const item of currentUploads) {
        if (item.type !== 'text' && item.type !== 'photo' && !resolvedUrls[item.id]) {
          const url = await getBlobUrl(item.id);
          if (url) setResolvedUrls(prev => ({ ...prev, [item.id]: url }));
        }
      }
    };
    resolve();
  }, [currentUploads, resolvedUrls]);

  // Load from IndexedDB on mount
  useEffect(() => {
    (async () => {
      const data = await loadUploads();
      setUploads(data);
      loadedRef.current = true;
      const info = await getStorageEstimate();
      setStorageInfo(info);
    })();
  }, []);

  // Auto-save to IndexedDB after load
  useEffect(() => {
    if (loadedRef.current) {
      saveUploads(uploads);
      getStorageEstimate().then(setStorageInfo);
    }
  }, [uploads]);

  const getMediaType = (file: File): MediaType | null => {
    if (file.type.startsWith('image/')) return 'photo';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext || '')) return 'photo';
    if (['mp4', 'mov', 'webm'].includes(ext || '')) return 'video';
    if (['mp3', 'wav', 'm4a'].includes(ext || '')) return 'audio';
    if (['epub', 'pdf', 'mobi', 'azw', 'azw3'].includes(ext || '')) return 'document';
    return null;
  };

  const handleUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const newUploads: MediaContent[] = [];

    for (const file of Array.from(files)) {
      const type = getMediaType(file);
      if (!type) {
        alert(`不支持的文件格式: ${file.name}`);
        continue;
      }
      try {
        const content = await storeFile(file, type);
        newUploads.push(content);
      } catch (err) {
        console.error('Failed to store file:', file.name, err);
        alert(`保存失败: ${file.name}`);
      }
    }

    if (newUploads.length > 0) {
      setUploads(prev => ({
        ...prev,
        [uploadKey]: [...(prev[uploadKey] || []), ...newUploads],
      }));
    }
    setUploading(false);
  }, [uploadKey]);

  const addTextContent = () => {
    if (!textInput.trim()) return;
    const content = makeTextContent(textInput, textName || '');
    setUploads(prev => ({
      ...prev,
      [uploadKey]: [...(prev[uploadKey] || []), content],
    }));
    setTextInput('');
    setTextName('');
    setShowTextInput(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleUpload(e.dataTransfer.files);
  }, [handleUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeUpload = (id: string) => {
    deleteItem(id);
    setUploads(prev => ({
      ...prev,
      [uploadKey]: (prev[uploadKey] || []).filter(u => u.id !== id),
    }));
  };

  const updateCaption = (id: string, caption: string) => {
    setUploads(prev => ({
      ...prev,
      [uploadKey]: (prev[uploadKey] || []).map(u =>
        u.id === id ? { ...u, caption } : u
      ),
    }));
  };

  const moveItem = (id: string, direction: -1 | 1) => {
    setUploads(prev => {
      const items = [...(prev[uploadKey] || [])];
      const idx = items.findIndex(u => u.id === id);
      if (idx === -1) return prev;
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= items.length) return prev;
      [items[idx], items[newIdx]] = [items[newIdx], items[idx]];
      return { ...prev, [uploadKey]: items };
    });
  };

  return (
    <div className="admin">
      <header className="admin__header">
        <h1>黑夜急救箱 · 内容管理</h1>
        <p className="admin__subtitle">为每个情绪入口上传朋友留下的内容</p>
        {storageInfo && <p className="admin__storage">{storageInfo}</p>}
      </header>

      <div className="admin__layout">
        {/* Scene selector */}
        <nav className="admin__scenes">
          <h2>情绪入口</h2>
          {config.scenes.map(scene => (
            <button
              key={scene.id}
              className={`admin__scene-btn ${activeScene === scene.id ? 'admin__scene-btn--active' : ''}`}
              onClick={() => setActiveScene(scene.id)}
            >
              {scene.title}
            </button>
          ))}
        </nav>

        {/* Content area */}
        <main className="admin__content">
          <div className="admin__scene-header">
            <h2>{currentScene.title}</h2>
            <span className="admin__object-type">物件: {currentScene.objectType}</span>
          </div>

          {/* Upload zone */}
          <div
            className="admin__upload-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.epub,.pdf,.mobi,.azw,.azw3"
              style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
              onChange={(e) => {
                console.log('files selected:', e.target.files?.length);
                handleUpload(e.target.files);
                e.target.value = '';
              }}
            />
            <div className="upload-zone__icon">{uploading ? '⏳' : '+'}</div>
            <p className="upload-zone__text">
              {uploading ? '上传中...' : '拖拽文件到这里，或点击选择'}
            </p>
            <p className="upload-zone__hint">
              支持 图片 / 视频 / 音频 / PDF / EPUB / MOBI
            </p>
          </div>

          {/* Add text button */}
          <button
            className="admin__add-text-btn"
            onClick={() => setShowTextInput(!showTextInput)}
          >
            {showTextInput ? '取消' : '+ 添加文字'}
          </button>

          {/* Text input */}
          {showTextInput && (
            <div className="admin__text-form">
              <input
                className="admin__text-name"
                placeholder="署名（可选）"
                value={textName}
                onChange={(e) => setTextName(e.target.value)}
              />
              <textarea
                className="admin__text-body"
                placeholder="写下想说的话..."
                rows={6}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <button className="admin__text-submit" onClick={addTextContent}>
                保存
              </button>
            </div>
          )}

          {/* Uploaded items */}
          {currentUploads.length > 0 && (
            <div className="admin__uploads">
              <h3>已上传 ({currentUploads.length})</h3>
              {currentUploads.map((item, i) => (
                <div key={item.id} className="upload-item">
                  <div className="upload-item__preview">
                    {item.type === 'photo' && (
                      <img src={resolvedUrls[item.id] || item.thumbnail} alt="" />
                    )}
                    {item.type === 'video' && resolvedUrls[item.id] && (
                      <video src={resolvedUrls[item.id]} muted preload="metadata" />
                    )}
                    {item.type === 'audio' && (
                      <div className="upload-item__audio-icon">🎵</div>
                    )}
                    {item.type === 'text' && (
                      <div className="upload-item__text-preview">
                        {item.url.split('\n').slice(0, 3).join(' ')}
                      </div>
                    )}
                    {item.type === 'document' && (
                      <div className="upload-item__audio-icon">📄</div>
                    )}
                  </div>
                  <div className="upload-item__info">
                    <input
                      className="upload-item__caption"
                      placeholder={item.type === 'text' ? '署名（可选）' : '添加说明（可选）'}
                      value={item.caption || ''}
                      onChange={(e) => updateCaption(item.id, e.target.value)}
                    />
                    <div className="upload-item__meta">
                      <span className="upload-item__type">
                        {item.type === 'photo' && '照片'}
                        {item.type === 'video' && '视频'}
                        {item.type === 'audio' && '语音'}
                        {item.type === 'text' && '文字'}
                        {item.type === 'document' && '文档'}
                      </span>
                      {item.type === 'audio' && resolvedUrls[item.id] && (
                        <audio src={resolvedUrls[item.id]} controls preload="metadata" className="upload-item__audio-player" />
                      )}
                    </div>
                  </div>
                  <div className="upload-item__actions">
                    <button
                      onClick={() => moveItem(item.id, -1)}
                      disabled={i === 0}
                      title="上移"
                    >↑</button>
                    <button
                      onClick={() => moveItem(item.id, 1)}
                      disabled={i === currentUploads.length - 1}
                      title="下移"
                    >↓</button>
                    <button
                      className="upload-item__delete"
                      onClick={() => removeUpload(item.id)}
                      title="删除"
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Export button */}
          <div className="admin__export">
            <button className="admin__export-btn" onClick={() => {
              const data = JSON.stringify(uploads, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'night-kit-content.json';
              a.click();
            }}>
              导出内容数据
            </button>
            <button className="admin__export-btn admin__export-btn--secondary" onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.json';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  try {
                    const data = JSON.parse(ev.target?.result as string);
                    setUploads(data);
                  } catch {
                    alert('JSON 格式不正确');
                  }
                };
                reader.readAsText(file);
              };
              input.click();
            }}>
              导入内容数据
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
