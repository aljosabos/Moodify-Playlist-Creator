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
  songIndex: number;
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
  songIndex,
}: ISongItemProps) {
  const songPlaybackStyle = isPlaying ? "playback" : "";

  const { currentTrackIndex, setCurrentTrackIndex, setShouldRefreshPlaylists } =
    useContext(TrackContext);
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
      <button onClick={removeFromFavorites}>
        <BsFillTrashFill />
        <span>Remove</span>
      </button>
    ) : (
      <button onClick={addToFavorites}>
        {isResized ? (
          <BsFillStarFill className="SongItem__btns-star" />
        ) : (
          <BiPlusMedical />
        )}
        {!isResized && <span>Add to Favorites</span>}
      </button>
    );

  return (
    <div className={`SongItem ${songPlaybackStyle}`} onClick={onClick}>
      <span className="SongItem-listNumber">{listNumber}.</span>
      <span className="SongItem-artist">{author}</span>
      <span className="SongItem-title">{title}</span>
      <div className="SongItem__btns">
        {isInFavorites ? (
          <span className="SongItem__btns-favorites">
            <AiOutlineStar />
            In Favorites
          </span>
        ) : (
          btnJSX
        )}
      </div>
    </div>
  );
}
