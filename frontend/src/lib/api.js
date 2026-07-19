import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

function readCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

// Attach CSRF token (double-submit) on state-changing requests for cookie-based sessions
api.interceptors.request.use((config) => {
  const method = (config.method || 'get').toLowerCase();
  if (['post', 'put', 'patch', 'delete'].includes(method)) {
    const csrf = readCookie('pa_csrf_token');
    if (csrf) config.headers['X-CSRF-Token'] = csrf;
  }
  return config;
});

// Insights
export const getInsights = (params) => api.get('/api/insights', { params });
export const getInsight = (id) => api.get(`/api/insights/${id}`);

// Jobs
export const getJobs = (params) => api.get('/api/jobs', { params });
export const getJob = (id) => api.get(`/api/jobs/${id}`);
export const applyJobForm = (formData) =>
  api.post('/api/jobs/apply', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

// Contact
export const submitContact = (data) => api.post('/api/contact', data);

// Career inquiry
export const submitCareerInquiry = (formData) => api.post('/api/careers/inquiry', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

// Download
export const getProfileDownloadUrl = () => `${API_BASE}/api/download/profile`;

// Partners / Memberships
export const getPartners = () => api.get('/api/partners');
export const getMemberships = () => api.get('/api/memberships');

// ── Auth ──
export const adminLogin = (email, password) => api.post('/api/auth/login', { email, password });
export const adminLogout = () => api.post('/api/auth/logout');
export const adminMe = () => api.get('/api/auth/me');

// ── Admin content CRUD ──
export const adminList = (coll) => api.get(`/api/admin/${coll}`);
export const adminCreate = (coll, body) => api.post(`/api/admin/${coll}`, body);
export const adminUpdate = (coll, id, body) => api.put(`/api/admin/${coll}/${id}`, body);
export const adminDelete = (coll, id) => api.delete(`/api/admin/${coll}/${id}`);

// ── Admin inbox ──
export const adminContacts = () => api.get('/api/admin/inbox/contacts');
export const adminInquiries = () => api.get('/api/admin/inbox/inquiries');
export const adminApplications = () => api.get('/api/admin/inbox/applications');
export const adminResumeBlob = (id) =>
  api.get(`/api/admin/applications/${id}/resume`, { responseType: 'blob' });

export default api;
