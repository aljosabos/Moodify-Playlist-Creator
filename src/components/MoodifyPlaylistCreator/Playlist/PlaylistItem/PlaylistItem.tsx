import { BiPlusMedical } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import "./PlaylistItem.scss";
import {
  getFavoriteTracksInfo,
  getNextTrackIndex,
  saveFavoriteTracksInfo,
  stopPlayback,
} from "../../../../assets/helpers";
import { useContext } from "react";
import { TrackContext } from "../../../../context/TrackContext";
import { Mood } from "../../../../types/types";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { useIsResized } from "../../../../hooks/useIsResized";
import { SMALL_WIDTH } from "../../../../assets/constants";

interface IPlaylistItemProps {
  id: string;
  author: string;
  title: string;
  listNumber: number;
  isPlaying: boolean;
  onClick: (e: React.MouseEvent) => void;
  playlistMood: string;
  playerMood: string;
  isInFavorites: boolean;
  favoritesHaveMoreThanOneTrack: boolean;
  playlistLength: number;
}

export default function PlaylistItem({
  id,
  author,
  title,
  listNumber,
  isPlaying,
  onClick,
  playlistMood,
  playerMood,
  isInFavorites,
  favoritesHaveMoreThanOneTrack,
  playlistLength,
}: IPlaylistItemProps) {
  const songPlaybackStyle = isPlaying ? "playback" : "";

  const {
    setShouldRefreshPlaylists,
    currentTrackIndex,
    setCurrentTrackIndex,
    audioRef,
    setIsPlaying,
    currentPlayingTrackId,
  } = useContext(TrackContext);
  const { isResized } = useIsResized(SMALL_WIDTH);

  const addToFavorites = () => {
    const favoriteTracksInfo = getFavoriteTracksInfo();
    const updatedFavoriteTracksInfo = [
      ...favoriteTracksInfo,
      { mood: playlistMood, id },
    ];

    saveFavoriteTracksInfo(updatedFavoriteTracksInfo);
    setShouldRefreshPlaylists(true);
  };

  const handleNoTrack = () => {
    setCurrentTrackIndex(-1);
    stopPlayback(audioRef);
    setIsPlaying(false);
  };

  const handlePlaybackAfterRemove = () => {
    if (favoritesHaveMoreThanOneTrack) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else if (playlistMood === playerMood) {
      handleNoTrack();
    }
  };

  const removeFromFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();

    const favoriteTracksInfo = getFavoriteTracksInfo();

    const updatedTracksInfo = favoriteTracksInfo.filter(
      (info) => info.id !== id
    );
    saveFavoriteTracksInfo(updatedTracksInfo);
    setShouldRefreshPlaylists(true);

    console.log(playlistLength);

    const isPlayingTrackRemoved = id === currentPlayingTrackId;

    if (isPlayingTrackRemoved) handlePlaybackAfterRemove();
  };

  const btnJSX =
    playlistMood === Mood.Favorites ? (
      <button onClick={removeFromFavorites} className="PlaylistItem-btn">
        <BsFillTrashFill />
        <span>Remove</span>
      </button>
    ) : (
      <button onClick={addToFavorites} className="PlaylistItem-btn">
        {isResized ? (
          <BsFillStarFill className="PlaylistItem-star" />
        ) : (
          <BiPlusMedical />
        )}
        {!isResized && <span>Add to Favorites</span>}
      </button>
    );

  return (
    <div className={`PlaylistItem ${songPlaybackStyle}`} onClick={onClick}>
      <span className="PlaylistItem-listNumber">{listNumber}.</span>
      <span className="PlaylistItem-artist">{author}</span>
      <span className="PlaylistItem-title">{title}</span>
      <div className="PlaylistItem__btns">
        {isInFavorites ? (
          <span className="PlaylistItem-favorites">
            {!isResized && <AiOutlineStar />}
            In Favorites
          </span>
        ) : (
          btnJSX
        )}
      </div>
    </div>
  );
}
