import { Player, Sidebar } from "@/components";
import ModalProvider from "@/providers/ModalProvider";

import getSongsById from "@/lib/actions/getSongsById";
import { SupabaseProvider, ToasterProvider, UserProvider } from "@/providers";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

export const revalidate = 0;

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify - Web Player: Music for everyone",
  description: "Developed by MH. Amirpanahi, powered by NEXT_JS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsById();

  console.log(userSongs);

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
