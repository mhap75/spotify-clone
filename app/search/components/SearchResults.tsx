"use client";

import { LikeButton, MediaItem } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { MdOutlineSentimentVeryDissatisfied } from "react-icons/md";

interface SearchResultsProps {
  songs: Song[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flexCol w-full gap-y-2 px-6 text-neutral-400">
        <div className="flexCenter gap-1">
          <p>Nothing was found!</p>
          <MdOutlineSentimentVeryDissatisfied size={26} />
        </div>
      </div>
    );
  }

  return (
    <div className="flexCol w-full gap-y-2 px-6">
      {songs.map((song: Song) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
export default SearchResults;
