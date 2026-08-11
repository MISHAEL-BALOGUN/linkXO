import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main
          style={{
            flex: 1,
            padding: window.innerWidth < 768 ? '16px' : '32px',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
