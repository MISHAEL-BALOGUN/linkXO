import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Save,
  Camera,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1f2937', margin: 0 }}>
          {t('nav.settings')}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
          Manage your account settings and preferences.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Tabs */}
        <div
          style={{
            width: '240px',
            background: '#ffffff',
            borderRadius: '14px',
            padding: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
            height: 'fit-content',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab.id ? '#f0fdf4' : 'transparent',
                color: activeTab === tab.id ? '#16a34a' : '#6b7280',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            background: '#ffffff',
            borderRadius: '14px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}
        >
          {activeTab === 'profile' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>
                Profile Settings
              </h3>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <User size={32} color="#ffffff" />
                  <button
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      right: '-4px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: '2px solid #22c55e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Camera size={12} color="#22c55e" />
                  </button>
                </div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', margin: 0 }}>
                    Admin User
                  </p>
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>
                    Support Manager
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  { label: 'First Name', value: 'Admin', icon: User },
                  { label: 'Last Name', value: 'User', icon: User },
                  { label: 'Email', value: 'admin@linkxo.com', icon: Mail },
                  { label: 'Phone', value: '+1 (555) 000-0000', icon: Phone },
                ].map((field, i) => (
                  <div key={i}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '8px',
                      }}
                    >
                      {field.label}
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                      }}
                    >
                      <field.icon size={16} color="#9ca3af" />
                      <input
                        type="text"
                        defaultValue={field.value}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          fontSize: '14px',
                          color: '#374151',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '24px',
                }}
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>
                Security Settings
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                    Current Password
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      background: '#f9fafb',
                    }}
                  >
                    <Lock size={16} color="#9ca3af" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      defaultValue="password123"
                      style={{
                        flex: 1,
                        border: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        color: '#374151',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {showPassword ? (
                        <EyeOff size={16} color="#9ca3af" />
                      ) : (
                        <Eye size={16} color="#9ca3af" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                    New Password
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      background: '#f9fafb',
                    }}
                  >
                    <Lock size={16} color="#9ca3af" />
                    <input
                      type="password"
                      placeholder="Enter new password"
                      style={{
                        flex: 1,
                        border: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        color: '#374151',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                    Confirm New Password
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      background: '#f9fafb',
                    }}
                  >
                    <Lock size={16} color="#9ca3af" />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      style={{
                        flex: 1,
                        border: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        color: '#374151',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: 'fit-content',
                  }}
                >
                  <Shield size={16} />
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>
                Language Settings
              </h3>

              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
                Select your preferred language for the interface.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { code: 'en', name: 'English', flag: '🇺🇸' },
                  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                  { code: 'fr', name: 'French', flag: '🇫🇷' },
                  { code: 'de', name: 'German', flag: '🇩🇪' },
                  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
                  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
                  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
                  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
                  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: i18n.language === lang.code ? '2px solid #22c55e' : '1px solid #e5e7eb',
                      background: i18n.language === lang.code ? '#f0fdf4' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{lang.flag}</span>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>
                Notification Settings
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Email notifications', description: 'Receive email for new messages', checked: true },
                  { label: 'Desktop notifications', description: 'Get browser push notifications', checked: true },
                  { label: 'Sound alerts', description: 'Play sound for new messages', checked: false },
                  { label: 'Weekly reports', description: 'Receive weekly performance reports', checked: true },
                  { label: 'Ticket assignments', description: 'Notify when assigned a ticket', checked: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      borderRadius: '10px',
                      border: '1px solid #f3f4f6',
                      background: '#f9fafb',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937', margin: 0 }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0' }}>
                        {item.description}
                      </p>
                    </div>
                    <div
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        background: item.checked ? '#22c55e' : '#d1d5db',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          position: 'absolute',
                          top: '2px',
                          left: item.checked ? '22px' : '2px',
                          transition: 'left 0.2s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>
                Appearance Settings
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
                    Theme
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { name: 'Light', bg: '#ffffff', border: '#22c55e' },
                      { name: 'Dark', bg: '#1f2937', border: '#6b7280' },
                      { name: 'System', bg: '#f3f4f6', border: '#9ca3af' },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        style={{
                          padding: '12px 20px',
                          borderRadius: '10px',
                          border: `2px solid ${theme.border}`,
                          background: theme.bg,
                          color: theme.name === 'Dark' ? '#ffffff' : '#374151',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
                    Primary Color
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'].map((color) => (
                      <button
                        key={color}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: color,
                          border: color === '#22c55e' ? '3px solid #166534' : '2px solid #e5e7eb',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
