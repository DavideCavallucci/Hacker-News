/**
 * Crea un elemento DOM con attributi e figli specificati.
 * @param {string} tag - Nome del tag dell'elemento (es. "div", "h2").
 * @param {Object} [attributes={}] - Attributi da applicare all'elemento (es. { className: "news-item" }).
 * @param {Array} [children=[]] - Figli dell'elemento, come stringhe o nodi.
 * @returns {HTMLElement} - L'elemento DOM creato.
 */
export function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key in element) {
      element[key] = value; // Per proprietà come className, textContent
    } else {
      element.setAttribute(key, value); // Per attributi personalizzati
    }
  });
  children.forEach(child => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}

/**
 * Renderizza una news all'interno del contenitore delle notizie.
 * @param {Object} news - Oggetto che rappresenta una notizia.
 */
export function renderNews(news) {
  const newsContainer = document.getElementById("news-container");

  const newsItem = createElement("div", { className: "news-item" }, [
    createElement("h2", { className: "news-title", textContent: news.title || "Titolo non disponibile" }),
    createElement("a", {
      className: "news-link",
      href: news.url || "#",
      target: "_blank",
      textContent: "Vai alla news"
    }),
    createElement("p", {
      className: "news-date",
      textContent: `Pubblicato il: ${new Date(news.time * 1000).toLocaleString()}`
    })
  ]);

  newsContainer.appendChild(newsItem);
}

/**
 * Inizializza la UI aggiungendo il callback al pulsante "Carica di più".
 * @param {Function} loadMoreCallback - Funzione da eseguire al clic del pulsante.
 */
export function initializeUI(loadMoreCallback) {
  const loadMoreButton = document.getElementById("load-more-btn");
  loadMoreButton.addEventListener("click", loadMoreCallback);
}
