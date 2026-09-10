const routes = {};

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

function render(root) {
  const path = window.location.pathname; // "/dashboard" بلا #
  const renderFn = routes[path] || routes["/404"];

  root.innerHTML = "";

  if (renderFn) {
    renderFn(root);
  }
}

export function navigateTo(path) {
  history.pushState({}, "", path); 
  render(document.getElementById("root"));
}

export function startRouter(root) {
  window.addEventListener("popstate", () => render(root));

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault(); 
      navigateTo(e.target.getAttribute("href"));
    }
  });

  render(root);
}