import { CurrentTrackIndexContext } from "../../../context/CurrentTrackIndexContext";
import { ITrack } from "../../../types/types";
import SongItem from "./SongItem/SongItem";
import { useContext } from "react";

interface IPlaylistProps {
  tracks: ITrack[];
}

export default function Playlist({ tracks }: IPlaylistProps) {
  const { currentTrackIndex, setCurrentTrackIndex } = useContext(
    CurrentTrackIndexContext
  );

  const handleClick = (e: React.MouseEvent, index: number) => {
    const doubleClick = e.detail === 2;
    if (doubleClick) {
      setCurrentTrackIndex(index);
    }
  };

  return (
    <div>
      {tracks?.map(({ author, title, id }, index) => (
        <SongItem
          key={id}
          {...{
            author,
            title,
            listNumber: index + 1,
            isPlaying: index === currentTrackIndex,
            onClick: (e) => handleClick(e, index),
          }}
        />
      ))}
    </div>
  );
}
