import moment from "moment";

export const formatSecondsToSongDuration = (totalSeconds: number) => {
  const duration = moment.duration(totalSeconds, "seconds");

  const minutes = duration.minutes();
  const seconds =
    duration.seconds() < 10 ? "0" + duration.seconds() : duration.seconds();
  return `${minutes}:${seconds}`;
};
