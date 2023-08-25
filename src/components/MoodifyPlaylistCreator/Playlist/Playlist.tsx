import {
  checkIsTrackInFavorites,
  restartPlayback,
} from "../../../assets/helpers";
import { TrackContext } from "../../../context/TrackContext";
import { ITrack, Mood } from "../../../types/types";
import SongItem from "./SongItem/SongItem";
import { useContext } from "react";
import "./Playlist.scss";

interface IPlaylistProps {
  tracks: ITrack[];
  playlistMood: Mood;
  currentPlayingTrackId: string;
}

export default function Playlist({
  tracks,
  playlistMood,
  currentPlayingTrackId,
}: IPlaylistProps) {
  const {
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    audioRef,
    setTrackChanged,
  } = useContext(TrackContext);

  const checkIfSongIsPlaying = (trackId: string) =>
    trackId === currentPlayingTrackId;

  const handleDoubleClick = (e: React.MouseEvent, index: number) => {
    const doubleClick = e.detail === 2;
    if (doubleClick) {
      if (isPlaying) {
        restartPlayback(audioRef);
      } else {
        setIsPlaying(true);
      }
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
            isPlaying: checkIfSongIsPlaying(id),
            mood: playlistMood,
            onClick: (e) => handleDoubleClick(e, index),
            isInFavorites: checkIsTrackInFavorites(playlistMood, id),
            songIndex: index,
          }}
        />
      ))}
    </div>
  );
}
