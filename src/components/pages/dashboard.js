import { getCurrentUser, clearSession } from "../../storage/sessionStorage.js";
import { findUserById } from "../../storage/userStorage.js";
import { navigateTo } from "../../router/router.js";
import { renderSidebar } from "../sidebar.js";
import fakeData from "../../storage/fakeData.json";

export function renderDashboard(root) {
  root.innerHTML = "";

  const userId = getCurrentUser();
  if (!userId) {
    navigateTo("/login");
    return;
  }

  const sidebar = renderSidebar();
  root.appendChild(sidebar);

  const content = document.createElement("div");
  content.className = "page-content";
  root.appendChild(content);

  const user = findUserById(userId);
  const accountData = fakeData.accounts[userId];

  const welcome = document.createElement("h1");
  welcome.textContent = `Bienvenue, ${user.fullName}`;

  const soldeTitle = document.createElement("h3");
  soldeTitle.textContent = accountData
    ? `Solde total : ${accountData.solde} DH`
    : "Aucune donnée financière disponible";

  const comptesList = document.createElement("ul");
  if (accountData) {
    accountData.comptes.forEach((compte) => {
      const li = document.createElement("li");
      li.textContent = `${compte.type} (${compte.numero}) : ${compte.solde} DH`;
      comptesList.appendChild(li);
    });
  }

  const actions = document.createElement("div");
  actions.className = "dashboard-actions";

  const profileBtn = document.createElement("button");
  profileBtn.textContent = "Modifier mon profil";
  profileBtn.addEventListener("click", () => navigateTo("/profile"));

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Se déconnecter";
  logoutBtn.addEventListener("click", () => {
    clearSession();
    navigateTo("/login");
  });

  actions.appendChild(profileBtn);
  actions.appendChild(logoutBtn);

  content.appendChild(welcome);
  content.appendChild(soldeTitle);
  content.appendChild(comptesList);
  content.appendChild(actions);
}