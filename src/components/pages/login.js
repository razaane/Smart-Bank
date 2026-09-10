import { hashPassword } from "../../security/hash.js";
import { findByEmail } from "../../storage/userStorage.js";
import { navigateTo } from "../../router/router.js";
import { setCurrentUser } from "../../storage/sessionStorage.js";

export function renderLogin(root) {
  root.innerHTML = "";

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

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Se connecter";

  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";

  submitBtn.addEventListener("click", async () => {
    const actualEmail = email.value;
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
    console.log("Connexion réussie !", user);
    navigateTo("/dashboard");
  });

  root.appendChild(title);
  root.appendChild(document.createElement("br"));
  root.appendChild(document.createElement("br"));
  root.appendChild(email);
  root.appendChild(document.createElement("br"));
  root.appendChild(password);
  root.appendChild(document.createElement("br"));
  root.appendChild(submitBtn);
  root.appendChild(errorMsg);
}