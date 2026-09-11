import { getCurrentUser } from "../../storage/sessionStorage";
import { emailRegex ,passwordRegex} from "../../utils/validators";
import { findByEmail ,updateUser,findUserById } from "../../storage/userStorage";
import { hashPassword } from "../../security/hash";
import { navigateTo } from "../../router/router";

export function renderProfile(root) {
    root.innerHTML = "";

    const userId = getCurrentUser();
    const user = findUserById(userId);

    const title = document.createElement("h1");
    title.textContent = "Modifier mon profil";

    const email =document.createElement("input");
    email.type ="email";
    email.value = user.email;

    const password=document.createElement("input");
    password.type="password";
    password.placeholder="Entrer vitre nouveau mot de passe";

    const saveBTn =document.createElement("button");
    saveBTn.textContent ="Enregistrer";

    const msg = document.createElement("p");
    msg.style.color="red";

    saveBTn.addEventListener("click",async ()=>{
        const newActualEmail = email.value.trim();
        const newActualPass=password.value.trim();

        if(!emailRegex.test(newActualEmail)){
            msg.textContent="Email invalid";
            return;
        }
        const existingUser = findByEmail(newActualEmail);
        if (existingUser && existingUser.id !== userId) {
            msg.textContent = "Email déjà pris";
            return;
        }
        const data ={
            email :newActualEmail
        }
        if (newActualPass.length > 0) {
        if (!passwordRegex.test(newActualPass)) {
            msg.textContent = "Nouveau mot de passe invalide";
            return;
        }
        data.passworHash = await hashPassword(newActualPass); 
        }

        updateUser(userId,data);
        msg.style.color ="green";
        msg.textContent ="Profil mis à jour";
    });

    const backBtn = document.createElement("button");
    backBtn.textContent="retour à dashboard";

    backBtn.addEventListener("click",()=>{
        navigateTo("/dashboard");
    });

    root.appendChild(title);
    root.appendChild(document.createElement("br"));
    root.appendChild(email);
    root.appendChild(document.createElement("br"));
    root.appendChild(password);
    root.appendChild(document.createElement("br"));
    root.appendChild(msg);
    root.appendChild(saveBTn);
    root.appendChild(document.createElement("br"));
    root.appendChild(document.createElement("br"));
    root.appendChild(backBtn);
    root.appendChild(msg);
} 
