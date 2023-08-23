import { createContext } from "react";

export interface ITrackContext {
  currentTrackIndex: number;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  refreshPlaylist: boolean;
  setRefreshPlaylist: React.Dispatch<React.SetStateAction<boolean>>;
  trackChanged: boolean;
  setTrackChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TrackContext = createContext({} as ITrackContext);
