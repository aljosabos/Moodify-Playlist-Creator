import {
  useState,
  MutableRefObject,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  useContext,
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
import { TrackContext } from "../../../../context/TrackContext";
import {
  getNextTrackIndex,
  getTrackCurrentTime,
  restartPlayback,
  updateProgressBarWithTimeAndDuration,
} from "../../../../assets/helpers";
import { duration } from "moment";

interface IControlProps {
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  trackDuration: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
  playlistLength: number;
  timeProgress: number;
}

export default function Controls({
  progressBarRef,
  audioRef,
  trackDuration,
  setTimeProgress,
  playlistLength,
  timeProgress,
}: IControlProps) {
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const trackProgressAnimationRef = useRef<number | null>();

  const { currentTrackIndex, setCurrentTrackIndex } = useContext(TrackContext);

  const { isPlaying, setIsPlaying } = useContext(TrackContext);

  const step = useCallback(() => {
    const currentTime = getTrackCurrentTime(audioRef);
    setTimeProgress(currentTime);

    updateProgressBarWithTimeAndDuration(
      progressBarRef,
      currentTime,
      trackDuration
    );

    trackProgressAnimationRef.current = requestAnimationFrame(step);
  }, [audioRef, trackDuration, progressBarRef, setTimeProgress]);

  const togglePlay = () => {
    setIsPlaying((currentState) => !currentState);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    trackProgressAnimationRef.current = requestAnimationFrame(step);
  }, [isPlaying, step, audioRef, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const skipForward = () => {
    if (audioRef.current) audioRef.current.currentTime += SKIP_TIME;
  };
  const skipBackward = () => {
    if (audioRef.current) audioRef.current.currentTime -= SKIP_TIME;
  };

  const handlePreviousTrack = () => {
    if (timeProgress) return restartPlayback(audioRef);

    if (currentTrackIndex === 0) {
      const lastTrackIndex = playlistLength - 1;
      setCurrentTrackIndex(lastTrackIndex);
    } else {
      setCurrentTrackIndex((prev) => prev - 1);
    }
  };

  const handleNextTrack = useCallback(() => {
    const updatedIndex = getNextTrackIndex(currentTrackIndex, playlistLength);

    setCurrentTrackIndex(updatedIndex);
  }, [currentTrackIndex, playlistLength]);

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt((e.target as HTMLInputElement).value));
  };

  const toggleMuteVolume = () => {
    setMuteVolume((currentState) => !currentState);
  };

  const volumeIcon =
    muteVolume || volume < 5 ? (
      <IoMdVolumeOff />
    ) : volume < 40 ? (
      <IoMdVolumeLow />
    ) : (
      <IoMdVolumeHigh />
    );

  useAutoPlayNextSong(audioRef, handleNextTrack, currentTrackIndex);

  return (
    <div className="Controls">
      <div className="Controls__content">
        <button onClick={handlePreviousTrack}>
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
        <button onClick={handleNextTrack}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>

      <div className="Controls__volume">
        <button onClick={toggleMuteVolume} className="Controls__volume-btn">
          {volumeIcon}
        </button>

        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleChangeVolume}
          className="Controls__volume-input"
        />
      </div>
    </div>
  );
}
