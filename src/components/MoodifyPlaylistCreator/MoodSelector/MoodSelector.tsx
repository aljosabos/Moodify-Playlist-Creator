import "./MoodSelector.scss";
import MoodButton from "./MoodButton/MoodButton";
import { moodButtonsConfig } from "../../../assets/constants";
import { Mood } from "../../../types/types";

interface IMoodSelectorProps {
  changeMood: (mood: Mood) => void;
}

export default function MoodSelector({ changeMood }: IMoodSelectorProps) {
  return (
    <div className="MoodSelector">
      <h2 className="MoodSelector-heading">Choose your mood</h2>
      <div className="MoodSelector__btns">
        {moodButtonsConfig.map((button) => (
          <MoodButton
            key={button.mood}
            Icon={button.Icon}
            name={button.mood}
            onClick={() => changeMood(button.mood)}
          />
        ))}
      </div>
    </div>
  );
}
