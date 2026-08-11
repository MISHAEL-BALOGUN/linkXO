import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Search,
  BookOpen,
  Eye,
  ThumbsUp,
  ChevronRight,
  FileText,
  Tag,
  Globe,
} from 'lucide-react';
import { articles } from '../data/mockData';

export default function KnowledgeBase() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  const categories = ['All', ...new Set(articles.map((a) => a.category))];
  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1f2937', margin: 0 }}>
          {t('knowledge.title')}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
          Find answers and learn how to use our platform effectively.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Sidebar - Categories */}
        <div
          style={{
            width: '240px',
            background: '#ffffff',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f3f4f6',
            height: 'fit-content',
          }}
        >
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', marginBottom: '12px' }}>
            {t('knowledge.categories')}
          </h3>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: selectedCategory === cat ? '#f0fdf4' : 'transparent',
                color: selectedCategory === cat ? '#16a34a' : '#6b7280',
                fontSize: '13px',
                fontWeight: selectedCategory === cat ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <FileText size={16} />
              {cat}
              {selectedCategory === cat && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {/* Search */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#ffffff',
              borderRadius: '12px',
              padding: '12px 18px',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
            }}
          >
            <Search size={20} color="#9ca3af" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('knowledge.search')}
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

          {/* Articles Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: selectedArticle ? '1fr 1fr' : 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  border:
                    selectedArticle?.id === article.id
                      ? '2px solid #22c55e'
                      : '1px solid #f3f4f6',
                  cursor: 'pointer',
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
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: '#f0fdf4',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#16a34a',
                    }}
                  >
                    {article.category}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Globe size={12} color="#9ca3af" />
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                      {article.language.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1f2937', margin: '0 0 8px' }}>
                  {article.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: '0 0 16px' }}>
                  {article.content.length > 120 ? article.content.slice(0, 120) + '...' : article.content}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: '#f3f4f6',
                        fontSize: '11px',
                        color: '#6b7280',
                      }}
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid #f3f4f6',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Eye size={14} color="#9ca3af" />
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{article.views}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ThumbsUp size={14} color="#22c55e" />
                    <span style={{ fontSize: '12px', color: '#22c55e' }}>{article.helpful}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <BookOpen size={48} color="#d1d5db" style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '16px' }}>{t('knowledge.noResults')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
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
          }}
          onClick={() => setSelectedArticle(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              width: '640px',
              maxHeight: '80vh',
              overflow: 'auto',
              padding: '32px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: '#f0fdf4',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#16a34a',
                }}
              >
                {selectedArticle.category}
              </div>
              <Globe size={14} color="#9ca3af" />
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                {selectedArticle.language.toUpperCase()}
              </span>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1f2937', margin: '0 0 16px' }}>
              {selectedArticle.title}
            </h2>

            <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.7', margin: '0 0 24px' }}>
              {selectedArticle.content}
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: '#f3f4f6',
                    fontSize: '12px',
                    color: '#6b7280',
                  }}
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid #f3f4f6',
              }}
            >
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6b7280' }}>
                  <Eye size={16} /> {selectedArticle.views} views
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#22c55e' }}>
                  <ThumbsUp size={16} /> {selectedArticle.helpful}% helpful
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#f3f4f6',
                  color: '#374151',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
