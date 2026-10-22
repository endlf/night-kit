export type MediaType = 'photo' | 'video' | 'audio' | 'text' | 'document';

export interface MediaContent {
  id: string;
  type: MediaType;
  url: string;
  caption?: string;
  thumbnail?: string;
}

export interface FriendContent {
  name: string;
  avatar?: string;
  contents: MediaContent[];
}

export interface EmotionScene {
  id: string;
  title: string;
  objectType: 'album' | 'projector' | 'plaque' | 'radio' | 'friends' | 'hug' | 'fire' | 'box' | 'simple';
  description?: string;
  friends: FriendContent[];
}

export interface BirthdaySurprise {
  photos: MediaContent[];
  videos: MediaContent[];
  audios: MediaContent[];
  message: string;
}

export interface CharacterLine {
  name: string;
  lines: string[];
}

export interface AppConfig {
  friends: {
    name: string;
    avatar?: string;
  }[];
  birthdayName?: string;
  birthdayDate?: string;
  birthdayMessage?: string;
  characters: CharacterLine[];
  scenes: EmotionScene[];
  birthdaySurprise: BirthdaySurprise;
}

export type AppPhase = 'dark' | 'campfire' | 'emotion' | 'birthday';

export type CampfireState = 'normal' | 'dimmed';
