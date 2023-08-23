import { playlists } from "../assets/constants";
import { getFavoriteTracks } from "../assets/helpers";
import { IPlaylists, ITrack, Mood } from "../types/types";
import { useEffect, useMemo } from "react";

export const useSetTracks = (
  setState: React.Dispatch<React.SetStateAction<ITrack[]>>,
  dependencies: (Mood | boolean)[],
  mood: Mood
) => {
  const allPlaylists: IPlaylists = useMemo(() => playlists, []);

  useEffect(() => {
    if (mood !== Mood.Favorites) {
      setState(allPlaylists[mood]);
    } else {
      const favoriteTracks = getFavoriteTracks(allPlaylists);
      setState(favoriteTracks);
    }
  }, [...dependencies]);
};
