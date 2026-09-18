import { renderSidebar } from "../sidebar";
import fakeData from "../../storage/fakeData.json";
import { getCurrentUser } from "../../storage/sessionStorage";
import { addHistoryEntry } from "../../storage/historyStorage";

export function renderCredit(root) {
  root.innerHTML = "";

  const sidebar = renderSidebar();
  root.appendChild(sidebar);

  const content = document.createElement("div");
  content.className = "page-content";
  root.appendChild(content);

  const title = document.createElement("h1");
  title.textContent = "Simulation de crédit";
  content.appendChild(title);

  const { tauxAnnuel, dureeMinMois, dureeMaxMois, montantMin, montantMax } = fakeData.creditRates;

  const infos = document.createElement("p");
  infos.textContent = `Taux annuel : ${tauxAnnuel}% | Durée : ${dureeMinMois}-${dureeMaxMois} mois | Montant : ${montantMin}-${montantMax} DH`;
  content.appendChild(infos);

  const montantInput = document.createElement("input");
  montantInput.placeholder = `Montant (${montantMin}-${montantMax})`;
  montantInput.type = "number";
  content.appendChild(montantInput);

  const dureeInput = document.createElement("input");
  dureeInput.placeholder = `Durée (${dureeMinMois}-${dureeMaxMois})`;
  dureeInput.type = "number";
  content.appendChild(dureeInput);

  const simulerBtn = document.createElement("button");
  simulerBtn.textContent = "Simuler";
  content.appendChild(simulerBtn);

  const resultatBox = document.createElement("div");
  resultatBox.className = "resultat-box";

  simulerBtn.addEventListener("click", () => {
    const montant = Number(montantInput.value);
    const duree = Number(dureeInput.value);

    resultatBox.innerHTML = "";

    if (montant < montantMin || montant > montantMax) {
      resultatBox.textContent = `Montant invalide (entre ${montantMin} et ${montantMax} DH)`;
      return;
    }
    if (duree < dureeMinMois || duree > dureeMaxMois) {
      resultatBox.textContent = `Durée invalide (entre ${dureeMinMois} et ${dureeMaxMois} mois)`;
      return;
    }

    const tauxMensuel = tauxAnnuel / 100 / 12;
    const mensualite =
      (montant * tauxMensuel * Math.pow(1 + tauxMensuel, duree)) /
      (Math.pow(1 + tauxMensuel, duree) - 1);

    const userId = getCurrentUser();
    addHistoryEntry(userId, {
      action: `Simulation crédit: ${montant} DH sur ${duree} mois`,
    });

    const coutTotal = mensualite * duree;
    const coutCredit = coutTotal - montant;

    resultatBox.innerHTML = `
      <p><strong>Mensualité :</strong> ${mensualite.toFixed(2)} DH</p>
      <p><strong>Coût total :</strong> ${coutTotal.toFixed(2)} DH</p>
      <p><strong>Coût du crédit (intérêts) :</strong> ${coutCredit.toFixed(2)} DH</p>
    `;
  });

  content.appendChild(resultatBox);
}