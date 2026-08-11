import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Ticket,
  BarChart3,
  Settings,
  Globe,
  Bot,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { languages } from '../../data/mockData';
import api from '../../services/api';

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        onMobileClose();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onMobileClose]);

  const handleLogout = () => {
    api.logout();
    navigate('/login');
    window.location.reload();
  };

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/chat', icon: MessageSquare, label: t('nav.chat') },
    { path: '/knowledge', icon: BookOpen, label: t('nav.knowledge') },
    { path: '/tickets', icon: Ticket, label: t('nav.tickets') },
    { path: '/analytics', icon: BarChart3, label: t('nav.analytics') },
    { path: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLangMenu(false);
  };

  const handleNavClick = () => {
    if (isMobile) {
      onMobileClose();
    }
  };

  const sidebarWidth = isMobile ? '260px' : collapsed ? '72px' : '260px';

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="mobile-overlay"
          style={{ display: 'block' }}
          onClick={onMobileClose}
        />
      )}

      <aside
        style={{
          width: sidebarWidth,
          background: 'linear-gradient(180deg, #166534 0%, #15803d 50%, #16a34a 100%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease, transform 0.3s ease',
          position: isMobile ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          zIndex: isMobile ? 100 : 'auto',
          minHeight: '100vh',
          transform: isMobile && !isMobileOpen ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: collapsed && !isMobile ? '24px 12px' : '24px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: '#ffffff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Bot size={24} color="#16a34a" />
          </div>
          {(!collapsed || isMobile) && (
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                LinkXO
              </h1>
              <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '-2px' }}>AI Support</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 8px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: collapsed && !isMobile ? '12px' : '12px 16px',
                  borderRadius: '10px',
                  marginBottom: '4px',
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s ease',
                  justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <item.icon size={20} />
                {(!collapsed || isMobile) && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Language Selector */}
        <div style={{ padding: collapsed && !isMobile ? '8px' : '8px 16px 16px', position: 'relative' }}>
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '10px',
              color: '#ffffff',
              fontSize: '13px',
              cursor: 'pointer',
              justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
            }}
          >
            <Globe size={18} />
            {(!collapsed || isMobile) && (
              <span>{languages.find((l) => l.code === i18n.language)?.name || 'English'}</span>
            )}
          </button>

          {showLangMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                left: collapsed && !isMobile ? '8px' : '16px',
                right: collapsed && !isMobile ? '8px' : '16px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                overflow: 'hidden',
                zIndex: 100,
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    border: 'none',
                    background: i18n.language === lang.code ? '#f0fdf4' : 'transparent',
                    color: '#1f2937',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f0fdf4';
                  }}
                  onMouseLeave={(e) => {
                    if (i18n.language !== lang.code)
                      e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div style={{ padding: collapsed && !isMobile ? '8px' : '0 8px 8px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#fca5a5',
              fontSize: '13px',
              cursor: 'pointer',
              justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.color = '#fca5a5';
            }}
          >
            <LogOut size={18} />
            {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Button - Desktop only */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: 'absolute',
              top: '32px',
              right: '-14px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '2px solid #16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 10,
            }}
          >
            {collapsed ? (
              <ChevronRight size={14} color="#16a34a" />
            ) : (
              <ChevronLeft size={14} color="#16a34a" />
            )}
          </button>
        )}
      </aside>
    </>
  );
}
