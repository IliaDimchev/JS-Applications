import { page, render } from "./lib.js";
import { updateNav } from "./views/nav.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";

const main = document.querySelector('main');

function parseQuery(ctx, next) {
    ctx.query = {}
    if (ctx.querystring){
        const query = Object.fromEntries(ctx.querystring
            .split('&')
            .map(e => e.split('=')))
            Object.assign(ctx.query, query)
    }

    next();
}

function session(ctx, next) {
    const user = getUserData();

    if (user) {
        ctx.user = user;
    }

    next();
}

page(session);
page(decorateContext);
page(parseQuery);
page('/', '/home');
page('/home', showHome);
page('/edit/:id', showEdit);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
page('/home/:id', showDetails);
page('*', () => console.log('404 Not Found  '))

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    // const user = getUserData();
    // if (user){
    //     ctx.user = user;
    // }

    next();
}

function renderMain(content) {
    render(content, main);
}
