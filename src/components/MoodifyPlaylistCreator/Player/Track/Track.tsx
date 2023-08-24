import { EmojiClickData, ITrack, Mood } from "../../../../types/types";
import { MutableRefObject } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import "./Track.scss";
import {
  capitalizeString,
  getEmoji,
  saveEmoji,
} from "../../../../assets/helpers";
import EmojiPicker from "emoji-picker-react";
import { useState, useContext, useRef } from "react";
import { MoodContext } from "../../../../context/MoodContext";
import useOutsideClick from "../../../../hooks/useOutsideClick";

interface ITrackProps {
  currentTrack?: ITrack;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  mood: Mood;
}

export default function Track({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  mood,
}: ITrackProps) {
  const [shouldShowEmojiPicker, setShouldShowEmojiPicker] =
    useState<boolean>(false);

  const emojiPickerRef = useRef<HTMLSpanElement | null>(null);

  const { setShouldRefreshMoods } = useContext(MoodContext);

  const onEmojiClose = () => {
    setShouldShowEmojiPicker(false);
  };

  useOutsideClick(emojiPickerRef, onEmojiClose);

  const openEmojiPicker = () => {
    setShouldShowEmojiPicker(true);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = Math.floor(audioRef.current.duration);
      setDuration(seconds);
      (progressBarRef.current as HTMLInputElement).max = seconds.toString();
    }
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    saveEmoji(emojiData, mood);
    setShouldShowEmojiPicker(false);
    setShouldRefreshMoods(true);
  };

  return (
    <div className="Track">
      <audio
        src={currentTrack && currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <div className="Track__info">
        <div className="audio-image">
          {/* {currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : ( */}
          <div className="Track__info-img">
            <span className="Track__info-img-icon">
              <BsMusicNoteBeamed />
            </span>
          </div>
          {/* )} */}
        </div>
        <div className="Track__info-text">
          <p className="Track__info-text-title">
            {currentTrack?.title || "No favorite songs"}
          </p>
          <p className="Track__info-text-author">
            {currentTrack?.author || "List is empty"}
          </p>

          <span className="Track__info-text-playlist">
            Mood: {capitalizeString(mood)}
          </span>
          <span
            onClick={openEmojiPicker}
            ref={emojiPickerRef}
            className="Track_emoji"
          >
            {getEmoji(mood)}

            {shouldShowEmojiPicker && (
              <EmojiPicker
                height={300}
                searchDisabled
                onEmojiClick={handleEmojiSelect}
                lazyLoadEmojis
                skinTonesDisabled
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
