import moment from "moment";
import { IPlaylists, ITrackInfo, Mood } from "../types/types";
import { FAVORITES, INITIAL_EMOJIS } from "./constants";
import { MutableRefObject } from "react";

export const formatSecondsToTrackTime = (totalSeconds: number) => {
  const duration = moment.duration(Math.floor(totalSeconds), "seconds");

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

export const getEmojis = () => {
  const emojisJSON = localStorage.getItem("emojis");

  if (emojisJSON) {
    return JSON.parse(emojisJSON);
  } else {
    return INITIAL_EMOJIS;
  }
};

export const getEmoji = (mood: Mood) => {
  const emojis = getEmojis();
  return emojis[mood];
};

export const saveEmoji = (emoji: string, mood: string) => {
  const emojis = getEmojis();

  const updatedEmojis = { ...emojis };
  updatedEmojis[mood] = emoji;
  localStorage.setItem("emojis", JSON.stringify(updatedEmojis));
};

export const capitalizeString = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const restartPlayback = (
  audioRef: MutableRefObject<HTMLAudioElement | null>
) => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }
};
