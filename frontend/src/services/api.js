import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/api/products', { params }),
  getFeatured: () => api.get('/api/products/featured'),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (productData) => api.post('/api/products', productData),
  update: (id, productData) => api.put(`/api/products/${id}`, productData),
  delete: (id) => api.delete(`/api/products/${id}`),
  addRating: (id, ratingData) => api.post(`/api/products/${id}/ratings`, ratingData),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/api/cart'),
  addItem: (productId, quantity) => api.post('/api/cart/add', { productId, quantity }),
  updateQuantity: (productId, quantity) => api.put(`/api/cart/update/${productId}`, { quantity }),
  removeItem: (productId) => api.delete(`/api/cart/remove/${productId}`),
  clear: () => api.delete('/api/cart/clear'),
};

// Orders API
export const ordersAPI = {
  getAll: (params = {}) => api.get('/api/orders', { params }),
  getById: (id) => api.get(`/api/orders/${id}`),
  create: (orderData) => api.post('/api/orders/create', orderData),
  updateStatus: (id, statusData) => api.put(`/api/orders/${id}/status`, statusData),
  getAllAdmin: (params = {}) => api.get('/api/orders/admin/all', { params }),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api; 