import { getFavoriteTracksInfo } from "../../../assets/helpers";
import { TrackContext } from "../../../context/CurrentTrackIndexContext";
import { ITrack } from "../../../types/types";
import SongItem from "./SongItem/SongItem";
import { useContext } from "react";
import "./Playlist.scss";

interface IPlaylistProps {
  tracks: ITrack[];
  mood: string;
}

export default function Playlist({ tracks, mood }: IPlaylistProps) {
  const { currentTrackIndex, setCurrentTrackIndex } = useContext(TrackContext);

  const favoriteTrackIDS = getFavoriteTracksInfo()
    .filter((info) => info.mood === mood)
    .map((info) => info.id);

  const handleDoubleClick = (e: React.MouseEvent, index: number) => {
    const doubleClick = e.detail === 2;
    if (doubleClick) {
      setCurrentTrackIndex(index);
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
            isFavorite: favoriteTrackIDS.includes(id),
          }}
        />
      ))}
    </div>
  );
}
