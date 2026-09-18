import { renderSidebar } from "../sidebar";
import fakeData from "../../storage/fakeData.json";
import { getCurrentUser } from "../../storage/sessionStorage";
import { findUserById, updateUser } from "../../storage/userStorage";
import { addHistoryEntry } from "../../storage/historyStorage";

function pickReward(rewards) {
  const random = Math.random();
  let cumulative = 0;
  for (const reward of rewards) {
    cumulative += reward.probabilite;
    if (random <= cumulative) return reward;
  }
  return rewards[rewards.length - 1];
}

export function renderRewards(root) {
  root.innerHTML = "";

  const sidebar = renderSidebar();
  root.appendChild(sidebar);

  const content = document.createElement("div");
  content.className = "page-content";
  root.appendChild(content);

  const title = document.createElement("h1");
  title.textContent = "Roue des récompenses";
  content.appendChild(title);

  const spin = document.createElement("button");
  spin.textContent = "Tourner la roue";

  const resultatBox = document.createElement("h2");
  resultatBox.className = "reward-resultat";

  spin.addEventListener("click", () => {
    const userId = getCurrentUser();
    const user = findUserById(userId);

    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    if (user.lastSpin && now - user.lastSpin < day) {
      resultatBox.textContent = "Tu as déjà tourné la roue. Réessaie dans 24h";
      return;
    }

    spin.disabled = true;
    resultatBox.textContent = "🎰 ...";

    setTimeout(() => {
      const won = pickReward(fakeData.rewards);
      resultatBox.textContent = `🎉 ${won.label}`;

      updateUser(userId, { lastSpin: Date.now() });
      addHistoryEntry(userId, { action: `Spinner: ${won.label}` });
      spin.disabled = false;
    }, 1000);
  });

  content.appendChild(spin);
  content.appendChild(resultatBox);
}