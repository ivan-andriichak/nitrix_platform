import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/',
});

export const BASE_URL = 'http://localhost:5000';
