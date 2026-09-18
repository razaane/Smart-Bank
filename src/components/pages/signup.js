import { hashPassword } from "../../security/hash.js";
import { fullNameRegex, emailRegex, passwordRegex } from "../../utils/validators.js";
import { SaveUsers, findByEmail } from "../../storage/userStorage.js";
import { navigateTo } from "../../router/router.js";

export function renderSignUp(root) {
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "auth-page";

  const title = document.createElement("h1");
  title.textContent = "Créer un compte";

  const fullName = document.createElement("input");
  fullName.type = "text";
  fullName.placeholder = "Enter votre nom et prénom";
  fullName.id = "fullname";

  const email = document.createElement("input");
  email.type = "email";
  email.placeholder = "Entrer votre adresse email";
  email.id = "email";

  const password = document.createElement("input");
  password.type = "password";
  password.placeholder = "Entrer un mot de passe";
  password.id = "password";

  const passwordVer = document.createElement("input");
  passwordVer.type = "password";
  passwordVer.placeholder = "Confirmer votre mot de passe";
  passwordVer.id = "passwordVer";

  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "S'inscrire";

  const loginLink = document.createElement("p");
  loginLink.innerHTML = `Vous avez déjà un compte ? <span style="color:#2f7bff; cursor:pointer; text-decoration:underline;">Se connecter</span>`;
  loginLink.addEventListener("click", () => {
    navigateTo("/login");
  });

  submitBtn.addEventListener("click", async () => {
    const actualFullName = fullName.value;
    const actualEmail = email.value.trim();
    const actualPassword = password.value;
    const actualPassVer = passwordVer.value;

    if (!fullNameRegex.test(actualFullName)) {
      errorMsg.textContent = "Nom invalide";
      return;
    }

    if (!emailRegex.test(actualEmail)) {
      errorMsg.textContent = "Email invalide";
      return;
    }

    if (!passwordRegex.test(actualPassword)) {
      errorMsg.textContent = "Mot de passe invalide";
      return;
    }

    if (actualPassword !== actualPassVer) {
      errorMsg.textContent = "Les mots de passe ne correspondent pas";
      return;
    }

    if (findByEmail(actualEmail)) {
      errorMsg.textContent = "Cette email est déjà utilisée";
      return;
    }

    errorMsg.textContent = "";
    const hashedPassword = await hashPassword(actualPassword);

    SaveUsers({
      id: crypto.randomUUID(),
      fullName: actualFullName,
      email: actualEmail,
      passwordHash: hashedPassword,
    });
    navigateTo("/login");
  });

  container.appendChild(title);
  container.appendChild(fullName);
  container.appendChild(email);
  container.appendChild(password);
  container.appendChild(passwordVer);
  container.appendChild(errorMsg);
  container.appendChild(submitBtn);
  container.appendChild(loginLink);

  root.appendChild(container);
}