import { playlists } from "../assets/constants";
import { getFavoriteTracks } from "../assets/helpers";
import { IPlaylists, ITrack, Mood } from "../types/types";
import { useEffect, useMemo } from "react";

export const useSetTracks = (
  setState: React.Dispatch<React.SetStateAction<ITrack[]>>,
  mood: Mood,
  dependencies: (Mood | boolean)[],
  callback?: (mood: Mood) => void
) => {
  const allPlaylists: IPlaylists = useMemo(() => playlists, []);

  useEffect(() => {
    if (mood !== Mood.Favorites) {
      setState(allPlaylists[mood]);
      if (callback) callback(mood);
    } else {
      const favoriteTracks = getFavoriteTracks(allPlaylists);
      setState(favoriteTracks);
      if (callback) callback(Mood.Favorites);
    }
  }, [...dependencies]);
};
