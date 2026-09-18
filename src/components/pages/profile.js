import { getCurrentUser } from "../../storage/sessionStorage";
import { emailRegex, passwordRegex } from "../../utils/validators";
import { findByEmail, updateUser, findUserById } from "../../storage/userStorage";
import { hashPassword } from "../../security/hash";
import { navigateTo } from "../../router/router";
import { renderSidebar } from "../sidebar.js";

export function renderProfile(root) {
  root.innerHTML = "";

  const sidebar = renderSidebar();
  root.appendChild(sidebar);

  const content = document.createElement("div");
  content.className = "page-content";
  root.appendChild(content);

  const userId = getCurrentUser();
  const user = findUserById(userId);

  const title = document.createElement("h1");
  title.textContent = "Modifier mon profil";

  const email = document.createElement("input");
  email.type = "email";
  email.value = user.email;

  const password = document.createElement("input");
  password.type = "password";
  password.placeholder = "Entrer votre nouveau mot de passe";

  const msg = document.createElement("p");
  msg.style.color = "red";

  const saveBTn = document.createElement("button");
  saveBTn.textContent = "Enregistrer";

  saveBTn.addEventListener("click", async () => {
    const newActualEmail = email.value.trim();
    const newActualPass = password.value.trim();

    if (!emailRegex.test(newActualEmail)) {
      msg.style.color = "red";
      msg.textContent = "Email invalide";
      return;
    }

    const existingUser = findByEmail(newActualEmail);
    if (existingUser && existingUser.id !== userId) {
      msg.style.color = "red";
      msg.textContent = "Email déjà pris";
      return;
    }

    const data = { email: newActualEmail };

    if (newActualPass.length > 0) {
      if (!passwordRegex.test(newActualPass)) {
        msg.style.color = "red";
        msg.textContent = "Nouveau mot de passe invalide";
        return;
      }
      data.passwordHash = await hashPassword(newActualPass);
    }

    updateUser(userId, data);
    msg.style.color = "green";
    msg.textContent = "Profil mis à jour";
  });

  const backBtn = document.createElement("button");
  backBtn.textContent = "Retour au dashboard";
  backBtn.addEventListener("click", () => navigateTo("/dashboard"));

  content.appendChild(title);
  content.appendChild(email);
  content.appendChild(password);
  content.appendChild(msg);
  content.appendChild(saveBTn);
  content.appendChild(document.createElement("br"));
  content.appendChild(backBtn);
}