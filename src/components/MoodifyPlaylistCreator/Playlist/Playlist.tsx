import { ITrack } from "../../../types/types";
import SongItem from "./SongItem/SongItem";

interface IPlaylistProps {
  tracks: ITrack[];
}

export default function Playlist({ tracks }: IPlaylistProps) {
  return (
    <div>
      {tracks?.map(({ author, title, id }, index) => (
        <SongItem key={id} {...{ author, title, listNumber: index + 1 }} />
      ))}
    </div>
  );
}
