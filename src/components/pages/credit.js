import { renderSidebar } from "../sidebar";
import fakeData from "../../storage/fakeData.json";
import { getCurrentUser } from "../../storage/sessionStorage";
import { saveCredits } from "../../storage/userStorage";

export function renderCredit(root){
    root.innerHTML="";

    const currentUser = getCurrentUser();
    const sidebar = renderSidebar();
    root.appendChild(sidebar);

    const title = document.createElement("h1");
    title.textContent="Simulation de crédit";
    root.appendChild(title);

    const {tauxAnnuel,dureeMinMois,dureeMaxMois,montantMin,montantMax} =fakeData.creditRates;

    const infos = document.createElement("p");
    infos.textContent=`Le taux annuel : ${tauxAnnuel} | Les durees possibles entre : ${dureeMinMois}-${dureeMaxMois} | Les montants entre : ${montantMin}-${montantMax}`;
    root.appendChild(infos);

    const montantInput = document.createElement("input");
    montantInput.placeholder=`Montant ${montantMin}-${montantMax}`;
    montantInput.type="number";
    root.appendChild(montantInput);

    const dureeInput = document.createElement("input");
    dureeInput.placeholder=`Duree ${dureeMinMois}-${dureeMaxMois}`;
    dureeInput.type="number";
    root.appendChild(dureeInput);

    const simulerBtn = document.createElement("button");
    simulerBtn.textContent="Simuler";
    root.appendChild(simulerBtn);

    const resultatBox = document.createElement("div");
    resultatBox.className="resultat-box";

    simulerBtn.addEventListener("click",()=>{
        const montant = Number(montantInput.value);
        const duree=Number(dureeInput.value);

        resultatBox.textContent="";

        if(montant<montantMin || montant>montantMax){
            resultatBox.textContent= `Montant invalide (entre ${montantMin} et ${montantMax} DH)`;
            return;
        }
        if(duree<dureeMinMois || duree>dureeMaxMois){
            resultatBox.textContent=`Durée invalide (entre ${dureeMinMois} et ${dureeMaxMois} mois)`;
            return;
        }

        const tauxMensuel =tauxAnnuel/100/12;
        const mensualite = (montant * tauxMensuel * Math.pow(1+tauxMensuel,duree))/(Math.pow(1+tauxMensuel,duree)-1);

        const coutTotal = mensualite *duree ;
        const coutCredit =coutTotal-montant;

        resultatBox.innerHTML=`
            <p><strong>Mensualité :</strong> ${mensualite.toFixed(2)} DH</p>
            <p><strong>Coût total :</strong> ${coutTotal.toFixed(2)} DH</p>
            <p><strong>Coût du crédit (intérêts) :</strong> ${coutCredit.toFixed(2)} DH</p>
        `;
        const data ={
            Montant :montant,
            Duree:duree,
            Taux_Annuel :tauxAnnuel,
            Mensualité :mensualite,
            Cout_Total :coutTotal,
            Cout_Credit:coutCredit,
        }
        saveCredits(currentUser,data);
    
    });

    root.appendChild(resultatBox);
}