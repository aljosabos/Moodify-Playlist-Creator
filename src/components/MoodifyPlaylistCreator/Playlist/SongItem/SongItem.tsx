import { BiPlusMedical } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import "./SongItem.scss";
import {
  getFavoriteTracksInfo,
  saveFavoriteTracksInfo,
} from "../../../../assets/helpers";
import { useContext } from "react";
import { TrackContext } from "../../../../context/TrackContext";
import { Mood } from "../../../../types/types";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { useIsResized } from "../../../../hooks/useIsResized";
import { SMALL_WIDTH } from "../../../../assets/constants";

interface ISongItemProps {
  id: string;
  author: string;
  title: string;
  listNumber: number;
  isPlaying: boolean;
  onClick: (e: React.MouseEvent) => void;
  mood: string;
  isInFavorites: boolean;
}

export default function SongItem({
  id,
  author,
  title,
  listNumber,
  isPlaying,
  onClick,
  mood,
  isInFavorites,
}: ISongItemProps) {
  const songPlaybackStyle = isPlaying ? "playback" : "";

  const { setShouldRefreshPlaylists } = useContext(TrackContext);
  const { isResized } = useIsResized(SMALL_WIDTH);

  const addToFavorites = () => {
    const favoriteTracksInfo = getFavoriteTracksInfo();
    const updatedFavoriteTracksInfo = [...favoriteTracksInfo, { mood, id }];

    saveFavoriteTracksInfo(updatedFavoriteTracksInfo);
    setShouldRefreshPlaylists(true);
  };

  const removeFromFavorites = () => {
    if (isPlaying) return;
    const favoriteTracksInfo = getFavoriteTracksInfo();

    const filteredFavoriteTracksInfo = favoriteTracksInfo.filter(
      (info) => info.id !== id
    );
    saveFavoriteTracksInfo(filteredFavoriteTracksInfo);
    setShouldRefreshPlaylists(true);
  };

  const btnJSX =
    mood === Mood.Favorites ? (
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
