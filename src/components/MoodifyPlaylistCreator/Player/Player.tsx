import { useState, useRef, useEffect, useContext } from "react";
import Controls from "./Controls/Controls";
import ProgressBar from "./ProgressBar/ProgressBar";
import Track from "./Track/Track";
import { ITrack, Mood } from "../../../types/types";
import "./Player.scss";
import { TrackContext } from "../../../context/TrackContext";

interface IPlayerProps {
  tracks: ITrack[];
  mood: Mood;
}

export default function Player({ tracks, mood }: IPlayerProps) {
  const { currentTrackIndex } = useContext(TrackContext);

  const [currentTrack, setCurrentTrack] = useState<ITrack>();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (tracks) setCurrentTrack(tracks[currentTrackIndex]);
  }, [tracks, currentTrackIndex]);

  return (
    <div className="Player">
      <div className="Player__content">
        <Track
          {...{ currentTrack, audioRef, setDuration, progressBarRef, mood }}
        />

        <Controls
          {...{
            progressBarRef,
            audioRef,
            duration,
            setTimeProgress,
            playlistLength: tracks?.length,
            setDuration,
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
}
