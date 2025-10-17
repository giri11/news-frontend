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
    // Priority : Use API Key if configured (for server-to-server or public access)
    console.log('BACKEND_API_KEY');
    console.log(BACKEND_API_KEY);
    
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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export async function fetchTopHeadlines(category) {
  try {
    const response = await apiClient.get('/top-headlines', {
      params: { 
        category, 
        pageSize: 5 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return { articles: [] };
  }
}

export async function detailNews(id) {
  try {
    const response = await apiClient.get('/detail/${id}');
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

export async function fetchCategories() {
  try {
    const response = await apiClient.get('/categories');
return response;
  } catch (error) {
    console.error('Failed to fetch categories:', error);

    // Optionally inspect deeper:
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }

    return [
      { name: 'All News', href: '/', value: 'general' } // fallback
    ];
  }
}

export default apiClient;