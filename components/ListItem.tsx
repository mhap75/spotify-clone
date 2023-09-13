"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa6";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ name, href, image }) => {
  const router = useRouter();

  const handleClick = () => {
    //   Authentication
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          src={image}
          alt={name}
          className="rounded-xl  object-cover p-1.5"
          fill
        />
      </div>
      <p className="truncate py-5 font-medium">{name}</p>
      <div className="flexCenter absolute right-5 rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md transition delay-75 hover:scale-110 group-hover:opacity-100">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
