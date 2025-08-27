import axios from 'axios';

const API =axios.create({
    baseURL: 'http://localhost:5000'});
// baseURL: 'https://deployment-url.com'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')).token}`;
    }
    return req;
});

export const login = (formData) => API.post('/api/auth/login', formData);
export const signUp = (formData) => API.post('/api/auth/signup', formData);
export const fetchPosts = () => API.get('/api/posts');  
export const createPost = (newPost) => API.post('/api/posts', newPost);

export const deletePost = (id) => API.delete(`/api/posts/${id}`);
