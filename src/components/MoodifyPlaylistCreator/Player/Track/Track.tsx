import { EmojiClickData, ITrack, Mood } from "../../../../types/types";
import { MutableRefObject } from "react";
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
import PlaybackAnimation from "../PlaybackAnimation/PlaybackAnimation";
import { TrackContext } from "../../../../context/TrackContext";

interface ITrackProps {
  currentTrack?: ITrack;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  setTrackDuration: React.Dispatch<React.SetStateAction<number>>;
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  mood: Mood;
}

export default function Track({
  currentTrack,
  audioRef,
  setTrackDuration,
  progressBarRef,
  mood,
}: ITrackProps) {
  const [shouldShowEmojiPicker, setShouldShowEmojiPicker] =
    useState<boolean>(false);

  const emojiPickerRef = useRef<HTMLSpanElement | null>(null);

  const { setShouldRefreshMoods } = useContext(MoodContext);
  const { isPlaying } = useContext(TrackContext);

  useOutsideClick(emojiPickerRef, () => setShouldShowEmojiPicker(false));

  const openEmojiPicker = () => {
    setShouldShowEmojiPicker(true);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = Math.floor(audioRef.current.duration);
      setTrackDuration(seconds);
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
          {currentTrack?.cover && (
            <img
              src={currentTrack?.cover}
              alt="audio avatar"
              className="Track__info-cover"
            />
          )}
        </div>
        <div className="Track__info-text">
          <h1 className="Track__info-text-title">
            {currentTrack?.title || "No favorite songs"}
          </h1>
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
                searchDisabled
                onEmojiClick={handleEmojiSelect}
                lazyLoadEmojis
                skinTonesDisabled
                emojiVersion={"5.0"}
              />
            )}
          </span>

          <PlaybackAnimation isPlaying={isPlaying} />
        </div>
      </div>
    </div>
  );
}
