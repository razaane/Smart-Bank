import { renderSidebar } from "../sidebar.js";
import { getCurrentUser } from "../../storage/sessionStorage.js";
import { getHistory } from "../../storage/historyStorage.js";

export function renderHistory(root) {
  root.innerHTML = "";

  const sidebar = renderSidebar();
  root.appendChild(sidebar);

  const content = document.createElement("div");
  content.className = "page-content";
  root.appendChild(content);

  const title = document.createElement("h1");
  title.textContent = "Historique";
  content.appendChild(title);

  const userId = getCurrentUser();
  const history = getHistory(userId);

  if (history.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Aucune activité pour le moment.";
    content.appendChild(empty);
    return;
  }

  const list = document.createElement("ul");
  list.className = "history-list";

  history.forEach((entry) => {
    const li = document.createElement("li");
    const date = new Date(entry.date).toLocaleString("fr-FR");
    li.textContent = `[${date}] ${entry.action}`;
    list.appendChild(li);
  });

  content.appendChild(list);
}