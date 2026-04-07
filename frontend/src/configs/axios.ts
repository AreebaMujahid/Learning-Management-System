import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
//For public routes
export const publicApi = api; 
//For Private Routes
const apiClient = axios.create(api.defaults);

// variable to track refreshing state
let isRefreshing = false;
let failedQueue: any[] = [];
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

//Request Interceptor: access token before private route
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken'); 
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//race condition prevention: more than 1 api's requests refresh access token at same time
// Response Interceptor 401 Error and Silent Refresh handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    // if 401 occcurs and we did not did a retry already
    if (error.response?.status === 401 && !originalRequest._retry) {
      // if already a request is in progress to refresh token
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        // Refresh token API call
        axios
          .post('http://localhost:3000/api/v1/auth/refresh-token', {}, { withCredentials: true })
          .then(({ data }) => {
            const { accessToken } = data;
            // save new token
            localStorage.setItem('accessToken', accessToken);
            // Global header update karein
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            processQueue(null, accessToken);
            resolve(apiClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            // if refresh token is also expired
            localStorage.removeItem('accessToken');
            window.location.href = '/login'; 
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;