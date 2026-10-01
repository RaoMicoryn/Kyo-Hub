"use client";
import { SearchOutlined } from "@ant-design/icons";

const RATINGS = [[0, "Any rating"], [6, "6+"], [7, "7+"], [8, "8+"], [9, "9+"]];

const chip = (active) =>
  `shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition duration-300 ${
    active ? "border-white bg-white text-black" : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/40 hover:text-white"
  }`;

export default function Filters({ count, genres, genre, onGenre, search, onSearch, minRating, onMinRating }) {
  return (
    <div id="collection" className="scroll-mt-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="m-0 font-display text-5xl font-bold tracking-tighter md:text-7xl">Collection</h2>
          <p className="m-0 mt-2 text-neutral-400">{count} {count === 1 ? "movie" : "movies"} shown</p>
        </div>
        <label className="relative block w-full md:w-96">
          <SearchOutlined className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by title or director"
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-white/50 focus:bg-white/10"
          />
        </label>
      </div>

      <div id="categories" className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {["All", ...genres].map((g) => (
          <button key={g} onClick={() => onGenre(g)} className={chip(genre === g)}>{g}</button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-2">
        <span className="shrink-0 pr-2 text-sm text-neutral-500">Rating</span>
        {RATINGS.map(([v, label]) => (
          <button key={v} onClick={() => onMinRating(v)} className={chip(minRating === v)}>{label}</button>
        ))}
      </div>
    </div>
  );
}
