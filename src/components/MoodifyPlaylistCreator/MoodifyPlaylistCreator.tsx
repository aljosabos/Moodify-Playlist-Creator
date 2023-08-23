import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";
import Playlist from "./Playlist/Playlist";
import { useState, useEffect, useMemo } from "react";
import { IPlaylists, ITrack, Mood } from "../../types/types";
import { TrackContext } from "../../context/TrackContext";
import {
  getFavoriteTracksInfo,
  mapFavoriteTracksInfoToFavoriteTracks,
} from "../../assets/helpers";
import { playlists } from "../../assets/constants";

export default function MoodifyPlaylistCreator() {
  const trackPlaylists: IPlaylists = useMemo(() => playlists, []);

  const [mood, setMood] = useState<Mood>(Mood.Happy);
  const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>([]);
  const [playerTracks, setPlayerTracks] = useState<ITrack[]>(playlists.happy);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [refreshPlaylist, setRefreshPlaylist] = useState<boolean>(false);
  const [trackChanged, setTrackChanged] = useState<boolean>(false);

  useEffect(() => {
    if (mood !== Mood.Favorites) {
      setPlaylistTracks(trackPlaylists[mood]);
    } else {
      const favoriteTracks =
        mapFavoriteTracksInfoToFavoriteTracks(trackPlaylists);
      setPlaylistTracks(favoriteTracks);
    }
  }, [mood, refreshPlaylist]);

  useEffect(() => {
    if (refreshPlaylist) setRefreshPlaylist(false);
  }, [refreshPlaylist]);

  useEffect(() => {
    if (trackChanged) setTrackChanged(false);
  }, [trackChanged]);

  useEffect(() => {
    if (mood !== Mood.Favorites) {
      setPlayerTracks(trackPlaylists[mood]);
    } else {
      const favoriteTracks =
        mapFavoriteTracksInfoToFavoriteTracks(trackPlaylists);
      setPlayerTracks(favoriteTracks);
    }
  }, [trackChanged]);

  const changeMood = (mood: Mood) => {
    setMood(mood);
  };

  return (
    <div className="Root">
      <TrackContext.Provider
        value={{
          currentTrackIndex,
          setCurrentTrackIndex,
          refreshPlaylist,
          setRefreshPlaylist,
          trackChanged,
          setTrackChanged,
        }}
      >
        <Player tracks={playerTracks} />
        <MoodSelector changeMood={changeMood} />
        <Playlist tracks={playlistTracks} mood={mood} />
      </TrackContext.Provider>
    </div>
  );
}
