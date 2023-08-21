import {
  useState,
  MutableRefObject,
  useEffect,
  useRef,
  useCallback,
} from "react";
import "./Controls.scss";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";

interface IControlProps {
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  duration: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function Controls({
  progressBarRef,
  audioRef,
  duration,
  setTimeProgress,
}: IControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimationRef = useRef<number | null>();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current ? audioRef.current.currentTime : 0;

    setTimeProgress(currentTime);

    if (progressBarRef.current) {
      (progressBarRef.current as HTMLInputElement).value =
        currentTime.toString();

      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${
          (parseInt((progressBarRef.current as HTMLInputElement).value) /
            duration) *
          100
        }%`
      );
    }

    /* request-id */
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else if (audioRef.current) {
      audioRef.current.pause();

      if (playAnimationRef.current)
        cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat]);

  const togglePlay = () => {
    setIsPlaying((currentStatus) => !currentStatus);
  };
  return (
    <div className="Controls">
      <div className="Controls__content">
        <button>
          <IoPlaySkipBackSharp />
        </button>
        <button>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlay}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button>
          <IoPlayForwardSharp />
        </button>
        <button>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
    </div>
  );
}
