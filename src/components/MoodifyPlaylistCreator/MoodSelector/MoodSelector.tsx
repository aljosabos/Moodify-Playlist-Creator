import "./MoodSelector.scss";
import MoodButton from "./MoodButton/MoodButton";
import { Mood, MoodEnumKey } from "../../../types/types";
import { getEmoji } from "../../../assets/helpers";
import { useContext, useEffect } from "react";
import { MoodContext } from "../../../context/MoodContext";

interface IMoodSelectorProps {
  changeMood: (mood: Mood) => void;
  selectedMood: Mood;
}

export default function MoodSelector({
  changeMood,
  selectedMood,
}: IMoodSelectorProps) {
  const { shouldRefreshMoods, setShouldRefreshMoods } = useContext(MoodContext);

  useEffect(() => {
    if (shouldRefreshMoods) setShouldRefreshMoods(false);
  }, [shouldRefreshMoods]);

  return (
    <div className="MoodSelector">
      <h2 className="MoodSelector-heading">Pick your mood</h2>
      <div className="MoodSelector__btns">
        {Object.keys(Mood).map((mood) => (
          <MoodButton
            key={mood}
            mood={Mood[mood as MoodEnumKey]}
            changeMood={changeMood}
            emoji={getEmoji(Mood[mood as MoodEnumKey])}
            isSelected={selectedMood === Mood[mood as MoodEnumKey]}
          />
        ))}
      </div>
    </div>
  );
}
