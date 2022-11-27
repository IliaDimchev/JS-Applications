import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";

const nav = document.querySelector('nav')

const navTemplate = (hasUser) => html`
        <nav></nav>
         <div class="container">
            <a class="navbar-brand" href="/">
                <img src="./images/idea.png" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/catalog">Dashboard</a>
                    </li>

                    ${hasUser ? html`                    
                    <li class="nav-item active">
                        <a class="nav-link" href="/create">Create</a>
                    </li>
                    <li class="nav-item">
                        <a @click=${onLogout} class="nav-link" href="javascript:void(0)">Logout</a>
                    </li>` : html`                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>`}
                    

                </ul>
            </div>
        </div>`;

export function updateNav() {
    const user = getUserData()
    render(navTemplate(user), nav);
}

function onLogout() {
    logout();
    updateNav()
    page.redirect('/')
}
