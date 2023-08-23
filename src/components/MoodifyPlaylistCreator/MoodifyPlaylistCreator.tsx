import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";
import Playlist from "./Playlist/Playlist";
import { useState, useEffect } from "react";
import { ITrack, Mood } from "../../types/types";
import { TrackContext } from "../../context/TrackContext";
import { playlists } from "../../assets/constants";
import { useSetTracks } from "../../hooks/useSetTracks";

export default function MoodifyPlaylistCreator() {
  const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>([]);
  const [playerTracks, setPlayerTracks] = useState<ITrack[]>(playlists.happy);
  const [mood, setMood] = useState<Mood>(Mood.Happy);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [refreshPlaylist, setRefreshPlaylist] = useState<boolean>(false);
  const [trackChanged, setTrackChanged] = useState<boolean>(false);

  useSetTracks(setPlayerTracks, [trackChanged], mood);
  useSetTracks(setPlaylistTracks, [mood, refreshPlaylist], mood);

  useEffect(() => {
    if (refreshPlaylist) setRefreshPlaylist(false);
  }, [refreshPlaylist]);

  useEffect(() => {
    if (trackChanged) setTrackChanged(false);
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
