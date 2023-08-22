import { SlEnergy } from "react-icons/sl";
import { BiHappyBeaming } from "react-icons/bi";
import { PiSunglassesFill } from "react-icons/pi";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { BiCustomize } from "react-icons/bi";
import "./MoodSelector.scss";

interface IMoodSelectorProps {
  changeMood: (mood: string) => void;
}

export default function MoodSelector({ changeMood }: IMoodSelectorProps) {
  return (
    <div className="MoodSelector">
      <h2 className="MoodSelector-heading">Choose your mood</h2>
      <div className="MoodSelector__btns">
        <button onClick={() => changeMood("happy")}>
          <BiHappyBeaming />
          <span>Happy</span>
        </button>
        <button onClick={() => changeMood("sad")}>
          <FaRegFaceSadTear />
          <span>Sad</span>
        </button>
        <button onClick={() => changeMood("energetic")}>
          <SlEnergy />
          <span>Energetic</span>
        </button>
        <button onClick={() => changeMood("relaxed")}>
          <PiSunglassesFill />
          <span>Relaxed</span>
        </button>
        <button>
          <BiCustomize />
          <span>Custom</span>
        </button>
      </div>
    </div>
  );
}
