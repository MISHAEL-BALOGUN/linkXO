const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null;

  constructor() {
    this.token = localStorage.getItem('aicustomersupport_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('aicustomersupport_token', token);
    } else {
      localStorage.removeItem('aicustomersupport_token');
    }
  }

  getHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    return data;
  }

  async signup(userData: { email: string; password: string; firstName: string; lastName: string }) {
    const data = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    this.setToken(data.token);
    return data;
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData: { firstName?: string; lastName?: string; language?: string }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: { currentPassword: string; newPassword: string }) {
    return this.request('/auth/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  logout() {
    this.setToken(null);
  }

  async getConversations(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/conversations${query ? `?${query}` : ''}`);
  }

  async getConversation(id: string) {
    return this.request(`/conversations/${id}`);
  }

  async createConversation(data: { customerName: string; customerEmail?: string; language?: string }) {
    return this.request('/conversations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMessages(conversationId: string) {
    return this.request(`/conversations/${conversationId}/messages`);
  }

  async sendMessage(conversationId: string, text: string, sender: string = 'customer') {
    return this.request(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ text, sender }),
    });
  }

  async assignConversation(conversationId: string, agentId: string) {
    return this.request(`/conversations/${conversationId}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ agentId }),
    });
  }

  async updateConversationStatus(conversationId: string, status: string) {
    return this.request(`/conversations/${conversationId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getSuggestions(conversationId: string) {
    return this.request(`/conversations/${conversationId}/suggestions`);
  }

  async getTickets(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/tickets${query ? `?${query}` : ''}`);
  }

  async getTicket(id: string) {
    return this.request(`/tickets/${id}`);
  }

  async createTicket(ticketData: {
    subject: string;
    description: string;
    priority?: string;
    category?: string;
    customerName: string;
    customerEmail?: string;
  }) {
    return this.request('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  }

  async updateTicket(id: string, ticketData: Record<string, string>) {
    return this.request(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticketData),
    });
  }

  async deleteTicket(id: string) {
    return this.request(`/tickets/${id}`, {
      method: 'DELETE',
    });
  }

  async assignTicket(id: string, agentId: string) {
    return this.request(`/tickets/${id}/assign`, {
      method: 'POST',
      body: JSON.stringify({ agentId }),
    });
  }

  async getArticles(params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/articles${query ? `?${query}` : ''}`);
  }

  async getArticle(id: string) {
    return this.request(`/articles/${id}`);
  }

  async createArticle(articleData: {
    title: string;
    content: string;
    category: string;
    language?: string;
    tags?: string[];
  }) {
    return this.request('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  }

  async updateArticle(id: string, articleData: Record<string, string | string[]>) {
    return this.request(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
  }

  async deleteArticle(id: string) {
    return this.request(`/articles/${id}`, {
      method: 'DELETE',
    });
  }

  async markHelpful(id: string) {
    return this.request(`/articles/${id}/helpful`, {
      method: 'POST',
    });
  }

  async getAnalyticsOverview() {
    return this.request('/analytics/overview');
  }

  async getChatVolume(period: string) {
    return this.request(`/analytics/chat-volume?period=${period}`);
  }

  async getLanguageDistribution() {
    return this.request('/analytics/language-distribution');
  }

  async getTopIntents() {
    return this.request('/analytics/top-intents');
  }

  async getResponseTimes() {
    return this.request('/analytics/response-times');
  }

  async exportReport() {
    const response = await fetch(`${API_BASE}/analytics/export`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async getUsers() {
    return this.request('/users');
  }

  async getAgents() {
    return this.request('/users/agents');
  }
}

export const api = new ApiService();
export default api;
