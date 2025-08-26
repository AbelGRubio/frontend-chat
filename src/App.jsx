/**
 * file App.tsx
 * description Main application component that initializes Keycloak authentication and renders routing structure.
 * Displays a sidebar, routes, and handles authenticated access control using Keycloak.
 */

import React, { useState, useEffect } from 'react';
import keycloakInstance, { initKeycloak, handleLogout } from "./services/keycloakService";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/SideBar';
import menuItems from './data/menuItems';
import { Toaster } from "sonner";

/**
 * Root component of the application.
 * 
 * It:
 * - Initializes Keycloak on mount
 * - Renders a layout with sidebar and main content area
 * - Protects routes by showing content only if authenticated
 * 
 * @returns {JSX.Element} The main application structure
 */
function App() {
  /**
   * Indicates whether Keycloak has been initialized.
   */
  const [initialized, setInitialized] = useState(false);

  /**
   * useEffect to authenticate the user on component mount.
   * Calls `initKeycloak()` and updates state once authentication completes.
   */
  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await initKeycloak();
      setInitialized(isAuthenticated);
    };
    authenticate();
  }, []);

  // Show loading screen while Keycloak is being initialized
  if (!initialized) {
    return <div>Loading...</div>;
  }
  const baseUrl = import.meta.env.VITE_BASE_URL || "/";

  // If authenticated, show the main layout and routes
  return keycloakInstance && keycloakInstance.authenticated ? (
    <>
      <Router basename={baseUrl}>
        <div className="flex h-screen">
          {/* Sidebar with dynamic menu items and logout action */}
          <Sidebar items={menuItems} onLogout={handleLogout} />

          {/* Main content area */}
          <main className="flex-grow overflow-auto w-full h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/frontend-chat" element={<Home />} />
              {/* Add more routes here as needed */}
            </Routes>
          </main>
        </div>

        {/* Global toast notifications */}
        <Toaster richColors />
      </Router>
    </>
  ) : (
    // Fallback UI when not authenticated
    <div>No authenticated</div>
  );
}

export default App;
