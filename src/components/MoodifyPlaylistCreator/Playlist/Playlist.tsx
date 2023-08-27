import {
  checkIsTrackInFavorites,
  restartPlayback,
} from "../../../assets/helpers";
import { TrackContext } from "../../../context/TrackContext";
import { ITrack, Mood } from "../../../types/types";
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import { useContext } from "react";
import { FaItunesNote } from "react-icons/fa";
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

  const hasTracks = !!tracks.length;
  const playlistLength = tracks.length;
  const favoritesHaveMoreThanOneTrack =
    playlistMood === Mood.Favorites && tracks.length > 1;
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
      {hasTracks ? (
        tracks.map(({ author, title, id }, index) => (
          <PlaylistItem
            key={id}
            {...{
              id,
              author,
              title,
              listNumber: index + 1,
              isPlaying: checkIfSongIsPlaying(id),
              playlistMood,
              playerMood,
              onClick: () => handleDoubleClick(index),
              isInFavorites: checkIsTrackInFavorites(playlistMood, id),
              songIndex: index,
              favoritesHaveMoreThanOneTrack,
              playlistLength,
            }}
          />
        ))
      ) : (
        <div className="Playlist-noTracks">
          <span>No Tracks, add some from the moods</span>
          <FaItunesNote />
        </div>
      )}
    </div>
  );
}
