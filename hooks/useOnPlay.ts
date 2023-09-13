import useAuthModal from "@/hooks/useAuthModal";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const { setIds, setId } = usePlayer();
  const { onOpen } = useAuthModal();
  const { user } = useUser();

  return (id: string) => {
    if (!user) {
      return onOpen();
    }

    setId(id);
    setIds(songs.map((s) => s.id));
  };
};

export default useOnPlay;
