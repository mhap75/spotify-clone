import useAuthModal from "@/hooks/useAuthModal";
import usePlayer from "@/hooks/usePlayer";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const { setIds, setId } = usePlayer();
  const { onOpen } = useAuthModal();
  const { user, subscription } = useUser();
  const { onOpen: openSubscribeModal } = useSubscribeModal();

  return (id: string) => {
    if (!user) {
      return onOpen();
    }

    if (!subscription) return openSubscribeModal();

    setId(id);
    setIds(songs.map((s) => s.id));
  };
};

export default useOnPlay;
