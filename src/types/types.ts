export interface ITrack {
  id: string;
  title: string;
  src: string;
  author: string;
  cover: string;
}

export interface ITrackInfo {
  mood: string;
  id: string;
}

export interface IEmoji {
  mood: string;
  emoji: string;
}

export interface IPlaylists {
  [key: string]: ITrack[];
}

export enum Mood {
  Happy = "happy",
  Sad = "sad",
  Relaxed = "relaxed",
  Energetic = "energetic",
  Favorites = "favorites",
}

export declare enum EmojiStyle {
  NATIVE = "native",
  APPLE = "apple",
  TWITTER = "twitter",
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

export declare enum SkinTones {
  NEUTRAL = "neutral",
  LIGHT = "1f3fb",
  MEDIUM_LIGHT = "1f3fc",
  MEDIUM = "1f3fd",
  MEDIUM_DARK = "1f3fe",
  DARK = "1f3ff",
}

export interface EmojiClickData {
  activeSkinTone: SkinTones;
  unified: string;
  unifiedWithoutSkinTone: string;
  emoji: string;
  names: string[];
  getImageUrl: (emojiStyle: EmojiStyle) => string;
}

export type MoodEnumKey = keyof typeof Mood;
