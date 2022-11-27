import { html } from "../lib.js";
import { getAllIdeas } from "../api/data.js";

const catalogTemplate = (ideas) => html`<div id="dashboard-holder">
    ${ideas.length == 0 ? html`<h1>No ideas yet! Be the first one :)</h1>
` : ideas.map(createIdeaCard)}
</div>`;

const createIdeaCard = (idea) => html`<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
<div class="card-body">
    <p class="card-text">${idea.title}</p>
</div>
<img class="card-image" src="${idea.img}" alt="Card image cap">
<a class="btn" href="/catalog/${idea._id}">Details</a>
</div>`;

export async function showCatalog(ctx) {
    const ideas = await getAllIdeas()

    ctx.render(catalogTemplate(ideas))
}