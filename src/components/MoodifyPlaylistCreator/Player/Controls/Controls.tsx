import {
  useState,
  MutableRefObject,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
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

import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { SKIP_TIME } from "../../../../assets/constants";
import { useAutoPlayNextSong } from "../../../../hooks/useAutoPlayNextSong";

interface IControlProps {
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  duration: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
  trackIndex: number;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  playlistLength: number;
}

export default function Controls({
  progressBarRef,
  audioRef,
  duration,
  setTimeProgress,
  trackIndex,
  setTrackIndex,
  playlistLength,
}: IControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

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

  // useEffect(() => {
  //   if (isPlaying && audioRef.current) {
  //     audioRef.current.play();
  //     playAnimationRef.current = requestAnimationFrame(repeat);
  //   } else if (audioRef.current) {
  //     audioRef.current.pause();

  //     if (playAnimationRef.current)
  //       cancelAnimationFrame(playAnimationRef.current);
  //   }
  // }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const togglePlay = () => {
    setIsPlaying((currentStatus) => !currentStatus);
  };

  const skipForward = () => {
    if (audioRef.current) audioRef.current.currentTime += SKIP_TIME;
  };
  const skipBackward = () => {
    if (audioRef.current) audioRef.current.currentTime -= SKIP_TIME;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = playlistLength - 1;
      setTrackIndex(lastTrackIndex);
    } else {
      setTrackIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (trackIndex >= playlistLength - 1) {
      setTrackIndex(0);
    } else {
      setTrackIndex((prev) => prev + 1);
    }
  };

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt((e.target as HTMLInputElement).value));
  };

  const toggleMuteVolume = () => {
    setMuteVolume((prev) => !prev);
  };

  const volumeIcon =
    muteVolume || volume < 5 ? (
      <IoMdVolumeOff />
    ) : volume < 40 ? (
      <IoMdVolumeLow />
    ) : (
      <IoMdVolumeHigh />
    );

  useAutoPlayNextSong(audioRef, handleNext);

  return (
    <div className="Controls">
      <div className="Controls__content">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlay}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>

      <div className="Controls__volume">
        <button onClick={toggleMuteVolume} className="Controls__volume-btn">
          {volumeIcon}
        </button>
        <input
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleChangeVolume}
        />
      </div>
    </div>
  );
}
