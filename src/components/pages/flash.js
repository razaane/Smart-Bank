import { renderSidebar } from "../sidebar";
import fakeData from "../../storage/fakeData.json";

function formatRemaining(ms) {
  if (ms <= 0) return "Expirée";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}j ${hours}h ${minutes}m ${seconds}s`;
}

export function renderOffresFlash(root) {
  root.innerHTML = "";

  const sidebar = renderSidebar();
  root.appendChild(sidebar);

  const content = document.createElement("div");
  content.className = "page-content";
  root.appendChild(content);

  const title = document.createElement("h1");
  title.textContent = "Offres Flash";
  content.appendChild(title);

  const list = document.createElement("div");
  list.className = "flash-list";

  const intervals = [];

  fakeData.flashOffers.forEach((offer) => {
    const card = document.createElement("div");
    card.className = "flash-card";

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = offer.titre;

    const cardDesc = document.createElement("p");
    cardDesc.textContent = offer.description;

    const countdown = document.createElement("p");
    countdown.className = "countdown";

    const expireDate = new Date(offer.expireAt).getTime();

    function updateCountdown() {
      const remaining = expireDate - Date.now();
      countdown.textContent = formatRemaining(remaining);
      if (remaining <= 0) {
        card.classList.add("expired");
        clearInterval(intervalId);
      }
    }

    const intervalId = setInterval(updateCountdown, 1000);
    intervals.push(intervalId);
    updateCountdown();

    card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(countdown);
    list.appendChild(card);
  });

  content.appendChild(list);

  return function cleanup() {
    intervals.forEach((id) => clearInterval(id));
  };
}