"use client";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data: { image_path, title, id, author },
  onClick,
}) => {
  const { setId } = usePlayer();
  const imagePath = useLoadImage(image_path);

  const handleClick = () => {
    if (onClick) return onClick(id);

    return setId(id);
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50"
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          src={imagePath || "/assets/images/liked.png"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flexCol gap-y-1 overflow-hidden">
        <p className="truncate text-white">{title}</p>
        <p className="authorBase">{author}</p>
      </div>
    </div>
  );
};
export default MediaItem;
