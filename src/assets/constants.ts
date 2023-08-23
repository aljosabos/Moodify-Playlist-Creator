import { energeticTracks } from "./energeticTracks";
import { happyTracks } from "./happyTracks";
import { relaxedTracks } from "./relaxedTracks";
import { sadTracks } from "./sadTracks";

export const SKIP_TIME = 15;
export const VOLUME_OFF = 5;
export const VOLUME_LOW = 40;

export const playlists = {
  energetic: energeticTracks,
  sad: sadTracks,
  happy: happyTracks,
  relaxed: relaxedTracks,
};
