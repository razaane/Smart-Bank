import { renderSignUp } from "./components/pages/signup.js";
import { renderLogin } from "./components/pages/login.js";
import { registerRoute,startRouter } from "./router/router.js";

const root = document.getElementById("root");
registerRoute("/signup",renderSignUp);
registerRoute("/login",renderLogin);
registerRoute("/", renderSignUp); 

startRouter(root);
