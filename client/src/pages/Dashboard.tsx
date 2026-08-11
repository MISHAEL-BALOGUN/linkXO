import { useTranslation } from 'react-i18next';
import {
  MessageSquare,
  Users,
  CheckCircle,
  Clock,
  ThumbsUp,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';
import { dashboardStats } from '../data/mockData';

export default function Dashboard() {
  const { t } = useTranslation();

  const statCards = [
    {
      label: t('dashboard.totalConversations'),
      value: dashboardStats.totalConversations.toLocaleString(),
      change: '+12%',
      isPositive: true,
      icon: MessageSquare,
      color: '#22c55e',
      bg: '#f0fdf4',
    },
    {
      label: t('dashboard.activeChats'),
      value: dashboardStats.activeChats,
      change: '+5',
      isPositive: true,
      icon: Users,
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      label: t('dashboard.resolvedToday'),
      value: dashboardStats.resolvedToday,
      change: '+23%',
      isPositive: true,
      icon: CheckCircle,
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
    {
      label: t('dashboard.avgResponseTime'),
      value: dashboardStats.avgResponseTime,
      change: '-18%',
      isPositive: true,
      icon: Clock,
      color: '#f59e0b',
      bg: '#fffbeb',
    },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#1f2937',
            margin: 0,
          }}
        >
          {t('dashboard.title')}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
          Welcome back! Here's what's happening with your support today.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {statCards.map((stat, i) => (
          <div
            key={i}
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <stat.icon size={22} color={stat.color} />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: stat.isPositive ? '#16a34a' : '#ef4444',
                }}
              >
                {stat.isPositive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.change}
              </div>
            </div>
            <p
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1f2937',
                margin: 0,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: '13px',
                color: '#9ca3af',
                marginTop: '4px',
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Chat Volume Chart */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
              {t('dashboard.chatVolume')}
            </h3>
            <Activity size={18} color="#9ca3af" />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '8px',
              height: '160px',
            }}
          >
            {dashboardStats.chatVolume.map((item, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${(item.count / 60) * 120}px`,
                    background: `linear-gradient(180deg, #22c55e 0%, #16a34a 100%)`,
                    borderRadius: '6px 6px 2px 2px',
                    transition: 'height 0.3s ease',
                    minHeight: '4px',
                  }}
                />
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>{item.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Language Distribution */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
              {t('dashboard.languageDistribution')}
            </h3>
            <TrendingUp size={18} color="#9ca3af" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {dashboardStats.languageDistribution.map((lang, i) => (
              <div key={i}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
                    {lang.language}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>
                    {lang.percentage}% ({lang.count})
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    background: '#f3f4f6',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${lang.percentage}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, #22c55e, #4ade80)`,
                      borderRadius: '4px',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}
      >
        {/* Recent Activity */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '20px' }}>
            {t('dashboard.recentActivity')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dashboardStats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#f9fafb',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0fdf4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background:
                      activity.type === 'chat'
                        ? '#dcfce7'
                        : activity.type === 'ticket'
                          ? '#fef3c7'
                          : '#dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {activity.type === 'chat' ? (
                    <MessageSquare size={16} color="#16a34a" />
                  ) : activity.type === 'ticket' ? (
                    <CheckCircle size={16} color="#d97706" />
                  ) : (
                    <ThumbsUp size={16} color="#2563eb" />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#374151', margin: 0 }}>
                    {activity.action}
                  </p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: '2px 0 0' }}>
                    {activity.customer} · {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Issues */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '20px' }}>
            Top Issues
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dashboardStats.topIssues.map((issue, i) => (
              <div key={i}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>
                    {issue.issue}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>{issue.count}</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    background: '#f3f4f6',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${issue.percentage}%`,
                      height: '100%',
                      background:
                        i === 0
                          ? '#ef4444'
                          : i === 1
                            ? '#f59e0b'
                            : i === 2
                              ? '#3b82f6'
                              : i === 3
                                ? '#8b5cf6'
                                : '#6b7280',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
