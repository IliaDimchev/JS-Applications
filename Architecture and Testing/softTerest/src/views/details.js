import { getIdeaById, deleteById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (idea, isOwner, onDelete) => html`
    <div class="container home some">
        <img class="det-img" src="${idea.img}" />
        <div class="desc">
            <h2 class="display-5">${idea.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${idea.description}</p>
        </div>
        ${isOwner ? html`<div class="text-center">
            <a @click=${onDelete} class="btn detb" href="javascript:void(0)">Delete</a>
        </div>` : nothing }

    </div>`;

    export async function showDetails(ctx) {

        const id = ctx.params.id;
        const user = ctx.user;
 

        const idea = await getIdeaById(id);
        const isOwner = user && user._id == idea._ownerId
        ctx.render(detailsTemplate(idea, isOwner, onDelete))

        async function onDelete() {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }