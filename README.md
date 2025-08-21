

#  Royalty Invoicer  (Express + React + TypeScript)

A minimal, testable MVP that simulates a royalty invoicing workflow for a music streaming platform.
Users can view songs with calculation progress, issue invoices for specific tracks, and review a history of invoices , all backed by an Express API and a React/TypeScript frontend.

This project is organized as a **monorepo** with two workspaces:

* `server/` → Express.js + TypeScript (REST API, in-memory persistence)
* `client/` → React + TypeScript + Vite (UI + state management)

Jest is preconfigured for unit/integration tests, and Cypress is set up for end-to-end (E2E) testing.

---

##  Quickstart

```bash
# Install all dependencies (root + workspaces)
npm install

# Start both client + server concurrently
npm run dev
```

* **Server** → [http://localhost:4000](http://localhost:4000)
* **Client** → [http://localhost:5173](http://localhost:5173)

> ⚠️ If the client can’t reach the server, check CORS config in `server/index.ts` and set `VITE_API_URL` in `client/.env`.

---

##  Project Structure

```
royalty-invoicer/
│── server/                  # Express backend
│   ├── src/
│   │   ├── routes.ts        # Songs + Invoices endpoints
│   │   ├── data.ts          # Seed songs & in-memory invoices
│   │   └── index.ts         # App bootstrap
│   └── __tests__/           # Jest + Supertest API tests
│
│── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SongsTable.tsx
│   │   │   └── InvoiceHistory.tsx
│   │   ├── state/           # Context + Reducer
│   │   ├── services/api.ts  # API client
│   │   └── main.tsx         # Entry point
│   ├── __tests__/           # Jest + RTL component tests
│   └── cypress/             # Cypress E2E tests
│
└── package.json             # Workspaces + root scripts
```

---

##  Backend (Express + TypeScript)

* **Endpoints**

  * `GET /api/songs` → Returns 10 static songs with `{id, name, author, progress}`.
  * `POST /api/invoices` → Creates a new invoice `{id, songId, songName, author, progress, timestamp}`.
  * `GET /api/invoices` → Returns all invoices (newest first).
* **Validation**

  * 400 → Missing/invalid `songId` or `progress`.
  * 404 → Song not found.
* **Persistence**: In-memory arrays (reset on restart).
* **Config**

  * `PORT` → Server port (default: 4000).
  * `CLIENT_ORIGIN` → CORS origin (default: `http://localhost:5173`).

---

##  Frontend (React + TypeScript + Vite)

### Components

* **SongsTable**

  * Shows songs in a table: ID | Song | Author | Progress | *Issue Invoice* button.
  * On click → Issues invoice, shows “Last issued” date + progress.
* **InvoiceHistory**

  * Shows all past invoices (date, author, song, progress).

### State Management

* Implemented via **React Context + useReducer**.
* Actions:

  * `LOAD_START` / `LOAD_SUCCESS` / `LOAD_ERROR`
  * `INVOICE_ISSUED` (adds invoice + updates “last issued” info per row)

### API Integration

* `services/api.ts` wraps fetch calls to `/api/songs` and `/api/invoices`.

---

##  Tests

### Server (Jest + Supertest)

* Ensures `/api/songs` returns 10 items with correct structure.
* Ensures `/api/invoices` creation works and returns valid invoice.
* Validates error cases (400, 404).

### Client (Jest + React Testing Library)

* **Reducer tests** → State transitions (loading, invoice issued).
* **Component tests** → Renders headers, empty state, and mock data.
* **Interaction tests** → Button click updates invoice history (API mocked).

### Cypress (E2E)

* **Stubbed flow** (`cy.intercept`) → Mocks API responses to test UI in isolation.
* **Real API flow** (optional) → Runs against actual Express server for full integration.

---

##  Running Tests

```bash
npm run test:server   # Run backend tests
npm run test:client   # Run frontend tests
npm run cypress       # Launch Cypress UI
npm run cypress -- --headless --browser chrome  # Headless CI mode
```

---

## App Flow

1. **Start app** → `npm run dev`.
2. Open browser → show **Songs Table** with seeded data.
3. Click *Issue Invoice* → row shows “last issued” + invoice history updates.
4. Run `npm run test:server` → show API tests passing.
5. Run `npm run test:client` → show component + reducer tests.
6. Run `npm run cypress` → demo stubbed end-to-end UI test.




