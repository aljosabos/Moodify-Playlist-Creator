import { formatSecondsToSongTime } from "../../../../assets/helpers";
import "./ProgressBar.scss";
import { MutableRefObject } from "react";

interface IProgressBarProps {
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  timeProgress: number;
  trackDuration: number;
}

export default function ProgressBar({
  progressBarRef,
  audioRef,
  timeProgress,
  trackDuration,
}: IProgressBarProps) {
  const handleOnChange = () => {
    if (progressBarRef.current) {
      (audioRef.current as HTMLAudioElement).currentTime = parseInt(
        progressBarRef.current.value
      );
    }
  };
  return (
    <div className="ProgressBar">
      <span className="ProgressBar-time current">
        {formatSecondsToSongTime(timeProgress)}
      </span>
      <input
        onChange={handleOnChange}
        type="range"
        ref={progressBarRef}
        defaultValue={0}
      />
      <span className="ProgressBar-time">
        {formatSecondsToSongTime(trackDuration)}
      </span>
    </div>
  );
}
