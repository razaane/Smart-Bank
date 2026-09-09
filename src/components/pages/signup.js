import { hashPassword } from "../../security/hash.js";
import { fullNameRegex, emailRegex, passwordRegex } from "../../utils/validators.js";
import { SaveUsers ,findByEmail } from "../../storage/userStorage.js";

export function renderSignUp(root) {
  root.innerHTML = "";

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

  const phone = document.createElement("input");
  phone.type = "tel";
  phone.placeholder = "+212 6********";
  phone.id = "phone";

  const password = document.createElement("input");
  password.type = "password";
  password.placeholder = "Entrer un mot de passe";
  password.id = "password";

  const passwordVer = document.createElement("input");
  passwordVer.type = "password";
  passwordVer.placeholder = "Confirmer votre mot de passe";
  passwordVer.id = "passwordVer";

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "S'inscrire";

  submitBtn.addEventListener("click", async () => {
    const actualFullName = fullName.value;
    const actualEmail = email.value;
    const actualPhone = phone.value;
    const actualPassword = password.value;
    const actualPassVer = passwordVer.value;

    if (!fullNameRegex.test(actualFullName)) {
      console.log("Nom invalide");
      return;
    }

    if (!emailRegex.test(actualEmail)) {
      console.log("Email invalide");
      return;
    }


    if (!passwordRegex.test(actualPassword)) {
      console.log("Mot de passe invalide");
      return;
    }

    if (actualPassword !== actualPassVer) {
      console.log("Les mots de passe ne correspondent pas");
      return;
    }

    if(findByEmail(actualEmail)){
      console.log("Cette email deja utilisé");
      return;
    }
    const hashedPassword = await hashPassword(actualPassword);
    console.log("Toutes les données sont valides !");
    console.log("Password haché:", hashedPassword);

    SaveUsers({
      fullName :actualFullName,
      email:actualEmail,
      phone:actualPhone,
      password:hashedPassword,
    });
  });

  root.appendChild(title);
  root.appendChild(document.createElement("br"));
  root.appendChild(document.createElement("br"));
  root.appendChild(fullName);
  root.appendChild(document.createElement("br"));
  root.appendChild(email);
  root.appendChild(document.createElement("br"));
  root.appendChild(phone);
  root.appendChild(document.createElement("br"));
  root.appendChild(password);
  root.appendChild(document.createElement("br"));
  root.appendChild(passwordVer);
  root.appendChild(document.createElement("br"));
  root.appendChild(submitBtn);
}