import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";
import Playlist from "./Playlist/Playlist";
import { useState, useEffect } from "react";
import { ITrack } from "../../types/types";

export default function MoodifyPlaylistCreator() {
  const [mood, setMood] = useState("happy");
  const [tracks, setTracks] = useState<ITrack[]>([]);

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
      <Player />
      <MoodSelector {...{ changeMood }} />
      <Playlist {...{ tracks }} />
    </div>
  );
}
