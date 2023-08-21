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
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="Player">
      <div className="Player__content">
        <Track {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
        <Controls
          {...{ progressBarRef, audioRef, duration, setTimeProgress }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
}
