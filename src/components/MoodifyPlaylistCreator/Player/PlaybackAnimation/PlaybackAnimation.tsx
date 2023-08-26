import "./PlaybackAnimation.scss";

interface IPlaybackAnimationProps {
  isPlaying: boolean;
}

export default function PlaybackAnimation({
  isPlaying,
}: IPlaybackAnimationProps) {
  const animationModifier = isPlaying ? "--animation" : "";
  return (
    <div className="PlaybackAnimation">
      <span
        className={`PlaybackAnimation__bar${animationModifier} PlaybackAnimation__bar1`}
      ></span>
      <span
        className={`PlaybackAnimation__bar${animationModifier} PlaybackAnimation__bar2`}
      ></span>
      <span
        className={`PlaybackAnimation__bar${animationModifier} PlaybackAnimation__bar3`}
      ></span>
    </div>
  );
}
