import { type SortType, CountryDTO, SORT_KEYS } from "@/domain";
import FlagIcon from "./FlagIcon";
import clsx from "clsx";

interface Props {
  countries: CountryDTO[];
  sortKey: SortType;
  onSortChange: (k: SortType) => void;
}

const SORT_LABELS: Record<SortType, string> = {
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
  total: "Total",
};

const SORT_STYLES: Record<SortType, string> = {
  gold: "bg-yellow-600",
  silver: "bg-gray-400",
  bronze: "bg-yellow-800",
  total: "bg-bold",
};

export default function MedalTable({
  countries,
  sortKey,
  onSortChange,
}: Props) {
  return (
    <div className="max-w-3xl transition-all">
      <h1 className="text-xl uppercase text-gray-400">Medal Count</h1>
      <table className="w-100 text-center border-collapse table-fixed">
        <thead className="border-b-3 border-solid border-b-gray-500 text-sm text-gray-500">
          <tr>
            <th className="w-1/24 px-4 py-2" scope="col" aria-label="Rank"></th>
            <th
              className="w-5/12 px-4 py-2"
              scope="col"
              aria-label="Country"
            ></th>
            {SORT_KEYS.map((key) => (
              <th
                key={key}
                tabIndex={0}
                aria-label={`Number of ${key} medals${
                  sortKey !== key ? " (click or enter to sort)" : ""
                }`}
                aria-sort={sortKey === key ? "descending" : "none"}
                onClick={function () {
                  onSortChange(key);
                }}
                onKeyDown={function (e) {
                  if (e.key === "Enter") onSortChange(key);
                }}
                className={clsx(
                  "py-2 text-sm cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase",
                  sortKey === key && "border-t-3"
                )}
              >
                <span
                  className={clsx(
                    key !== "total"
                      ? "align-bottom inline-block w-5 h-5 rounded-full overflow-hidden text-transparent"
                      : SORT_STYLES[key],
                    SORT_STYLES[key]
                  )}
                >
                  {SORT_LABELS[key]}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countries.map((c, i) => (
            <tr
              key={c.code}
              className="text-sm px-4 py-2 leading-[normal] border-b-1 border-solid border-b-gray-300 text-gray-500"
            >
              <td className="py-2 text-right">{i + 1}</td>
              <td className="flex px-2 py-2 items-end gap-3 h-[34px] leading-[17px]">
                <FlagIcon code={c.code as any} />
                <span className="font-extrabold">{c.code}</span>
              </td>
              <td className="px-4 py-2">{c.gold}</td>
              <td className="px-4 py-2">{c.silver}</td>
              <td className="px-4 py-2">{c.bronze}</td>
              <td className="font-extrabold px-4 py-2 text-gray-600">
                {c.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
