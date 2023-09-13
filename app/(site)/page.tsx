import PageContent from "@/app/(site)/components/PageContent";
import { Header, ListItem } from "@/components";
import getSongs from "@/lib/actions/getSongs";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="sectionCard">
      <Header>
        <div className="mb-2">
          <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ListItem
              href="/liked"
              image="/assets/images/liked.png"
              name="Liked Songs"
            />
          </div>
        </div>
      </Header>
      <div className="mb-7 mt-2 px-6">
        <div className="flexBetween">
          <h1 className="text-2xl font-semibold text-white">Newest Songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
