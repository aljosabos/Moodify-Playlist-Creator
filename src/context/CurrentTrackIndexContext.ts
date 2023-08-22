import { createContext } from "react";

export interface ICurrentTrackIndexContext {
  currentTrackIndex: number;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const CurrentTrackIndexContext = createContext(
  {} as ICurrentTrackIndexContext
);
