/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // autres variables VITE_* que tu veux
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
