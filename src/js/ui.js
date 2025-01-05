export function renderNews(news) {
  const newsContainer = document.getElementById("news-container");

  const newsItem = document.createElement("div");
  newsItem.className = "news-item";

  const title = document.createElement("h2");
  title.className = "news-title";
  title.textContent = news.title || "Titolo non disponibile";

  const link = document.createElement("a");
  link.className = "news-link";
  link.href = news.url || "#";
  link.target = "_blank";
  link.textContent = "Vai alla news";

  const date = document.createElement("p");
  date.className = "news-date";
  const formattedDate = new Date(news.time * 1000).toLocaleString();
  date.textContent = `Pubblicato il: ${formattedDate}`;

  newsItem.appendChild(title);
  newsItem.appendChild(link);
  newsItem.appendChild(date);
  newsContainer.appendChild(newsItem);
}

export function initializeUI(loadMoreCallback) {
  const loadMoreButton = document.getElementById("load-more-btn");
  loadMoreButton.addEventListener("click", loadMoreCallback);
}
