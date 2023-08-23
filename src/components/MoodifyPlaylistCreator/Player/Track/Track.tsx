import { ITrack } from "../../../../types/types";
import { MutableRefObject } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import "./Track.scss";

interface ITrackProps {
  currentTrack?: ITrack;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
}

export default function Track({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
}: ITrackProps) {
  /////
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = Math.floor(audioRef.current.duration);
      setDuration(seconds);
      (progressBarRef.current as HTMLInputElement).max = seconds.toString();
    }
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
          <div className="Track__info__img">
            <span className="Track__info__img-icon">
              <BsMusicNoteBeamed />
            </span>
          </div>
          {/* )} */}
        </div>
        <div className="Track__info__text">
          <p className="Track__info__text-title">
            {currentTrack?.title || "No favorite songs"}
          </p>
          <p className="Track__info__text-author">
            {currentTrack?.author || "List is empty"}
          </p>
        </div>
      </div>
    </div>
  );
}
