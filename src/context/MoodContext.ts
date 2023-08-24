import { createContext } from "react";

export interface IMoodContext {
  shouldRefreshMoods: boolean;
  setShouldRefreshMoods: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MoodContext = createContext({} as IMoodContext);
