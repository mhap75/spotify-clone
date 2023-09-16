"use client";

import { MediaItem } from "@/components";
import useAuthModal from "@/hooks/useAuthModal";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { onOpen } = useSubscribeModal();
  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) return onOpen();

    return uploadModal.onOpen();
  };

  return (
    <div className="flexCol">
      <div className="flexBetween px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="font-medium text-neutral-400">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="flexCol mt-4 gap-y-2 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            data={song}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
