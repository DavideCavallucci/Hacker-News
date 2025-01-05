import '../css/style.css';
import { fetchNewsIDs, fetchNewsDetail } from './api';
import { renderNews, initializeUI } from './ui';
import logo from '../img/Logo.ico';

let currentIndex = 0;
let newsIDs = [];

document.addEventListener('DOMContentLoaded', () => { // Assicura che il DOM sia caricato
  const logoImg = document.getElementById('logo-img');
  if (logoImg) { // Verifica che l'elemento esista
    logoImg.src = logo;
  } else{
    console.error("Logo non trovato")
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
  const nextBatch = newsIDs.slice(currentIndex, currentIndex + 10);
  const newsDetails = await Promise.all(nextBatch.map(fetchNewsDetail));
  newsDetails.forEach(renderNews);
  currentIndex += 10;

  if (currentIndex >= newsIDs.length) {
    document.getElementById("load-more-btn").style.display = "none";
  }
}

startApp();
