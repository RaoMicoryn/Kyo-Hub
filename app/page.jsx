"use client";
import { useEffect, useMemo, useState } from "react";
import { App, Alert, Button, Empty, Pagination, Spin } from "antd";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Filters from "@/components/Filters";
import MovieList from "@/components/MovieList";
import MovieForm from "@/components/MovieForm";
import MovieDetail from "@/components/MovieDetail";
import { getMovies, createMovie, updateMovie, patchMovie, deleteMovie } from "@/lib/api";

const PAGE_SIZE = 24;
const DEFAULT_GENRES = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Animation", "Romance", "Thriller"];

export default function Home() {
  const { message, modal } = App.useApp();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detailId, setDetailId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try { setMovies(await getMovies()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { setPage(1); }, [search, genre, minRating]);

  const genres = useMemo(() => [...new Set([...DEFAULT_GENRES, ...movies.flatMap((m) => m.genre)])], [movies]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return movies.filter((m) =>
      (genre === "All" || m.genre.includes(genre)) &&
      Number(m.rating) >= minRating &&
      (!q || m.title?.toLowerCase().includes(q) || m.director?.toLowerCase().includes(q))
    );
  }, [movies, search, genre, minRating]);

  const average = movies.length ? (movies.reduce((t, m) => t + Number(m.rating || 0), 0) / movies.length).toFixed(1) : "0.0";
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const detail = movies.find((m) => m.id === detailId) || null;

  const openAdd = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (m) => { setEditing(m); setFormOpen(true); };
  const closeForm = () => { setFormOpen(false); setEditing(null); };

  const save = async (values) => {
    try {
      if (editing) {
        const updated = await updateMovie(editing.id, values); // PUT
        setMovies((list) => list.map((m) => (m.id === updated.id ? updated : m)));
        message.success("Movie updated");
      } else {
        const created = await createMovie(values); // POST
        setMovies((list) => [created, ...list]);
        message.success("Movie added");
      }
      closeForm();
      return true;
    } catch (e) {
      message.error(e.message);
      return false;
    }
  };

  const rate = async (movie, rating) => {
    try {
      const updated = await patchMovie(movie.id, { rating }); // PATCH
      setMovies((list) => list.map((m) => (m.id === updated.id ? updated : m)));
      message.success("Rating updated");
    } catch (e) { message.error(e.message); }
  };

  const remove = (movie) =>
    modal.confirm({
      title: `Delete "${movie.title}"?`,
      content: "This removes the movie from MockAPI and can't be undone.",
      okText: "Delete",
      okButtonProps: { danger: true },
      centered: true,
      onOk: async () => {
        try {
          await deleteMovie(movie.id);
          setMovies((list) => list.filter((m) => m.id !== movie.id));
          message.success("Movie deleted");
        } catch (e) { message.error(e.message); }
      },
    });

  return (
    <div id="top" className="relative">
      <div className="glow -left-40 top-20 h-[420px] w-[420px]" />
      <div className="glow -right-40 top-[60%] h-[480px] w-[480px]" style={{ animationDelay: "-6s" }} />
      <div className="relative z-10 pt-4">
        <Header onAdd={openAdd} />
        <Hero movies={movies} total={movies.length} average={average} onAdd={openAdd} />
        <div className="w-full px-5 md:px-12 lg:px-20">
        <main>
          <Filters count={filtered.length} genres={genres} genre={genre} onGenre={setGenre} search={search} onSearch={setSearch} minRating={minRating} onMinRating={setMinRating} />

          <section className="mt-12 min-h-[320px]">
            {loading && <div className="grid place-items-center py-24"><Spin size="large" /></div>}

            {!loading && error && (
              <Alert type="error" showIcon message="Couldn't load movies" description={error} action={<Button size="small" onClick={load}>Try again</Button>} />
            )}

            {!loading && !error && filtered.length === 0 && (
              <Empty description="No movies found. Clear the filters or add a new movie.">
                <Button type="primary" onClick={openAdd}>Add movie</Button>
              </Empty>
            )}

            {!loading && !error && filtered.length > 0 && (
              <>
                <MovieList movies={visible} onDetail={(m) => setDetailId(m.id)} onEdit={openEdit} onDelete={remove} />
                <div className="mt-14 flex justify-center">
                  <Pagination current={page} pageSize={PAGE_SIZE} total={filtered.length} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} showSizeChanger={false} />
                </div>
              </>
            )}
          </section>
        </main>

        <footer id="about" className="mt-32 border-t border-white/10 pb-10 pt-16 text-center">
          <p className="text-metal m-0 font-display text-6xl font-bold tracking-tighter md:text-[10rem] md:leading-none">Movies Hub</p>
          <p className="mx-auto mt-4 max-w-sm text-neutral-400">Keep your whole movie collection in one place.</p>
        </footer>
        </div>
      </div>

      <MovieForm open={formOpen} movie={editing} genres={genres} onSubmit={save} onClose={closeForm} />
      <MovieDetail movie={detail} onClose={() => setDetailId(null)} onRate={rate} />
    </div>
  );
}
