// const root = document.getElementById("root");
// const message = document.createElement("h1");
// message.textContent ="hey girl";
// root.appendChild(message);

const root = document.getElementById("root");

function render() {
  const hash = window.location.hash; 

  
  root.innerHTML = "";

  
  const title = document.createElement("h1");

  if (hash === "#/dashboard") {
    title.textContent = "Ana f Dashboard";
  } else if (hash === "#/offres") {
    title.textContent = "Ana f Offres";
  } else {
    title.textContent = "Ana f Accueil";
  }


  root.appendChild(title);
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);