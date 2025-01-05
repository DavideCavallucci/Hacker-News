import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

export async function fetchNewsIDs() {
  try {
    const response = await axios.get(`${API_BASE_URL}/newstories.json`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero degli ID delle news:", error);
    throw error;
  }
}

export async function fetchNewsDetail(newsID) {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/${newsID}.json`);
    return response.data;
  } catch (error) {
    console.error(`Errore nel recupero dei dettagli per l'ID ${newsID}:`, error);
    throw error;
  }
}
