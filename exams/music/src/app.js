import { showCatalog } from "./views/catalog.js";
import { page, render } from "./lib.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { updateNav } from "./api/nav.js";
import { getUserData } from "./util.js";
import { showRegister } from "./views/register.js";
import { showDetails } from "./views/details.js";
import { showCreate } from "./views/create.js";
import { showEdit } from "./views/edit.js";
import { showSearch } from "./views/search.js";

const main = document.getElementById('main-content');

page(decorateContext);
page('/', showHome);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/create', showCreate);
page('/login', showLogin);
page('/search', showSearch);
page('/register', showRegister);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if (user) {
        ctx.user = user
    };

    next();
}

function renderMain(content) {
    render(content, main);
}