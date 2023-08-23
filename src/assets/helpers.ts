import moment from "moment";
import { IPlaylists, ITrackInfo, Mood } from "../types/types";
import { FAVORITES } from "./constants";

export const formatSecondsToSongTime = (totalSeconds: number) => {
  const duration = moment.duration(totalSeconds, "seconds");

  const minutes = duration.minutes();
  const seconds =
    duration.seconds() < 10 ? "0" + duration.seconds() : duration.seconds();
  return `${minutes}:${seconds}`;
};

export const getFavoriteTracksInfo = (): ITrackInfo[] => {
  const JSONTracks = localStorage.getItem(FAVORITES);
  if (JSONTracks !== null) {
    return JSON.parse(JSONTracks);
  } else {
    return [];
  }
};

export const saveFavoriteTracksInfo = (tracksInfo: ITrackInfo[]) => {
  localStorage.setItem(FAVORITES, JSON.stringify(tracksInfo));
};

export const getFavoriteTracks = (playlists: IPlaylists) => {
  const favoriteTracksInfo = getFavoriteTracksInfo();

  return favoriteTracksInfo.map(
    ({ mood, id }) => playlists[mood].filter((track) => track.id === id)[0]
  );
};

export const checkIsTrackInFavorites = (mood: Mood, songId: string) => {
  const favoriteTracksIDS = getFavoriteTracksInfo()
    .filter((info) => info.mood === mood)
    .map((info) => info.id);

  return favoriteTracksIDS.includes(songId);
};
