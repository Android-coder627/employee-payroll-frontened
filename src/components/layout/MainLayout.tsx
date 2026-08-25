import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

function MainLayout() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="app-layout">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="main-area">

        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;