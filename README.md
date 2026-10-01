# Movies Hub

Next.js (App Router) + TailwindCSS + Ant Design + GSAP + Lenis. CRUD against MockAPI.

## Setup
1. Create a project on https://mockapi.io and add a resource named **movies** with fields:
   `title` (string), `director` (string), `genre` (string), `year` (number), `rating` (number), `description` (string), `image` (string).
2. Copy `.env.example` to `.env.local` and paste your resource URL.
3. Run `npm install`, then `npm run dev`, and open http://localhost:3000

## Structure
```
app/         layout, page (state + API calls), globals.css
components/  Header, Filters, MovieList, MovieCard, MovieForm, MovieDetail, Providers, SmoothScroll
lib/api.js   GET / POST / PUT / PATCH / DELETE helpers
```
- PUT: Edit form. PATCH: rating change in the Detail modal.
- Bonus included: search (title/director), genre filter, rating filter, loading, error handling, image preview.
