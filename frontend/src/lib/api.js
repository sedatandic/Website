import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Insights
export const getInsights = (params) => api.get('/api/insights', { params });
export const getInsight = (id) => api.get(`/api/insights/${id}`);

// Jobs
export const getJobs = (params) => api.get('/api/jobs', { params });
export const getJob = (id) => api.get(`/api/jobs/${id}`);
export const applyJob = (data) => api.post('/api/jobs/apply', data);

// Contact
export const submitContact = (data) => api.post('/api/contact', data);

// Career inquiry
export const submitCareerInquiry = (data) => api.post('/api/careers/inquiry', data);

// Download
export const getProfileDownloadUrl = () => `${API_BASE}/api/download/profile`;

// Partners
export const getPartners = () => api.get('/api/partners');

// Memberships
export const getMemberships = () => api.get('/api/memberships');

export default api;
