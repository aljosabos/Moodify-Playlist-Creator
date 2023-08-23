import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";
import Playlist from "./Playlist/Playlist";
import { useState, useEffect, useMemo } from "react";
import { ITrack, Mood } from "../../types/types";
import { TrackContext } from "../../context/CurrentTrackIndexContext";
import { getFavoriteTracksInfo } from "../../assets/helpers";
import { energeticTracks } from "../../assets/energeticTracks";
import { sadTracks } from "../../assets/sadTracks";
import { happyTracks } from "../../assets/happyTracks";
import { relaxedTracks } from "../../assets/relaxedTracks";

export default function MoodifyPlaylistCreator() {
  const [mood, setMood] = useState<Mood>(Mood.Happy);
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [refreshPlaylist, setRefreshPlaylist] = useState<boolean>(false);

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
      setTracks(moodTrackArrays[mood]);
    } else {
      const favoriteTracksInfo = getFavoriteTracksInfo();

      const favoriteTracks = favoriteTracksInfo.map(
        ({ mood, id }) =>
          moodTrackArrays[mood].filter((track) => track.id === id)[0]
      );
      setTracks(favoriteTracks);
    }
  }, [mood, refreshPlaylist]);

  useEffect(() => {
    if (refreshPlaylist) setRefreshPlaylist(false);
  }, [refreshPlaylist]);

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
        }}
      >
        <Player {...{ tracks, mood }} />
        <MoodSelector {...{ changeMood }} />
        <Playlist {...{ tracks, mood }} />
      </TrackContext.Provider>
    </div>
  );
}
