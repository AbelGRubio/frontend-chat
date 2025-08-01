/**
 * file keycloakService.ts
 * description Initializes and manages the Keycloak authentication instance.
 * Provides methods to initialize Keycloak, handle login/logout, and manage token storage.
 */

import Keycloak from "keycloak-js";

/**
 * Keycloak initialization options, loaded from environment variables.
 */
const keycloakOptions = {
  url: import.meta.env.VITE_KEYCLOAK_URL,     // Keycloak server URL
  realm: import.meta.env.VITE_REALM,          // Keycloak realm
  clientId: import.meta.env.VITE_CLIENT_ID,   // Keycloak client ID
};

/**
 * A singleton instance of the Keycloak client, initialized with provided options.
 */
const keycloakInstance = new Keycloak(keycloakOptions);

/**
 * Tracks whether the user is currently authenticated.
 */
let authenticated: boolean | undefined = undefined;

/**
 * Initializes the Keycloak instance and performs login if necessary.
 *
 * - Saves the token to session storage after login.
 * - Automatically attempts to refresh the token every 30 seconds if expired.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if authenticated, otherwise `false`.
 */
export const initKeycloak = async (): Promise<boolean> => {
  try {
    if (!authenticated) {
      authenticated = await keycloakInstance.init({
        onLoad: "login-required",     // Forces login if the user is not authenticated
        checkLoginIframe: false,      // Disables periodic login status check via iframe
      });
    }

    if (authenticated) {
      sessionStorage.setItem("token", keycloakInstance.token!);

      // Refresh the token every 30 seconds if it is expired
      setInterval(async () => {
        if (keycloakInstance.isTokenExpired()) {
          sessionStorage.setItem("token", keycloakInstance.token!);
          await keycloakInstance.updateToken(30);
        }
      }, 30000);
    }

    return authenticated as boolean;
  } catch (error) {
    console.error(`Error in Keycloak: ${error}`);
    return false;
  }
};

/**
 * Logs out the current user and clears the stored token from session storage.
 */
export const handleLogout = () => {
  if (keycloakInstance) {
    sessionStorage.removeItem("token");
    keycloakInstance.logout();
  }
};

/**
 * Exports the configured Keycloak instance for use throughout the application.
 */
export default keycloakInstance;
