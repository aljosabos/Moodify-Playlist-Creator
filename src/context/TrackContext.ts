import { MutableRefObject, createContext } from "react";

export interface ITrackContext {
  currentTrackIndex: number;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  shouldRefreshPlaylists: boolean;
  setShouldRefreshPlaylists: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  trackChanged: boolean;
  setTrackChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TrackContext = createContext({} as ITrackContext);
