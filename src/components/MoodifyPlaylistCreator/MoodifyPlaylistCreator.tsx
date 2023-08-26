import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";
import Playlist from "./Playlist/Playlist";
import { useState, useEffect, useRef } from "react";
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
  const [selectedMood, setSelectedMood] = useState<Mood>(Mood.Happy);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentPlayingTrackId, setCurrentPlayingTrackId] =
    useState<string>("");
  const [shouldRefreshPlaylists, setShouldRefreshPlaylists] =
    useState<boolean>(false);
  const [shouldRefreshMoods, setShouldRefreshMoods] = useState<boolean>(false);
  const [isTrackSelected, setIsTrackSelected] = useState<boolean>(false);
  const [playerTracksMood, setPlayerTracksMood] = useState<Mood>(Mood.Happy);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const savePlayerTracksMood = (mood: Mood) => {
    setPlayerTracksMood(mood);
  };

  useSetTracks(
    setPlayerTracks,
    selectedMood,
    [isTrackSelected],
    savePlayerTracksMood
  );
  useSetTracks(setPlaylistTracks, selectedMood, [
    selectedMood,
    shouldRefreshPlaylists,
  ]);

  useEffect(() => {
    if (shouldRefreshPlaylists) setShouldRefreshPlaylists(false);
  }, [shouldRefreshPlaylists]);

  useEffect(() => {
    if (isTrackSelected) setIsTrackSelected(false);
  }, [isTrackSelected]);

  const changeMood = (mood: Mood) => {
    setSelectedMood(mood);
  };

  return (
    <div className="Root">
      <TrackContext.Provider
        value={{
          currentTrackIndex,
          setCurrentTrackIndex,
          shouldRefreshPlaylists,
          setShouldRefreshPlaylists,
          isPlaying,
          setIsPlaying,
          audioRef,
          isTrackSelected,
          setIsTrackSelected,
        }}
      >
        <MoodContext.Provider
          value={{ shouldRefreshMoods, setShouldRefreshMoods }}
        >
          <Player
            tracks={playerTracks}
            mood={selectedMood}
            setCurrentPlayingTrackId={setCurrentPlayingTrackId}
          />
          <MoodSelector changeMood={changeMood} selectedMood={selectedMood} />
          <Playlist
            tracks={playlistTracks}
            playlistMood={selectedMood}
            playerMood={playerTracksMood}
            currentPlayingTrackId={currentPlayingTrackId}
          />
        </MoodContext.Provider>
      </TrackContext.Provider>
    </div>
  );
}
