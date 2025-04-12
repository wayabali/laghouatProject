import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; 
import AdminDashboardPage from './pages/AdminDashboardPage'; 
import CreateProjectPage from './pages/CreateProjectPage'; 
import NotFoundPage from './pages/NotFoundPage'; 
import ProjectHomePage from './pages/ProjectHomePage'; 
import ProjectStatusPage from './pages/ProjectStatusPage'; 
import PortalLoginPage from './pages/PORTALS/PortalLoginPage'; 
import PortalHomePage from './pages/PORTALS/PortalHomePage'; 
import PortalBIPage from './pages/PORTALS/PortalBIPage'; 
import PortalCDELoginPage from './pages/PORTALS/PortalCDELoginPage'; 
import PortalCATILoginPage from './pages/PORTALS/PortalCATILoginPage'; 


function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin Dashboard Page */}
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />

        {/* Project Management Pages */}
        <Route path="/project-home" element={<ProjectHomePage />} />
        <Route path="/project-status" element={<ProjectStatusPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />

        {/* Portal Login Page */}
        <Route path="/portal-login" element={<PortalLoginPage />} />

        {/* Portals Home (BI, CDE, CATI) */}
        <Route path="/login/bi" element={<PortalBIPage />} />
        <Route path="/login/cde" element={<PortalCDELoginPage />} />
        <Route path="/login/cati" element={<PortalCATILoginPage />} />
        <Route path="/portal/bi-home" element={<PortalHomePage portal="BI" />} />
        <Route path="/portal/cde-home" element={<PortalHomePage portal="CDE" />} />
        <Route path="/portal/cati-home" element={<PortalHomePage portal="CATI" />} />

        {/*  Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
