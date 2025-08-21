// Environment configuration module
// This file handles environment variables for both test and production

export const API_URL = (() => {
  // In test environment, use process.env
  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    return process.env.VITE_API_URL || "http://localhost:4000/api";
  }

  // In production/development, use the injected global variable
  if (
    typeof globalThis !== "undefined" &&
    (globalThis as any).import_meta_env
  ) {
    return (
      (globalThis as any).import_meta_env.VITE_API_URL ||
      "http://localhost:4000/api"
    );
  }

  // Fallback
  return "http://localhost:4000/api";
})();
