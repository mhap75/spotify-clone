"use client";

import { PlayerContent } from "@/components";
import usePlayer from "@/hooks/usePlayer";
import useSong from "@/hooks/useSong";
import useSongUrl from "@/hooks/useSongUrl";

const Player = () => {
  const { activeId } = usePlayer();
  const { song } = useSong(activeId);

  const songUrl = useSongUrl(song!);

  if (!songUrl || !song || !activeId) return null;

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-black px-4 py-2">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
export default Player;
