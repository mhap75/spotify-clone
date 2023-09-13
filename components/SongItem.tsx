"use client";

import { PlayButton } from "@/components";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  data: { image_path, id, title, author },
  onClick,
}) => {
  const imagePath = useLoadImage(image_path);

  return (
    <div
      onClick={() => onClick(id)}
      className="flexCol group relative cursor-pointer items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
    >
      <div className="sizeFull relative aspect-square overflow-hidden rounded-md">
        <Image
          src={imagePath || "/assets/images/liked.png"}
          className="object-cover"
          fill
          alt={title}
        />
      </div>
      <div className="flexCol w-full items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">{title}</p>
        <p className="authorBase w-full pb-4">By {author}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
