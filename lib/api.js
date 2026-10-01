import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const normalizeMovie = (movie) => ({
  ...movie,
  genre: Array.isArray(movie.genre)
    ? movie.genre
    : typeof movie.genre === "string"
      ? movie.genre.split(",").map((genre) => genre.trim()).filter(Boolean)
      : [],
});

http.interceptors.request.use((config) => {
  if (!config.baseURL) throw new Error("API URL missing. Add NEXT_PUBLIC_API_URL to .env.local and restart the dev server.");
  return config;
});

// unwrap data and turn failures into readable messages
http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response) throw new Error(`Request failed (${err.response.status}). Check your MockAPI URL and try again.`);
    throw new Error(err.code === "ECONNABORTED" ? "The request timed out. Try again." : "Can't reach MockAPI. Check your connection and URL.");
  }
);

export const getMovies = () => http.get("").then((movies) => movies.map(normalizeMovie));
export const createMovie = (data) => http.post("", data).then(normalizeMovie);
export const updateMovie = (id, data) => http.put(`/${id}`, data).then(normalizeMovie);
export const patchMovie = (id, data) => http.patch(`/${id}`, data).then(normalizeMovie);
export const deleteMovie = (id) => http.delete(`/${id}`);
