import { Header } from "@/components";
import getLikedSongs from "@/lib/actions/getLikedSongs";
import Image from "next/image";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="sectionCard">
      <Header>
        <div className="mt-20">
          <div className="flexCol items-center gap-x-5 md:flex-row">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                src="/assets/images/liked.png"
                alt="Playlist"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flexCol mt-4 gap-y-2 md:mt-0">
              <p className="hidden text-sm font-semibold md:block">Playlist</p>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};
export default Liked;
