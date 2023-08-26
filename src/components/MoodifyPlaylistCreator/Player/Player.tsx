import { useState, useRef, useEffect, useContext } from "react";
import Controls from "./Controls/Controls";
import ProgressBar from "./ProgressBar/ProgressBar";
import Track from "./Track/Track";
import { ITrack, Mood } from "../../../types/types";
import "./Player.scss";
import { TrackContext } from "../../../context/TrackContext";

interface IPlayerProps {
  tracks: ITrack[];
  mood: Mood;
  setCurrentPlayingTrackId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Player({
  tracks,
  mood,
  setCurrentPlayingTrackId,
}: IPlayerProps) {
  const { currentTrackIndex, audioRef } = useContext(TrackContext);

  const [timeProgress, setTimeProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<ITrack>();

  const progressBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (tracks) {
      const currentPlayingTrack = tracks[currentTrackIndex];

      setCurrentTrack(currentPlayingTrack);
      setCurrentPlayingTrackId(currentPlayingTrack?.id);
    }
  }, [tracks, currentTrackIndex]);

  return (
    <div className="Player">
      <div className="Player__content">
        <Track
          {...{
            currentTrack,
            audioRef,
            setTrackDuration,
            progressBarRef,
            mood,
          }}
        />

        <Controls
          {...{
            progressBarRef,
            audioRef,
            trackDuration,
            setTimeProgress,
            playlistLength: tracks?.length,
            timeProgress
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, trackDuration }}
        />
      </div>
    </div>
  );
}
