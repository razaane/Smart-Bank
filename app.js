const root = document.getElementById("root");

function renderSignUp(){
  root.innerHTML="";

  const title =document.createElement("h1");
  title.textContent ="Créer un compte";

  const fullName = document.createElement("input");
  fullName.type = "text";
  fullName.placeholder="Enter votre nomet prénom ";
  fullName.id = "fullname";

  const email = document.createElement("input");
  email.type="email";
  email.placeholder="Entrer votre adresse email ";
  email.id ="email";

  const phone = document.createElement("input");
  phone.type="tel";
  phone.placeholder="+212*********";
  phone.id = "phone";

  const password = document.createElement("input");
  password.type ="password";
  password.placeholder="Entrer un mot de passe";
  password.id="password";

  const passwordVer = document.createElement("input");
  passwordVer.type ="password";
  passwordVer.placeholder="Confirmer votre mot de passe";
  passwordVer.id="password";

  const submitBtn= document.createElement("button");
  submitBtn.textContent ="S'inscrire";


  const fullNameRegex = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+212 [67]\d{8}$/;
  const passwordRegex = /^(?=.*[^A-Za-z0-9]).{8,}$/;


submitBtn.addEventListener("click", () => {

    const actualFullName = fullName.value;
    const actualEmail = email.value;
    const actualPhone = phone.value;
    const actualPass = password.value;
    const actualPassVer = passwordVer.value;

    console.log(fullNameRegex.test(actualFullName));
    console.log(emailRegex.test(actualEmail));
    console.log(phoneRegex.test(actualPhone));
    console.log(passwordRegex.test(actualPass));

    if (!fullNameRegex.test(actualFullName)) {
        console.log("Nom invalide");
        return;
    }

    if (!emailRegex.test(actualEmail)) {
        console.log("Email invalide");
        return;
    }

    if (!phoneRegex.test(actualPhone)) {
        console.log("Téléphone invalide");
        return;
    }

    if (!passwordRegex.test(actualPass)) {
        console.log("Mot de passe invalide");
        return;
    }

    if (actualPass !== actualPassVer) {
        console.log("Les mots de passe ne correspondent pas");
        return;
    }

    console.log("Toutes les données sont valides !");
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

renderSignUp();