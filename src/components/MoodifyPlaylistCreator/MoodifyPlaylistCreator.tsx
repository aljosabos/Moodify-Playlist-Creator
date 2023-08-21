import MoodSelector from "./MoodSelector/MoodSelector";
import Player from "./Player/Player";
import "./MoodifyPlaylistCreator.scss";

export default function MoodifyPlaylistCreator() {
  return (
    <div className="Root">
      <Player />
      <MoodSelector />
    </div>
  );
}
