import { useState, useRef, useEffect, useContext } from "react";
import Controls from "./Controls/Controls";
import ProgressBar from "./ProgressBar/ProgressBar";
import Track from "./Track/Track";
import { ITrack } from "../../../types/types";
import "./Player.scss";
import { TrackContext } from "../../../context/CurrentTrackIndexContext";

interface IPlayerProps {
  tracks: ITrack[];
  mood: string;
}

export default function Player({ tracks, mood }: IPlayerProps) {
  const playlistLength = tracks.length;

  const { currentTrackIndex, setCurrentTrackIndex } = useContext(TrackContext);

  const [currentTrack, setCurrentTrack] = useState<ITrack>(
    tracks[currentTrackIndex]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (tracks) setCurrentTrack(tracks[currentTrackIndex]);
  }, [tracks, currentTrackIndex]);

  useEffect(() => {
    setCurrentTrackIndex(0);
  }, [mood]);

  return (
    <div className="Player">
      <div className="Player__content">
        <Track {...{ currentTrack, audioRef, setDuration, progressBarRef }} />

        <Controls
          {...{
            progressBarRef,
            audioRef,
            duration,
            setTimeProgress,
            playlistLength,
            setDuration,
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
}
