import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { updateNav } from "./views/nav.js";
import { showPersonal } from "./views/personal.js";
import { showRegister } from "./views/register.js";

const main = document.getElementById('main-content');

page(decorateContext);
page('/', showHome);
page('/personal', showPersonal);
page('/edit/:id', showEdit);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
page('/:id', showDetails);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if (user){
        ctx.user = user;
    }

    next();
}

function renderMain(content) {
    render(content, main);
}