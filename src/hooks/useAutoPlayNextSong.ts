import { useEffect, MutableRefObject } from "react";

export const useAutoPlayNextSong = (
  audioRef: MutableRefObject<HTMLAudioElement | null>,
  handleNext: () => void,
  callback?: () => void
) => {
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("ended", () => {
        handleNext();
      });

      if (callback) callback();
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleNext);
      }
    };
  }, []);
};
