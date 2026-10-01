"use client";
import { useState } from "react";

const link =
  "cursor-pointer border-0 bg-transparent p-0 text-xs font-medium text-neutral-400 underline-offset-4 transition hover:text-white hover:underline";

export default function MovieCard({ movie, onDetail, onEdit, onDelete }) {
  const [broken, setBroken] = useState(false);
  return (
    <article className="movie-card group">
      <button
        onClick={() => onDetail(movie)}
        aria-label={`Details for ${movie.title}`}
        className="relative block aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-xl border-0 bg-gradient-to-b from-neutral-700 to-neutral-900 p-0 ring-1 ring-white/10 transition duration-500 group-hover:-translate-y-2 group-hover:ring-white/50 group-hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.25)]"
      >
        {movie.image && !broken ? (
          <img
            src={movie.image}
            alt=""
            onError={() => setBroken(true)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="grid h-full place-items-center text-sm text-neutral-500">
            No poster
          </span>
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <span className="absolute bottom-3 left-3 font-display text-4xl font-bold leading-none tracking-tighter text-white">
          {Number(movie.rating).toFixed(1)}
          <span className="ml-1 text-sm font-medium text-neutral-400">/10</span>
        </span>
      </button>
      <h3
        className="mb-0 mt-4 truncate font-display text-lg font-semibold tracking-tight"
        title={movie.title}
      >
        {movie.title}
      </h3>
      <p className="m-0 truncate text-sm text-neutral-400">{movie.director}</p>
      <p className="m-0 mt-1 text-xs text-neutral-500">
        {movie.genre.join(", ")}, {movie.year}
      </p>
      <div className="mt-3 flex gap-4 border-t border-white/10 pt-3">
        <button className={link} onClick={() => onDetail(movie)}>
          Detail
        </button>
        <button className={link} onClick={() => onEdit(movie)}>
          Edit
        </button>
        <button
          className={`${link} hover:!text-red-400`}
          onClick={() => onDelete(movie)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
