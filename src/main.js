import { renderSignUp } from "./components/pages/signup.js";
import { renderLogin } from "./components/pages/login.js";
import { registerRoute,startRouter } from "./router/router.js";
import { renderProfile } from "./components/pages/profile.js";
import { renderDashboard } from "./components/pages/dashboard.js";
import { renderSidebar } from "./components/sidebar.js";

const root = document.getElementById("root");

registerRoute("/signup",renderSignUp);
registerRoute("/login",renderLogin);
registerRoute("/", renderSignUp); 
registerRoute("/profile",renderProfile);
registerRoute("/dashboard",renderDashboard);


startRouter(root);
