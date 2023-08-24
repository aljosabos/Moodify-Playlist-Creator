import {
  checkIsTrackInFavorites,
} from "../../../assets/helpers";
import { TrackContext } from "../../../context/TrackContext";
import { ITrack, Mood } from "../../../types/types";
import SongItem from "./SongItem/SongItem";
import { useContext } from "react";
import "./Playlist.scss";

interface IPlaylistProps {
  tracks: ITrack[];
  mood: Mood;
}

export default function Playlist({ tracks, mood }: IPlaylistProps) {
  const { currentTrackIndex, setCurrentTrackIndex, setTrackChanged } =
    useContext(TrackContext);

  const handleDoubleClick = (e: React.MouseEvent, index: number) => {
    const doubleClick = e.detail === 2;
    if (doubleClick) {
      setCurrentTrackIndex(index);
      setTrackChanged(true);
    }
  };

  return (
    <div className="Playlist">
      {tracks?.map(({ author, title, id }, index) => (
        <SongItem
          key={id}
          {...{
            id,
            author,
            title,
            listNumber: index + 1,
            isPlaying: index === currentTrackIndex,
            mood,
            onClick: (e) => handleDoubleClick(e, index),
            isInFavorites: checkIsTrackInFavorites(mood, id),
          }}
        />
      ))}
    </div>
  );
}
