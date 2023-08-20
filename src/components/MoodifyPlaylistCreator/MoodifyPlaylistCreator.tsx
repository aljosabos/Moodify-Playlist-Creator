import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";

export default function MoodifyPlaylistCreator() {
  return (
    <div>
      <Player />
      <MoodSelector />
    </div>
  );
}
