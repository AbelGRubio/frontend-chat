import { useState, useEffect } from 'react'
import keycloakInstance, { initKeycloak, handleLogout } from "./services/keycloakService";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/SideBar';
import menuItems from './data/menuItems';
import { Toaster } from "sonner";


function App() {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await initKeycloak();
      setInitialized(isAuthenticated);
    };
    authenticate();
  }, []);
  if (!initialized) {
    return <div>Loading...</div>;
  }

  return keycloakInstance && keycloakInstance.authenticated ? (
  <>
  <Router>
    <div className="flex h-screen">
      <Sidebar items={menuItems} onLogout={handleLogout} />
      <main className="flex-grow overflow-auto w-full h-full">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
    <Toaster richColors />
  </Router>
  </>
) : (
  <div>No authenticated</div>
);
}

// function App() {
//     const handleLogout = () => {
//       alert("Logout clicked!");
//     };
//     return (
//     <>
//     <Router>
//       <div className="flex h-screen">
//         <Sidebar items={menuItems} onLogout={handleLogout} />
//         <main className="flex-grow overflow-auto w-full h-full">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/editor" element={<Editor />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/divider" element={<Divider />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//     </>
//   );
// }

export default App
