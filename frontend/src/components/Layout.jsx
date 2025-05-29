import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main className="sm:ml-64 mt-16 p-4">
        <Outlet /> {/* This is where the page content will render */}
      </main>
    </>
  );
};

export default Layout;