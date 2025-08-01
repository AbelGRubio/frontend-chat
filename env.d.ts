/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_KEYCLOAK_URL: string
    readonly VITE_REALM: string
    readonly VITE_CLIENT_ID: string
    readonly VITE_PORT: string; 
}
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  