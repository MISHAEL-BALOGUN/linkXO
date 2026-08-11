import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  BarChart3,
  Activity,
} from 'lucide-react';
import { dashboardStats } from '../data/mockData';

export default function Analytics() {
  const { t } = useTranslation();
  const isMobile = window.innerWidth < 768;

  const metrics = [
    {
      label: t('analytics.responseTime'),
      value: '2.4 min',
      change: '-18%',
      isPositive: true,
      icon: Clock,
      color: '#22c55e',
      bg: '#f0fdf4',
      description: 'Average first response time',
    },
    {
      label: t('analytics.resolutionRate'),
      value: '94.2%',
      change: '+5.3%',
      isPositive: true,
      icon: CheckCircle,
      color: '#3b82f6',
      bg: '#eff6ff',
      description: 'Issues resolved on first contact',
    },
    {
      label: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      isPositive: true,
      icon: TrendingUp,
      color: '#8b5cf6',
      bg: '#f5f3ff',
      description: 'Based on post-chat surveys',
    },
    {
      label: 'Active Conversations',
      value: '23',
      change: '+12',
      isPositive: true,
      icon: Users,
      color: '#f59e0b',
      bg: '#fffbeb',
      description: 'Currently active chat sessions',
    },
  ];

  const weeklyData = [
    { day: 'Mon', conversations: 145, resolved: 138 },
    { day: 'Tue', conversations: 162, resolved: 155 },
    { day: 'Wed', conversations: 178, resolved: 170 },
    { day: 'Thu', conversations: 156, resolved: 148 },
    { day: 'Fri', conversations: 189, resolved: 182 },
    { day: 'Sat', conversations: 98, resolved: 94 },
    { day: 'Sun', conversations: 67, resolved: 65 },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '12px' : '0',
          marginBottom: isMobile ? '20px' : '32px',
        }}
      >
        <div>
          <h1 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 700, color: '#1f2937', margin: 0 }}>
            {t('analytics.title')}
          </h1>
          <p style={{ color: '#6b7280', fontSize: isMobile ? '13px' : '14px', marginTop: '4px' }}>
            Track performance metrics and generate reports.
          </p>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: isMobile ? '8px 16px' : '10px 20px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#374151',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            alignSelf: isMobile ? 'flex-end' : 'center',
          }}
        >
          <Download size={isMobile ? 16 : 18} />
          {t('analytics.export')}
        </button>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '12px' : '20px',
          marginBottom: isMobile ? '20px' : '32px',
        }}
      >
        {metrics.map((metric, i) => (
          <div
            key={i}
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: isMobile ? '16px' : '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
              transition: 'all 0.2s',
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
                marginBottom: isMobile ? '12px' : '16px',
              }}
            >
              <div
                style={{
                  width: isMobile ? '36px' : '44px',
                  height: isMobile ? '36px' : '44px',
                  borderRadius: '12px',
                  background: metric.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <metric.icon size={isMobile ? 18 : 22} color={metric.color} />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: isMobile ? '12px' : '13px',
                  fontWeight: 600,
                  color: metric.isPositive ? '#16a34a' : '#ef4444',
                }}
              >
                {metric.isPositive ? <ArrowUpRight size={isMobile ? 12 : 14} /> : <ArrowDownRight size={isMobile ? 12 : 14} />}
                {metric.change}
              </div>
            </div>
            <p style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 700, color: '#1f2937', margin: 0 }}>
              {metric.value}
            </p>
            <p style={{ fontSize: isMobile ? '12px' : '13px', color: '#9ca3af', marginTop: '4px' }}>{metric.label}</p>
            {!isMobile && (
              <p style={{ fontSize: '11px', color: '#d1d5db', marginTop: '2px' }}>{metric.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '16px' : '24px',
          marginBottom: isMobile ? '20px' : '32px',
        }}
      >
        {/* Weekly Activity */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: isMobile ? '16px' : '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: isMobile ? '16px' : '24px',
            }}
          >
            <h3 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 600, color: '#1f2937' }}>
              Weekly Activity
            </h3>
            <BarChart3 size={isMobile ? 16 : 18} color="#9ca3af" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
            {weeklyData.map((data) => (
              <div key={data.day} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '32px', fontSize: '12px', color: '#9ca3af', textAlign: 'right' }}>
                  {data.day}
                </span>
                <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
                  <div
                    style={{
                      width: `${(data.conversations / 200) * 100}%`,
                      height: isMobile ? '20px' : '24px',
                      background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '8px',
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '10px' : '11px', color: '#ffffff', fontWeight: 600 }}>
                      {data.conversations}
                    </span>
                  </div>
                  <div
                    style={{
                      width: `${(data.resolved / 200) * 100}%`,
                      height: isMobile ? '20px' : '24px',
                      background: 'linear-gradient(90deg, #bbf7d0, #dcfce7)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '8px',
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '10px' : '11px', color: '#166534', fontWeight: 600 }}>
                      {data.resolved}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#22c55e' }} />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Conversations</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#bbf7d0' }} />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Resolved</span>
            </div>
          </div>
        </div>

        {/* Language Breakdown */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: isMobile ? '16px' : '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: isMobile ? '16px' : '24px',
            }}
          >
            <h3 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 600, color: '#1f2937' }}>
              {t('analytics.languageBreakdown')}
            </h3>
            <Globe size={isMobile ? 16 : 18} color="#9ca3af" />
          </div>

          {/* Pie Chart Visual */}
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : '32px', marginBottom: isMobile ? '16px' : '24px' }}>
            <div
              style={{
                width: isMobile ? '120px' : '140px',
                height: isMobile ? '120px' : '140px',
                borderRadius: '50%',
                background: `conic-gradient(
                  #22c55e 0deg 144deg,
                  #3b82f6 144deg 223.2deg,
                  #8b5cf6 223.2deg 277.2deg,
                  #f59e0b 277.2deg 313.2deg,
                  #ef4444 313.2deg 342deg,
                  #9ca3af 342deg 360deg
                )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: isMobile ? '78px' : '90px',
                  height: isMobile ? '78px' : '90px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 700, color: '#1f2937' }}>1,284</span>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>Total</span>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
              {dashboardStats.languageDistribution.map((lang, i) => {
                const colors = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#9ca3af'];
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: colors[i] }} />
                    <span style={{ flex: 1, fontSize: isMobile ? '12px' : '13px', color: '#374151' }}>{lang.language}</span>
                    <span style={{ fontSize: isMobile ? '12px' : '13px', fontWeight: 600, color: '#1f2937' }}>{lang.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Top Issues */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: isMobile ? '16px' : '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid #f3f4f6',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isMobile ? '16px' : '24px',
          }}
        >
          <h3 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 600, color: '#1f2937' }}>
            {t('analytics.topIssues')}
          </h3>
          <Activity size={isMobile ? 16 : 18} color="#9ca3af" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(140px, 1fr))' : 'repeat(5, 1fr)', gap: isMobile ? '10px' : '16px' }}>
          {dashboardStats.topIssues.map((issue, i) => {
            const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#6b7280'];
            return (
              <div
                key={i}
                style={{
                  padding: isMobile ? '14px' : '20px',
                  borderRadius: '12px',
                  border: `1px solid ${colors[i]}20`,
                  background: `${colors[i]}08`,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: isMobile ? '40px' : '48px',
                    height: isMobile ? '40px' : '48px',
                    borderRadius: '12px',
                    background: `${colors[i]}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}
                >
                  <span style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 700, color: colors[i] }}>
                    {i + 1}
                  </span>
                </div>
                <p style={{ fontSize: isMobile ? '12px' : '13px', fontWeight: 600, color: '#1f2937', margin: '0 0 4px' }}>
                  {issue.issue}
                </p>
                <p style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: colors[i], margin: '0 0 4px' }}>
                  {issue.count}
                </p>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{issue.percentage}% of total</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
