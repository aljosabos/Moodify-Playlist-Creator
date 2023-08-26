import { energeticTracks } from "./energeticTracks";
import { happyTracks } from "./happyTracks";
import { relaxedTracks } from "./relaxedTracks";
import { sadTracks } from "./sadTracks";

export const SKIP_TIME = 15;
export const VOLUME_OFF = 5;
export const VOLUME_LOW = 40;

export const FAVORITES = "favorites";
export const EMOJIS = "emojis";

export const MEDIUM_WIDTH = 840;
export const SMALL_WIDTH = 600;

export const playlists = {
  energetic: energeticTracks,
  sad: sadTracks,
  happy: happyTracks,
  relaxed: relaxedTracks,
};

export const INITIAL_EMOJIS = {
  happy: "😄",
  sad: "😢",
  relaxed: "😎",
  energetic: "😎",
  favorites: "🌟",
};
