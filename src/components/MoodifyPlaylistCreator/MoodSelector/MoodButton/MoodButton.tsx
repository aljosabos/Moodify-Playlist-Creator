import "./MoodButton.scss";
import { EmojiClickData, Mood } from "../../../../types/types";

interface IMoodButtonProps {
  handleChangeMood: () => void;
  mood: Mood;
  emoji: string;
}

export default function MoodButton({
  mood,
  handleChangeMood,
  emoji,
}: IMoodButtonProps) {
  return (
    <div className="MoodButton">
      <span className="MoodButton-emojiBtn">
        <span className="MoodButton-emojiBtn-emoji">{emoji}</span>
      </span>
      <button onClick={handleChangeMood}>
        <span>{mood}</span>
      </button>
    </div>
  );
}
