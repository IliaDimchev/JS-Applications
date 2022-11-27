import { getAll } from "../api/data.js";
import { html, nothing } from "../lib.js";

const catalogTemplate = (albums, hasUser) => html`
        <section id="catalogPage">
        <h1>All Albums</h1>
        ${albums.length == 0 ? html`
        <p>No Albums in Catalog!</p>
                ` : albums.map(x => createAlbumCard(x, hasUser))}
        
        </section>`;

const createAlbumCard = (albums, hasUser) => html`
    <div class="card-box">
    <img src="${albums.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${albums.name}</p>
            <p class="artist">Artist: ${albums.artist}</p>
            <p class="genre">Genre: ${albums.genre}</p>
            <p class="price">Price: $${albums.price}</p>
            <p class="date">Release Date: ${albums.releaseDate}</p>
        </div>
        ${hasUser ? html`        <div class="btn-group">
            <a href="/catalog/${albums._id}" id="details">Details</a>
        </div>` : nothing}
    </div>
</div>`;



export async function showCatalog(ctx) {
    const albums = await getAll();
    const user = ctx.user;
    ctx.render(catalogTemplate(albums, user));
}

