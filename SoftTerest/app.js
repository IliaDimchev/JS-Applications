import { logout } from "./src/api/user.js";
import { initialize } from "./src/router.js"
import { showCatalog } from "./src/views/catalog.js";
import { showCreate } from "./src/views/create.js";
import { showDetails } from "./src/views/details.js";
import { showHome } from "./src/views/home.js"
import { showLogin } from "./src/views/login.js";
import { showRegister } from "./src/views/register.js";



// const registerView = document.getElementById("registerView");
// const loginView = document.getElementById("loginView");
// const dashboard = document.getElementById("dashboard-holder");
// const detailsView = document.getElementById("detailsView");
// const createView = document.getElementById("createView");

document.getElementById("defSection").remove();


const links = {
    "/": showHome,
    "/catalog": showCatalog,
    "/login": showLogin,
    "/register": showRegister,
    "/details": showDetails,
    "/create": showCreate,
    "/logout": async function () {
        await logout();
        router.goTo("/");
        router.updateNavigate();
    }
}



// window.test = function test() {
//     debugger;
//     showHome(context)
// }
// window.context = context;

// showHome(context)

const router = initialize(links);
router.updateNavigate();
router.goTo("/");


