import '../css/style.css';
import { fetchNewsIDs, fetchNewsDetail } from './api';
import { renderNews, initializeUI } from './ui';

let currentIndex = 0;
let newsIDs = [];

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
