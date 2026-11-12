# Introvert's Paradise

Introvert's Paradise is a React web application designed as a peaceful
digital space for quiet activities and self-care. It includes several
interactive pages with different purposes:

- **Home** - a welcoming introduction and daily inspiration.
- **Book Nook** - search for books using the Open Library API and save
  favourites in the browser.
- **Journal** - create, browse, and delete journal entries, track moods, and
  manage a personal bucket list.
- **Flower Garden** - choose flowers and a vase to create a custom bouquet.
- **Puzzle Room** - select an image and solve a sliding-by-swapping puzzle
  with difficulty levels, move counting, and a timer.

The application is responsive and includes a light/dark mode toggle. Journal
entries, bucket-list items, favourites, and the selected theme are stored in
the browser's `localStorage`.

## Technologies

- React
- Vite
- React Router
- Bootstrap
- Recharts
- React Calendar
- Open Library Search API

## Requirements

Install the following before running the project:

- Node.js 20 or newer
- npm

## Installation

Clone the repository and move into the project directory:

```bash
git clone https://github.com/IvanaCreator/introverts-paradise.git
cd introverts-paradise
```

Install the project dependencies:

```bash
npm install
```

## Development server

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

The development server supports hot module replacement, so changes are
updated automatically in the browser.

## Available scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates an optimized production build in the `dist` directory.

```bash
npm run preview
```

Serves the production build locally after running `npm run build`.

```bash
npm run lint
```

Checks the source code with ESLint.

## External API

The Book Nook page uses the
[Open Library Search API](https://openlibrary.org/developers/api). Searches
are sent asynchronously with `fetch` and `async/await`. The page displays
loading and error feedback and allows the user to browse paginated results.

## Project structure

```text
src/
├── components/   Reusable React components
├── data/         Flower and puzzle data
├── pages/        Application screens
├── styles/       Shared and page-specific styles
├── App.jsx       Routing and application-level theme state
└── main.jsx      Application entry point and library imports
public/           Images and other static assets
```

## Links

- [GitHub repository](https://github.com/IvanaCreator/introverts-paradise)
- [Live application on GitHub Pages](https://ivanacreator.github.io/introverts-paradise/)
