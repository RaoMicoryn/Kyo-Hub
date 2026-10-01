"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MovieCard from "./MovieCard";

export default function MovieList({ movies, onDetail, onEdit, onDelete }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".movie-card");
      gsap.set(cards, { opacity: 0, y: 28 });
      ScrollTrigger.batch(cards, {
        start: "top 92%",
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", overwrite: true }),
      });
    }, ref);
    return () => ctx.revert();
  }, [movies]);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onDetail={onDetail} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
