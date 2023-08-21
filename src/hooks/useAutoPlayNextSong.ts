import { useEffect, MutableRefObject } from "react";

export const useAutoPlayNextSong = (
  audioRef: MutableRefObject<HTMLAudioElement | null>,
  handleNext: () => void
) => {
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("ended", handleNext);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleNext);
      }
    };
  }, []);
};
