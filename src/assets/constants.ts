import { AiOutlineStar } from "react-icons/ai";
import { PiSunglassesFill } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { BiHappyBeaming } from "react-icons/bi";
import { FaRegFaceSadTear } from "react-icons/fa6";

import { Mood } from "../types/types";
import { energeticTracks } from "./energeticTracks";
import { happyTracks } from "./happyTracks";
import { relaxedTracks } from "./relaxedTracks";
import { sadTracks } from "./sadTracks";

export const SKIP_TIME = 15;
export const VOLUME_OFF = 5;
export const VOLUME_LOW = 40;
export const FAVORITES = "favorites";

export const playlists = {
  energetic: energeticTracks,
  sad: sadTracks,
  happy: happyTracks,
  relaxed: relaxedTracks,
};

export const moodButtonsConfig = [
  { mood: Mood.Happy, Icon: BiHappyBeaming },
  { mood: Mood.Sad, Icon: FaRegFaceSadTear },
  { mood: Mood.Energetic, Icon: SlEnergy },
  { mood: Mood.Relaxed, Icon: PiSunglassesFill },
  { mood: Mood.Favorites, Icon: AiOutlineStar },
];
