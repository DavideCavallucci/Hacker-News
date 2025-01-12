import '../css/style.css';
import { fetchNewsIDs, fetchNewsDetail } from './api';
import { renderNews, initializeUI } from './ui';
import logo from '../img/Logo.ico';
import _ from 'lodash';

let currentIndex = 0;
let newsIDs = [];

document.addEventListener('DOMContentLoaded', () => {
  const logoImg = document.getElementById('logo-img');
  if (logoImg) {
    logoImg.src = logo;
  }
});

async function startApp() {
  try {
    newsIDs = await fetchNewsIDs();
    initializeUI(loadNextBatch);
    loadNextBatch();
  } catch (error) {
    console.error("Errore durante l'avvio dell'app:", error);
  }
}

async function loadNextBatch() {
  const batches = _.chunk(newsIDs, 10);
  if (currentIndex < batches.length) {
    const newsDetails = await Promise.all(batches[currentIndex].map(fetchNewsDetail));
    newsDetails.forEach(renderNews);
    currentIndex++;
  }

  if (currentIndex >= batches.length) {
    document.getElementById("load-more-btn").style.display = "none";
  }
}

startApp();
