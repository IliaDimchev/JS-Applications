import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const nav = document.querySelector('header')

const navTemplate = (hasUser) => html`
            <h1><a href="/">Orphelp</a></h1>

<nav>
    <a href="/">Dashboard</a>

    ${hasUser ? html`    <div id="user">
        <a href="/personal">My Posts</a>
        <a href="/create">Create Post</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>`: html`    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;

export function updateNav() {
    const user = getUserData()
    render(navTemplate(user), nav);
}

function onLogout() {
    logout();
    updateNav()
    page.redirect('/')
}