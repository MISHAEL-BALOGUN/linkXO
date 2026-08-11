import { useTranslation } from 'react-i18next';
import { Bell, Search, User, ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = window.innerWidth < 768;

  return (
    <header
      style={{
        height: '64px',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 16px' : '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            border: 'none',
            background: '#f3f4f6',
            display: isMobile ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Menu size={20} color="#374151" />
        </button>

        {/* Search */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f3f4f6',
              borderRadius: '10px',
              padding: '8px 16px',
              width: '360px',
            }}
          >
            <Search size={18} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search conversations, tickets, articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '14px',
                color: '#374151',
                width: '100%',
                outline: 'none',
              }}
            />
          </div>
        )}

        {isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f3f4f6',
              borderRadius: '10px',
              padding: '8px 12px',
              flex: 1,
            }}
          >
            <Search size={18} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '14px',
                color: '#374151',
                width: '100%',
                outline: 'none',
              }}
            />
          </div>
        )}
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
        {/* Status Badge */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: '#f0fdf4',
              borderRadius: '20px',
              border: '1px solid #bbf7d0',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
              }}
            />
            <span style={{ fontSize: '13px', color: '#166534', fontWeight: 500 }}>
              {t('chat.online')}
            </span>
          </div>
        )}

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: 'none',
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <Bell size={18} color="#6b7280" />
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                border: '2px solid #ffffff',
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: isMobile ? '280px' : '320px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                zIndex: 100,
              }}
            >
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#1f2937',
                }}
              >
                Notifications
              </div>
              {[
                { text: 'New chat from Maria Garcia', time: '2 min ago' },
                { text: 'Ticket TK-003 requires attention', time: '15 min ago' },
                { text: 'Customer satisfaction: 98%', time: '1 hour ago' },
              ].map((notif, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <p style={{ fontSize: '13px', color: '#374151', margin: 0 }}>{notif.text}</p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '4px 0 0' }}>{notif.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: isMobile ? '6px' : '6px 12px 6px 6px',
            background: '#f3f4f6',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <User size={16} />
          </div>
          {!isMobile && (
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#1f2937', margin: 0 }}>
                Admin User
              </p>
              <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Support Manager</p>
            </div>
          )}
          {!isMobile && <ChevronDown size={14} color="#9ca3af" />}
        </div>
      </div>
    </header>
  );
}
