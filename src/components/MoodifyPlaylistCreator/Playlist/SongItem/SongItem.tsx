import { BiPlusMedical } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import "./SongItem.scss";

interface ISongItemProps {
  author: string;
  title: string;
  listNumber: number;
  isPlaying: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function SongItem({
  author,
  title,
  listNumber,
  isPlaying,
  onClick,
}: ISongItemProps) {
  const songPlaybackStyle = isPlaying ? "playback" : "";

  return (
    <div className={`SongItem ${songPlaybackStyle}`} onClick={onClick}>
      <span>{listNumber}.</span>
      <span className="SongItem-artist">{author}</span>
      <span className="SongItem-title">{title}</span>
      <div className="SongItem__btns">
        <button>
          <BiPlusMedical />
          <span>Add to Custom </span>
        </button>
        <button>
          <BsFillTrashFill />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}
