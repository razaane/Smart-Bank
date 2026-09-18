import { navigateTo } from "../router/router";
import { clearSession } from "../storage/sessionStorage";
export function renderSidebar(root){
    const aside = document.createElement("aside");
    aside.className ="sidebar";
    aside.id ="sidebar";


    const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Offres", path: "/offres" },
    { label: "Simulation crédit", path: "/credit" },
    { label: "Récompenses", path: "/recompenses" },
    { label: "Offres flash", path: "/flash" },
    { label: "History", path: "/history" },
    { label: "Mon profil", path: "/profile" },
    ];

    links.forEach(({ label, path }) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.addEventListener("click", () => navigateTo(path));
        aside.appendChild(btn);
    });
        


    const lougOutBtn = document.createElement("button");
    lougOutBtn.textContent="Se Deconnecter";
    lougOutBtn.addEventListener("click",()=>{
        clearSession();
        navigateTo("/login");
    });
    aside.appendChild(lougOutBtn);

    return aside;
}