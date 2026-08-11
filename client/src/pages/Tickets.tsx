import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Search,
  Plus,
  MoreVertical,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { tickets } from '../data/mockData';

export default function Tickets() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const isMobile = window.innerWidth < 768;

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statusIcons: Record<string, React.ReactNode> = {
    open: <AlertCircle size={14} color="#f59e0b" />,
    inProgress: <Clock size={14} color="#3b82f6" />,
    resolved: <CheckCircle size={14} color="#22c55e" />,
    closed: <XCircle size={14} color="#9ca3af" />,
  };

  const priorityColors: Record<string, { bg: string; text: string; border: string }> = {
    high: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
    medium: { bg: '#fffbeb', text: '#d97706', border: '#fed7aa' },
    low: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '16px' : '0',
          marginBottom: isMobile ? '20px' : '32px',
        }}
      >
        <div>
          <h1 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 700, color: '#1f2937', margin: 0 }}>
            {t('tickets.title')}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
            Manage and track all customer support tickets.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
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
            boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center',
          }}
        >
          <Plus size={18} />
          {t('tickets.create')}
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ffffff',
            borderRadius: '10px',
            padding: '10px 16px',
            border: '1px solid #e5e7eb',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets..."
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

        <div style={{ display: 'flex', gap: '12px', width: isMobile ? '100%' : 'auto' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              background: '#ffffff',
              fontSize: '13px',
              color: '#374151',
              cursor: 'pointer',
              outline: 'none',
              flex: 1,
            }}
          >
            <option value="all">All Status</option>
            <option value="open">{t('tickets.open')}</option>
            <option value="inProgress">{t('tickets.inProgress')}</option>
            <option value="resolved">{t('tickets.resolved')}</option>
            <option value="closed">{t('tickets.closed')}</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              background: '#ffffff',
              fontSize: '13px',
              color: '#374151',
              cursor: 'pointer',
              outline: 'none',
              flex: 1,
            }}
          >
            <option value="all">All Priority</option>
            <option value="high">{t('tickets.high')}</option>
            <option value="medium">{t('tickets.medium')}</option>
            <option value="low">{t('tickets.low')}</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '10px' : '16px',
          marginBottom: '24px',
        }}
      >
        {[
          {
            label: t('tickets.open'),
            count: tickets.filter((t) => t.status === 'open').length,
            color: '#f59e0b',
            bg: '#fffbeb',
          },
          {
            label: t('tickets.inProgress'),
            count: tickets.filter((t) => t.status === 'inProgress').length,
            color: '#3b82f6',
            bg: '#eff6ff',
          },
          {
            label: t('tickets.resolved'),
            count: tickets.filter((t) => t.status === 'resolved').length,
            color: '#22c55e',
            bg: '#f0fdf4',
          },
          {
            label: t('tickets.closed'),
            count: tickets.filter((t) => t.status === 'closed').length,
            color: '#6b7280',
            bg: '#f3f4f6',
          },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: isMobile ? '12px 14px' : '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #f3f4f6',
            }}
          >
            <div
              style={{
                width: isMobile ? '34px' : '40px',
                height: isMobile ? '34px' : '40px',
                borderRadius: '10px',
                background: stat.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 700, color: stat.color }}>
                {stat.count}
              </span>
            </div>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Mobile Ticket Cards */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                border: '1px solid #f3f4f6',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>{ticket.id}</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: priorityColors[ticket.priority].bg,
                    color: priorityColors[ticket.priority].text,
                  }}
                >
                  {t(`tickets.${ticket.priority}`)}
                </span>
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', margin: '0 0 4px' }}>
                {ticket.subject}
              </h4>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 8px' }}>{ticket.customer}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {statusIcons[ticket.status]}
                <span style={{ fontSize: '12px', color: '#374151', textTransform: 'capitalize' }}>
                  {ticket.status === 'inProgress' ? t('tickets.inProgress') : t(`tickets.${ticket.status}`)}
                </span>
                <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: 'auto' }}>{ticket.created}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop Table */
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 120px 120px 120px 120px 60px',
              padding: '14px 24px',
              borderBottom: '1px solid #f3f4f6',
              background: '#f9fafb',
            }}
          >
            {['ID', t('tickets.subject'), t('tickets.status'), t('tickets.priority'), t('tickets.assignee'), t('tickets.created'), ''].map(
              (header, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {header}
                </span>
              )
            )}
          </div>

          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 120px 120px 120px 120px 60px',
                padding: '16px 24px',
                borderBottom: '1px solid #f3f4f6',
                alignItems: 'center',
                transition: 'background 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#22c55e' }}>
                {ticket.id}
              </span>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937', margin: 0 }}>
                  {ticket.subject}
                </p>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0' }}>
                  {ticket.customer}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {statusIcons[ticket.status]}
                <span style={{ fontSize: '13px', color: '#374151', textTransform: 'capitalize' }}>
                  {ticket.status === 'inProgress' ? t('tickets.inProgress') : t(`tickets.${ticket.status}`)}
                </span>
              </div>
              <div>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: priorityColors[ticket.priority].bg,
                    color: priorityColors[ticket.priority].text,
                    border: `1px solid ${priorityColors[ticket.priority].border}`,
                  }}
                >
                  {t(`tickets.${ticket.priority}`)}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    background: '#f0fdf4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User size={12} color="#16a34a" />
                </div>
                <span style={{ fontSize: '13px', color: '#374151' }}>{ticket.assignee.split(' ')[0]}</span>
              </div>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>{ticket.created}</span>
              <button
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <MoreVertical size={16} color="#9ca3af" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
          onClick={() => setShowCreateModal(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '480px',
              padding: isMobile ? '24px' : '32px',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937', margin: '0 0 24px' }}>
              {t('tickets.create')}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  {t('tickets.subject')}
                </label>
                <input
                  type="text"
                  placeholder="Enter ticket subject"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the issue..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                    {t('tickets.priority')}
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  >
                    <option value="medium">{t('tickets.medium')}</option>
                    <option value="high">{t('tickets.high')}</option>
                    <option value="low">{t('tickets.low')}</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                    {t('tickets.assignee')}
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  >
                    <option>John Smith</option>
                    <option>Emily Davis</option>
                    <option>Mike Wilson</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '24px',
              }}
            >
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {t('tickets.create')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
