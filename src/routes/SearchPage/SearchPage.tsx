import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
   const [searchQuery, setSearchQuery] = useState(
     searchParams.get("searchTerm") || "",
   );

   const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setSearchParams({ searchTerm: searchQuery });
   };  

  return (
    <section className="flex w-full flex-col p-2">
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center rounded-full border bg-transparent sm:hidden"
      >
        <Search className="mx-3 min-h-6 min-w-6 stroke-[1.5]" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded border border-none bg-transparent px-5 py-3 pl-0 outline-none placeholder:text-muted-foreground"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </form>
    </section>
  );
}
