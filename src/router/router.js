const routes = {};
let currentCleanup = null;

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

function render(root) {

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  const path = window.location.pathname;
  const renderFn = routes[path] || routes["/404"];

  root.innerHTML = "";

  if (renderFn) {
    const cleanup = renderFn(root);
    if (typeof cleanup === "function") {
      currentCleanup = cleanup;
    }
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