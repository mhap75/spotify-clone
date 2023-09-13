"use client";

import { LikeButton, MediaItem } from "@/components";
import useAuthModal from "@/hooks/useAuthModal";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const { onOpen } = useAuthModal();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
      onOpen();
    }
  }, [isLoading, user, router]);

  if (songs.length === 0)
    return (
      <div className="flexCol w-full gap-y-2 px-6 text-neutral-400">
        You have not liked any songs yet.
      </div>
    );

  return (
    <div className="flexCol w-full gap-y-2 p-6">
      {songs.map((song: any) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
export default LikedContent;
