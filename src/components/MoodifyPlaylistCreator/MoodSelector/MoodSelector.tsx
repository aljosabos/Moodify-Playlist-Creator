import { SlEnergy } from "react-icons/sl";
import { BiHappyBeaming } from "react-icons/bi";
import { PiSunglassesFill } from "react-icons/pi";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { AiOutlineStar } from "react-icons/ai";
import "./MoodSelector.scss";
import { Mood } from "../../../types/types";

interface IMoodSelectorProps {
  changeMood: (mood: Mood) => void;
}

export default function MoodSelector({ changeMood }: IMoodSelectorProps) {
  return (
    <div className="MoodSelector">
      <h2 className="MoodSelector-heading">Choose your mood</h2>
      <div className="MoodSelector__btns">
        <button onClick={() => changeMood(Mood.Happy)}>
          <BiHappyBeaming />
          <span>Happy</span>
        </button>
        <button onClick={() => changeMood(Mood.Sad)}>
          <FaRegFaceSadTear />
          <span>Sad</span>
        </button>
        <button onClick={() => changeMood(Mood.Energetic)}>
          <SlEnergy />
          <span>Energetic</span>
        </button>
        <button onClick={() => changeMood(Mood.Relaxed)}>
          <PiSunglassesFill />
          <span>Relaxed</span>
        </button>
        <button onClick={() => changeMood(Mood.Favorites)}>
          <AiOutlineStar />
          <span>Favorites</span>
        </button>
      </div>
    </div>
  );
}
