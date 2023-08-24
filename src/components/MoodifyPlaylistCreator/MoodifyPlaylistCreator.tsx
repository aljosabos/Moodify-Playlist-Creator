import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";
import Playlist from "./Playlist/Playlist";
import { useState, useEffect } from "react";
import { ITrack, Mood } from "../../types/types";
import { TrackContext } from "../../context/TrackContext";
import { playlists } from "../../assets/constants";
import { useSetTracks } from "../../hooks/useSetTracks";
import { MoodContext } from "../../context/MoodContext";

export default function MoodifyPlaylistCreator() {
  const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>(
    playlists.happy
  );
  const [playerTracks, setPlayerTracks] = useState<ITrack[]>(playlists.happy);
  const [mood, setMood] = useState<Mood>(Mood.Happy);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [shouldRefreshPlaylists, setShouldRefreshPlaylists] =
    useState<boolean>(false);
  const [shouldRefreshMoods, setShouldRefreshMoods] = useState<boolean>(false);
  const [trackChanged, setTrackChanged] = useState<boolean>(false);

  useSetTracks(setPlayerTracks, [trackChanged], mood);
  useSetTracks(setPlaylistTracks, [mood, shouldRefreshPlaylists], mood);

  useEffect(() => {
    if (shouldRefreshPlaylists) setShouldRefreshPlaylists(false);
  }, [shouldRefreshPlaylists]);

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
          shouldRefreshPlaylists,
          setShouldRefreshPlaylists,
          trackChanged,
          setTrackChanged,
        }}
      >
        <MoodContext.Provider
          value={{ shouldRefreshMoods, setShouldRefreshMoods }}
        >
          <Player tracks={playerTracks} mood={mood} />
          <MoodSelector changeMood={changeMood} currentMood={mood} />
          <Playlist tracks={playlistTracks} mood={mood} />
        </MoodContext.Provider>
      </TrackContext.Provider>
    </div>
  );
}
