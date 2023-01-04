import { getAll } from "../api/data.js";
import { html } from "../lib.js";


const catalogTemplate = (albums) => html`<section id="dashboard">
    <h2>Albums</h2>

    ${albums.length > 0 ? html`    
    <ul class="card-wrapper"></ul>
    ${albums.map(albumCardTemplate)}   
    </ul>` : 
html`<p class="no-albums">There are no albums added yet.</p>`}
</section>`;

const albumCardTemplate = (album) => html` 
<li class="card">
    <img src=${album.imageUrl} alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    <a class="details-btn" href="/catalog/${album._id}">Details</a>
</li>`;

export async function showCatalog(ctx) {
    const albums = await getAll();
    ctx.render(catalogTemplate(albums));
}