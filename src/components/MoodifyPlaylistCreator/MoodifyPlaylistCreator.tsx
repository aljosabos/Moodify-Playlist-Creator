import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";
import Playlist from "./Playlist/Playlist";
import { useState, useEffect } from "react";
import { ITrack } from "../../types/types";
import { CurrentTrackIndexContext } from "../../context/CurrentTrackIndexContext";

export default function MoodifyPlaylistCreator() {
  const [mood, setMood] = useState("happy");
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  useEffect(() => {
    const path = `../../assets/${mood}Tracks`;

    import(path).then((module) => {
      setTracks(module[mood + "Tracks"]);
    });
  }, [mood]);

  const changeMood = (mood: string) => {
    setMood(mood);
  };

  return (
    <div className="Root">
      <CurrentTrackIndexContext.Provider
        value={{ currentTrackIndex, setCurrentTrackIndex }}
      >
        <Player {...{ tracks, mood }} />
        <MoodSelector {...{ changeMood }} />
        <Playlist {...{ tracks, mood }} />
      </CurrentTrackIndexContext.Provider>
    </div>
  );
}
