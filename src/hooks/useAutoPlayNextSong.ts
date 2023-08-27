import { useEffect, MutableRefObject } from "react";

export const useAutoPlayNextSong = (
  audioRef: MutableRefObject<HTMLAudioElement | null>,
  handleNextTrack: () => void,
  curentTrackIndex: number
) => {
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("ended", handleNextTrack);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleNextTrack);
      }
    };
  }, [curentTrackIndex, audioRef]);
};
