import { useState, useRef } from "react";
import Controls from "./Controls/Controls";
import ProgressBar from "./ProgressBar/ProgressBar";
import Track from "./Track/Track";
import { happyTracks } from "../../../assets/happyTracks";
import { ICurrentTrack } from "../../../types/types";
import "./Player.scss";

export default function Player() {
  const [currentTrack, setCurrentTrack] = useState<ICurrentTrack>(
    happyTracks[0]
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="Player">
      <div className="Player__content">
        <Track currentTrack={currentTrack} audioRef={audioRef} />
        <Controls audioRef={audioRef} />
        <ProgressBar />
      </div>
    </div>
  );
}
