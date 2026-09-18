import { getCurrentUser } from "../storage/sessionStorage.js";
import { navigateTo } from "./router.js";

export function withAuth(renderFn) {
  return function (root) {
    const userId = getCurrentUser();

    if (!userId) {
      navigateTo("/login");
      return;
    }

    return renderFn(root);
  };
}
