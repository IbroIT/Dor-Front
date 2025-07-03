import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Замените на ваш URL бэкенда

export const getNews = async (category = null) => {
  const params = {};
  if (category) params.category = category;
  
  const response = await axios.get(`${API_URL}/news/`, { params });
  return response.data;
};

export const getNewsCategories = async () => {
  const response = await axios.get(`${API_URL}/news-categories/`);
  return response.data;
};

export const getSingleNews = async (slug) => {
  const response = await axios.get(`${API_URL}/news/?slug=${slug}`);
  return response.data[0]; // Предполагаем, что slug уникален
};