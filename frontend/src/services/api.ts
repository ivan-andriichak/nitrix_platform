// import axios from 'axios';
//
// export const api = axios.create({
//   baseURL: 'http://localhost:5000/',
// });
//
// export const BASE_URL = 'http://localhost:5000';
//


import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/',  // Змінено на відносний шлях
});

export const BASE_URL = '/api';
