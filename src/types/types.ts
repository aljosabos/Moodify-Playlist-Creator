export interface ITrack {
  id: string;
  title: string;
  src: string;
  author: string;
}

export interface ITrackInfo {
  mood: string;
  id: string;
}

export enum Mood {
  Happy = "happy",
  Sad = "sad",
  Relaxed = "relaxed",
  Energetic = "energetic",
  Favorites = "favorites",
}
