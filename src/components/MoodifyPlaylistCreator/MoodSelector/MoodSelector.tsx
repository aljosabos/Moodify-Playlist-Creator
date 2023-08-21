import { SlEnergy } from "react-icons/sl";
import { BiHappyBeaming } from "react-icons/bi";
import { PiSunglassesFill } from "react-icons/pi";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { BiCustomize } from "react-icons/bi";
import "./MoodSelector.scss";

export default function MoodSelector() {
  return (
    <div className="MoodSelector">
      <h2 className="MoodSelector-heading">Pickup mood</h2>
      <div className="MoodSelector__btns">
        <button>
          <BiHappyBeaming />
          <span>Happy</span>
        </button>
        <button>
          <FaRegFaceSadTear />
          <span>Sad</span>
        </button>
        <button>
          <SlEnergy />
          <span>Energetic</span>
        </button>
        <button>
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
