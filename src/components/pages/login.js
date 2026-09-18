import { hashPassword } from "../../security/hash.js";
import { findByEmail } from "../../storage/userStorage.js";
import { navigateTo } from "../../router/router.js";
import { setCurrentUser } from "../../storage/sessionStorage.js";
import { addHistoryEntry } from "../../storage/historyStorage.js";

export function renderLogin(root) {
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "auth-page";

  const title = document.createElement("h1");
  title.textContent = "Se connecter";

  const email = document.createElement("input");
  email.type = "email";
  email.placeholder = "Entrer votre adresse email";
  email.id = "login-email";

  const password = document.createElement("input");
  password.type = "password";
  password.placeholder = "Entrer votre mot de passe";
  password.id = "login-password";

  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Se connecter";

  const signuplink = document.createElement("p");
  signuplink.innerHTML = `Vous n'avez pas un compte ? <span style="color:#2f7bff; cursor:pointer; text-decoration:underline;">S'authentifier</span>`;
  signuplink.addEventListener("click", () => {
    navigateTo("/signup");
  });

  submitBtn.addEventListener("click", async () => {
    const actualEmail = email.value.trim();
    const actualPassword = password.value;

    const user = findByEmail(actualEmail);

    if (!user) {
      errorMsg.textContent = "Email introuvable";
      return;
    }

    const hashedPassword = await hashPassword(actualPassword);

    if (hashedPassword !== user.passwordHash) {
      errorMsg.textContent = "Mot de passe incorrect";
      return;
    }

    errorMsg.textContent = "";
    setCurrentUser(user.id);
    addHistoryEntry(user.id, { action: "Connexion réussie" });
    navigateTo("/dashboard");
  });

  container.appendChild(title);
  container.appendChild(email);
  container.appendChild(password);
  container.appendChild(errorMsg);
  container.appendChild(submitBtn);
  container.appendChild(signuplink);

  root.appendChild(container);
}