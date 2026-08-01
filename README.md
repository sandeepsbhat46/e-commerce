# Bloom Commerce

A full-stack e-commerce/marketplace demo with customer, seller and admin experiences.

## Tech stack

- **Frontend**: React 19, TypeScript, TanStack Start/Router, TanStack Query, Tailwind CSS, MUI
- **Backend**: Node.js + Express, static in-memory data (no database)
- **State**: Zustand (cart, wishlist, auth)

## Project structure

```
src/            frontend app (routes, components, hooks, lib)
server/         Express API serving static in-memory data
```

## Getting started

Requires Node.js 20.19+ or 22.12+, and npm.

### 1. Backend API

```sh
cd server
npm install
npm start
```

The API listens on `http://localhost:4000`.

### 2. Frontend

In a separate terminal, from the repo root:

```sh
npm install
npm run dev
```

The dev server prints the local URL to open. It talks to the API at
`http://localhost:4000` by default — override with a `VITE_API_URL` env var if
the backend runs elsewhere.

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start the Vite dev server  |
| `npm run build`   | Production build           |
| `npm run preview` | Preview a production build |
| `npm run lint`    | Run ESLint                 |
| `npm run format`  | Format with Prettier       |

## User roles

- **Customer** — browse, search, cart, checkout, order history, wishlist
- **Seller** — manage own product listings and orders, view analytics
- **Admin** — manage all users, products, orders, categories, coupons and reviews
