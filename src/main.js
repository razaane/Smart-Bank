import { renderSignUp } from "./components/pages/signup.js";
import { renderLogin } from "./components/pages/login.js";
import { registerRoute,startRouter } from "./router/router.js";
import { withAuth } from "./router/authGuard.js"
import { renderProfile } from "./components/pages/profile.js";
import { renderDashboard } from "./components/pages/dashboard.js";

import { renderOffers } from "./components/pages/offres.js";
import { renderCredit } from "./components/pages/credit.js";
import { renderRewards } from "./components/pages/recompenses.js";
import { renderOffresFlash } from "./components/pages/flash.js";
import { renderHistory } from "./components/pages/history.js";
const root = document.getElementById("root");

registerRoute("/signup",renderSignUp);
registerRoute("/login",renderLogin);
registerRoute("/", renderSignUp); 
registerRoute("/profile",withAuth(renderProfile));
registerRoute("/dashboard",withAuth(renderDashboard));
registerRoute("/offres",withAuth(renderOffers));
registerRoute("/credit",withAuth(renderCredit));
registerRoute("/recompenses",withAuth(renderRewards));
registerRoute("/flash",withAuth(renderOffresFlash));
registerRoute("/history", withAuth(renderHistory));


startRouter(root);
