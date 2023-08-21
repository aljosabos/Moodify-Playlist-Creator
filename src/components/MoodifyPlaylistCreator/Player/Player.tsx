import { useState, useRef, useEffect } from "react";
import Controls from "./Controls/Controls";
import ProgressBar from "./ProgressBar/ProgressBar";
import Track from "./Track/Track";
import { happyTracks } from "../../../assets/happyTracks";
import { ICurrentTrack } from "../../../types/types";
import "./Player.scss";

export default function Player() {
  const playlistLength = happyTracks.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<ICurrentTrack>(
    happyTracks[trackIndex]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCurrentTrack(happyTracks[trackIndex]);
  }, [trackIndex]);


  return (
    <div className="Player">
      <div className="Player__content">
        <Track {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
        <Controls
          {...{
            progressBarRef,
            audioRef,
            duration,
            setTimeProgress,
            trackIndex,
            setTrackIndex,
            playlistLength,
            setCurrentTrack,
            setDuration
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
}
