import { Header, SearchInput } from "@/components";
import getSongsByTitle from "@/lib/actions/getSongsByTitle";
import SearchResults from "./components/SearchResults";

export const revalidate = 0

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams: { title } }: SearchProps) => {
  const songs = await getSongsByTitle(title);

  return (
    <div className="sectionCard">
      <Header className="from-neutral-900">
        <div className="flexCol mb-2 gap-y-6">
          <h1 className="text-3xl font-semibold text-white">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchResults songs={songs} />
    </div>
  );
};
export default Search;
