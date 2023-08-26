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
  playerMood: Mood;
  currentPlayingTrackId: string;
}

export default function Playlist({
  tracks,
  playlistMood,
  playerMood,
  currentPlayingTrackId,
}: IPlaylistProps) {
  const {
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    audioRef,
    setIsTrackSelected,
  } = useContext(TrackContext);

  const checkIfSongIsPlaying = (trackId: string) =>
    playlistMood === playerMood && trackId === currentPlayingTrackId;

  let lastClickTime = 0;

  const handleDoubleClick = (index: number) => {
    const currentTime = new Date().getTime();
    const timeSinceLastClick = currentTime - lastClickTime;

    if (timeSinceLastClick <= 300) {
      if (isPlaying) {
        restartPlayback(audioRef);
      } else {
        setIsPlaying(true);
      }
      setCurrentTrackIndex(index);
      setIsTrackSelected(true);
    }

    lastClickTime = currentTime;
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
            onClick: () => handleDoubleClick(index),
            isInFavorites: checkIsTrackInFavorites(playlistMood, id),
            songIndex: index,
          }}
        />
      ))}
    </div>
  );
}
