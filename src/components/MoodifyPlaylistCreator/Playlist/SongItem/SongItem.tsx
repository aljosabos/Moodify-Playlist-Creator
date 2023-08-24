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
import { AiOutlineStar } from "react-icons/ai";

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

  const addToFavorites = () => {
    const favoriteTracksInfo = getFavoriteTracksInfo();
    const updatedFavoriteTracksInfo = [...favoriteTracksInfo, { mood, id }];
    saveFavoriteTracksInfo(updatedFavoriteTracksInfo);
    setShouldRefreshPlaylists(true);
  };

  const removeFromFavorites = () => {
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
        <BiPlusMedical />
        <span>Add to Favorites </span>
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
