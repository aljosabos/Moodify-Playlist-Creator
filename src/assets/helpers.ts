import moment from "moment";
import { IPlaylists, ITrackInfo } from "../types/types";

export const formatSecondsToSongDuration = (totalSeconds: number) => {
  const duration = moment.duration(totalSeconds, "seconds");

  const minutes = duration.minutes();
  const seconds =
    duration.seconds() < 10 ? "0" + duration.seconds() : duration.seconds();
  return `${minutes}:${seconds}`;
};

export const getFavoriteTracksInfo = (): ITrackInfo[] => {
  const JSONTracks = localStorage.getItem("favorites");
  if (JSONTracks !== null) {
    return JSON.parse(JSONTracks);
  } else {
    return [];
  }
};

export const saveFavoriteTracksInfo = (tracksInfo: ITrackInfo[]) => {
  localStorage.setItem("favorites", JSON.stringify(tracksInfo));
};

export const mapFavoriteTracksInfoToFavoriteTracks = (
  playlists: IPlaylists
) => {
  const favoriteTracksInfo = getFavoriteTracksInfo();

  return favoriteTracksInfo.map(
    ({ mood, id }) => playlists[mood].filter((track) => track.id === id)[0]
  );
};
