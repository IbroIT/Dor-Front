// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/'; // Замените на ваш URL Django

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMainNews = async () => {
  const response = await api.get('news/?is_main=true');
  return response.data;
};

export const getMarketNews = async (marketSlug) => {
  const response = await api.get(`news/?market=${marketSlug}`);
  return response.data;
};

export const getPopularNews = async () => {
  const response = await api.get('news/?is_popular=true');
  return response.data;
};

export const getPressReleases = async (year = 'Все', category = 'Все') => {
  const params = {};
  if (year !== 'Все') params.year = year;
  if (category !== 'Все') params.category = category;
  
  const response = await api.get('press-releases/', { params });
  return response.data;
};

export const getNewsArchive = async (year = 'Все', category = 'Все', search = '') => {
  const params = {};
  if (year !== 'Все') params.year = year;
  if (category !== 'Все') params.category = category;
  if (search) params.search = search;
  
  const response = await api.get('news/', { params });
  return response.data;
};

export const getNewsCategories = async () => {
  const response = await api.get('news-categories/');
  return response.data;
};

export const getMarkets = async () => {
  const response = await api.get('markets/');
  return response.data;
};