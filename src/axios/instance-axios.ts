import axios from 'axios';

export const instanceAxios = axios.create({
  baseURL: 'http://localhost:8080/api/',
  // baseURL: 'https://karateclubfosses.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
