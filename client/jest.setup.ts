import "@testing-library/jest-dom";

// Set environment variables for tests
process.env.NODE_ENV = "test";
process.env.VITE_API_URL = "http://localhost:4000/api";

// Also set up global environment for consistency
(globalThis as any).import_meta_env = {
  VITE_API_URL: "http://localhost:4000/api",
};
