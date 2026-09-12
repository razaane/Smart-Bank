import { renderSidebar } from "../sidebar";
import fakeData from "../../storage/fakeData.json";

export function renderOffers(root){
    root.innerHTML ="";

    const sidebar =renderSidebar();
    root.appendChild(sidebar);

    const title = document.createElement("h1");
    title.textContent="Offres financières";
    root.appendChild(title);

    const list =document.createElement("div")
    list.className ="offre-list"

    fakeData.offres.forEach((offre)=>{
        const card = document.createElement("div");
        card.className="offre-card";

        const cardTitle = document.createElement("h3")
        cardTitle.textContent=offre.titre;

        const cardDesc =document.createElement("p");
        cardDesc.textContent=offre.description;

        const cardCategory =document.createElement("span");
        cardCategory.className="badge";
        cardCategory.textContent =offre.categorie;

        card.appendChild(cardTitle);
        card.appendChild(cardDesc);
        card.appendChild(cardCategory);
        list.appendChild(card);
    })
    root.appendChild(list);

}