import Keycloak  from "keycloak-js";

const keycloakOptions = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_REALM,
  clientId: import.meta.env.VITE_CLIENT_ID,
};

const keycloakInstance = new Keycloak(keycloakOptions);
let authenticated: boolean | undefined = undefined;

/**
 * Initializes Keycloak and handles authentication.
 */
export const initKeycloak = async (): Promise<boolean> => {
  try {
    if (!authenticated){
      authenticated = await keycloakInstance.init({
        onLoad: "login-required",
        checkLoginIframe: false,
      });
    }

    if (authenticated) {
      sessionStorage.setItem("token", keycloakInstance.token!);

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
 * Close and clean the session.
 */
export const handleLogout = () => {
  if (keycloakInstance) {
    sessionStorage.removeItem("token");
    keycloakInstance.logout();
  }
};

export default keycloakInstance;
