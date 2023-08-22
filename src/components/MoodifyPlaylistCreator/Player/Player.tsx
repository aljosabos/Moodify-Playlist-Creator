import { useState, useRef, useEffect } from "react";
import Controls from "./Controls/Controls";
import ProgressBar from "./ProgressBar/ProgressBar";
import Track from "./Track/Track";
import { happyTracks } from "../../../assets/happyTracks";
import { ITrack } from "../../../types/types";
import "./Player.scss";

interface IPlayerProps {
  tracks: ITrack[];
}

export default function Player({ tracks }: IPlayerProps) {
  const playlistLength = tracks.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<ITrack>(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCurrentTrack(happyTracks[trackIndex]);
  }, [trackIndex]);

  useEffect(() => {
    if (tracks) setCurrentTrack(tracks[trackIndex]);
  }, [tracks]);

  return (
    <div className="Player">
      <div className="Player__content">
        {currentTrack && (
          <Track {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
        )}
        <Controls
          {...{
            progressBarRef,
            audioRef,
            duration,
            setTimeProgress,
            trackIndex,
            setTrackIndex,
            playlistLength,
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
