import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";
import Playlist from "./Playlist/Playlist";
import { useState, useEffect, useMemo } from "react";
import { ITrack, Mood } from "../../types/types";
import { TrackContext } from "../../context/TrackContext";
import { getFavoriteTracksInfo } from "../../assets/helpers";
import { energeticTracks } from "../../assets/energeticTracks";
import { sadTracks } from "../../assets/sadTracks";
import { happyTracks } from "../../assets/happyTracks";
import { relaxedTracks } from "../../assets/relaxedTracks";

export default function MoodifyPlaylistCreator() {
  const [mood, setMood] = useState<Mood>(Mood.Happy);
  const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>([]);
  const [playerTracks, setPlayerTracks] = useState<ITrack[]>(happyTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [refreshPlaylist, setRefreshPlaylist] = useState<boolean>(false);
  const [trackChanged, setTrackChanged] = useState<boolean>(false);

  const moodTrackArrays: { [key: string]: ITrack[] } = useMemo(
    () => ({
      energetic: energeticTracks,
      sad: sadTracks,
      happy: happyTracks,
      relaxed: relaxedTracks,
    }),
    []
  );

  useEffect(() => {
    if (mood !== Mood.Favorites) {
      setPlaylistTracks(moodTrackArrays[mood]);
    } else {
      const favoriteTracksInfo = getFavoriteTracksInfo();

      const favoriteTracks = favoriteTracksInfo.map(
        ({ mood, id }) =>
          moodTrackArrays[mood].filter((track) => track.id === id)[0]
      );
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
      setPlayerTracks(moodTrackArrays[mood]);
    } else {
      const favoriteTracksInfo = getFavoriteTracksInfo();

      const favoriteTracks = favoriteTracksInfo.map(
        ({ mood, id }) =>
          moodTrackArrays[mood].filter((track) => track.id === id)[0]
      );
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
