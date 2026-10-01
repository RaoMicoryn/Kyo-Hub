"use client";
import { Modal, Rate } from "antd";

export default function MovieDetail({ movie, onClose, onRate }) {
  return (
    <Modal open={!!movie} onCancel={onClose} footer={null} width={720} centered destroyOnClose title={movie?.title}>
      {movie && (
        <div className="flex flex-col gap-6 sm:flex-row">
          <img src={movie.image} alt={movie.title} className="aspect-[2/3] w-full rounded-lg bg-neutral-800 object-cover sm:w-52" />
          <dl className="m-0 flex-1 text-sm">
            {[["Director", movie.director], ["Genre", movie.genre], ["Release year", movie.year], ["Rating", `${Number(movie.rating).toFixed(1)} / 10`]].map(([k, v]) => (
                <div key={k} className="mb-3 flex gap-4 border-b border-white/10 pb-3">
                <dt className="w-28 text-neutral-400">{k}</dt>
                <dd className="m-0 font-medium">{v}</dd>
              </div>
            ))}
            <div className="mb-3 flex items-center gap-4 border-b border-white/10 pb-3">
              <dt className="w-28 text-neutral-400">Change rating</dt>
              <dd className="m-0"><Rate allowHalf value={movie.rating / 2} onChange={(v) => onRate(movie, v * 2)} /></dd>
            </div>
            <dt className="mb-1 text-neutral-400">Description</dt>
            <dd className="m-0 leading-relaxed">{movie.description}</dd>
          </dl>
        </div>
      )}
    </Modal>
  );
}
