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
  phone.type="telephone";
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

  submitBtn.addEventListener("click",()=>{
    const actualEmail = email.value;
    const actualPass = password.value;
    console.log("email is :",actualEmail);
    console.log("password is :",actualPass);
  });

  root.appendChild(title);
  root.appendChild(fullName);
  root.appendChild(email);
  root.appendChild(phone);
  root.appendChild(password);
  root.appendChild(passwordVer);
  root.appendChild(submitBtn);
}

renderSignUp();