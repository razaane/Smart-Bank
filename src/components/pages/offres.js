import { renderSidebar } from "../sidebar";
import fakeData from "../../storage/fakeData.json";

export function renderOffers(root){
    root.innerHTML ="";

    const sidebar =renderSidebar();
    root.appendChild(sidebar);

    const title = document.createElement("h1");
    title.textContent("Offres financières")
    root.appendChild(title);

    const list =document.createElement("div")
    list.className ="offre-list"

    

}