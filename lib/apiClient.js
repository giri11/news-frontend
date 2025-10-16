import axios from 'axios';
import Cookies from 'js-cookie';

const BACKEND_URL = 'http://localhost:8080/api/news';
const BACKEND_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication to requests
apiClient.interceptors.request.use(
  (config) => {
    // Priority 1: Use JWT if available (for logged-in users)
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    
    // Priority 2: Use API Key if configured (for server-to-server or public access)
    if (BACKEND_API_KEY) {
      config.headers['X-API-KEY'] = BACKEND_API_KEY;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      Cookies.remove('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export async function fetchTopHeadlines(category) {
  try {
    console.log("mulai fetch");
    console.log(category);
    const response = await apiClient.get('/top-headlines', {
      params: { 
        category, 
        pageSize: 5 
      },
    });
    console.log(response);
    console.log("====");
    console.log(JSON.stringify(response.data));
    console.log("end fetch");
    return response.data;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return { articles: [] };
  }
}

export async function detailNews(id) {
  try {
    console.log("mulai fetch");
    const response = await apiClient.get('/detail/${id}');
    console.log(response);
    console.log("====");
    console.log(JSON.stringify(response.data));
    console.log("end fetch");
    return response.data;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return { articles: [] };
  }
}

export async function searchArticles(query) {
  try {
    const response = await apiClient.get('/everything', {
      params: {
        q: query,
        sortBy: 'createdAt',
        pageSize: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching:', error);
    return { articles: [] };
  }
}

export default apiClient;