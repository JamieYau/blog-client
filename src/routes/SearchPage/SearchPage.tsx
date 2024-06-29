import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <section className="p-2 flex w-full flex-col">
      <form className="flex items-center rounded-full border bg-transparent sm:hidden">
        <Search className="mx-3 min-h-6 min-w-6 stroke-[1.5]" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded border border-none bg-transparent px-5 py-3 pl-0 outline-none placeholder:text-muted-foreground"
        />
      </form>
    </section>
  );
}
