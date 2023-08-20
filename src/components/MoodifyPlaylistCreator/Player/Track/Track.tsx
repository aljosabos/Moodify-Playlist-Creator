import { ICurrentTrack } from "../../../../types/types";
import { MutableRefObject } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import "./Track.scss";

interface ITrackProps {
  currentTrack: ICurrentTrack;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

export default function Track({ currentTrack, audioRef }: ITrackProps) {
  return (
    <div className="Track">
      <audio src={currentTrack.src} ref={audioRef} />
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
          <p className="Track__info__text-title">{currentTrack.title}</p>
          <p>{currentTrack.author}</p>
        </div>
      </div>
    </div>
  );
}
