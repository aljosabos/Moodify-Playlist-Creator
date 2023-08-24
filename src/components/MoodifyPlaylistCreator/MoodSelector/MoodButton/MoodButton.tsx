import "./MoodButton.scss";
import { Mood } from "../../../../types/types";

interface IMoodButtonProps {
  changeMood: (mood: Mood) => void;
  mood: Mood;
  emoji: string;
  isSelected: boolean;
}

export default function MoodButton({
  mood,
  changeMood,
  emoji,
  isSelected,
}: IMoodButtonProps) {
  const btnClass = isSelected ? "MoodButton-btn-selected" : "MoodButton-btn";
  return (
    <div className="MoodButton">
      <span className="MoodButton-emojiBtn">
        <span className="MoodButton-emojiBtn-emoji">{emoji}</span>
      </span>
      <button onClick={() => changeMood(mood)} className={btnClass}>
        <span>{mood}</span>
      </button>
    </div>
  );
}
