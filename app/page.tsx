import { getSortedMedals } from "@/application/services/getSortedMedals";
import MedalTableContainer from "@/application/ui/components/MedalTableContainer";
import { isSortType, type SortType } from "@/domain";

type SearchParams = { sort?: string | string[] };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { sort } = await searchParams;
  const sortKey: SortType = isSortType(sort) ? sort : "gold";

  let data: Awaited<ReturnType<typeof getSortedMedals>> = [];
  let error: string | null = null;

  try {
    data = await getSortedMedals(sortKey);
  } catch (err) {
    console.log("Error fetching countries", err);
    error = "Unable to load medal data. Please try again later.";
  }

  return (
    <main className="min-h-screen bg-white py-10 pl-4">
      {error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <MedalTableContainer initialSort={sortKey} initialData={data} />
      )}
    </main>
  );
}
