import { BiPlusMedical } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import "./SongItem.scss";

interface ISongItemProps {
  author: string;
  title: string;
  listNumber: number;
  isPlaying: boolean;
  onClick: (e: React.MouseEvent) => void;
  mood: string;
}

export default function SongItem({
  author,
  title,
  listNumber,
  isPlaying,
  onClick,
  mood,
}: ISongItemProps) {
  const songPlaybackStyle = isPlaying ? "playback" : "";

  const btnContent =
    mood === "custom" ? (
      <>
        <BsFillTrashFill />
        <span>Remove</span>
      </>
    ) : (
      <>
        <BiPlusMedical />
        <span>Add to Custom </span>
      </>
    );

  return (
    <div className={`SongItem ${songPlaybackStyle}`} onClick={onClick}>
      <span>{listNumber}.</span>
      <span className="SongItem-artist">{author}</span>
      <span className="SongItem-title">{title}</span>
      <div className="SongItem__btns">
        <button>{btnContent}</button>
      </div>
    </div>
  );
}
