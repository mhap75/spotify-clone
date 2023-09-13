"use client";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import { Box, Library, SidebarItem } from ".";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const { activeId } = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname],
  );

  return (
    <div
      className={twMerge(
        "m-2 flex h-full gap-3",
        activeId && "h-[calc(100%-80px)]",
      )}
    >
      <aside className="md:flexCol hidden h-full w-[300px] gap-y-3 bg-black">
        <Box>
          <div className="flexCol gap-y-4 px-5 py-4">
            {routes.map((r) => (
              <SidebarItem key={r.label} {...r} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </aside>
      <main
        className="h-full
       flex-1 overflow-y-auto"
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
