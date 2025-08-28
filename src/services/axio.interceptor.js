/**
 * file axio.interceptor.js
 * description Configures a reusable Axios instance with authentication and error handling.
 * Automatically attaches Keycloak token to requests and handles global errors such as 401 (Unauthorized).
 */

import axios from "axios";
import keycloakInstance from "./keycloakService";
import { toast } from "sonner";


const base_ = `${import.meta.env.VITE_PUBLIC_URL}/v1`;

/**
 * Axios instance used for making authenticated HTTP requests to the backend API.
 */
const api = axios.create({
  baseURL: base_,      // Base URL for all API requests
  timeout: 10000,       // Request timeout (10 seconds)
});

/**
 * Request interceptor that adds the Keycloak token to the Authorization header.
 */
api.interceptors.request.use(
  (config) => {
    if (keycloakInstance.token) {
      config.headers.Authorization = `Bearer ${keycloakInstance.token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Error doing request. Code: ", error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor that handles unauthorized errors (401).
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized. Redirecting to login...");
        // Optionally: trigger Keycloak logout or redirect
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Exports the configured Axios instance for use throughout the application.
 */
export default api;
