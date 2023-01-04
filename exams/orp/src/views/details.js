import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { donate, getOwnDonation, getDonations } from "../api/donations.js";

const detailsTemplate = (post, hasUser, isOwner, donations, canDonate, onDelete, onDonate) => html`        <section id="details-page">
<h1 class="title">Post Details</h1>

<div id="container">
    <div id="details">
        <div class="image-wrapper">
            <img src=${post.imageUrl} alt="Material Image" class="post-image">
        </div>
        <div class="info">
            <h2 class="title post-title">${post.title}</h2>
            <p class="post-description">${post.description}</p>
            <p class="post-address">Address: ${post.address}</p>
            <p class="post-number">Phone number: ${post.phone}</p>
            <p class="donate-Item">Donate Materials: ${donations}</p>

            ${postControls(post, hasUser, isOwner, donations, canDonate, onDelete, onDonate)}

            </div>

        </div>
    </div>
</div>
</section>`;

// <!--Edit and Delete are only for creator-->
// <div class="btns">
//     <a href="#" class="edit-btn btn">Edit</a>
//     <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>

//     <!--Bonus - Only for logged-in users ( not authors )-->
//     <a href="#" class="donate-btn btn">Donate</a>

function postControls(post, hasUser, isOwner, donations, canDonate, onDelete, onDonate) {
    if (hasUser == false) {
        return nothing;
    }
    if (canDonate) {
        return html`
        <div class="actionBtn">
            <a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>
        </div>`;
    }
    if (isOwner) {
        return html`                    
        <div class="btns">
                <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`;
    }
}

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);

    const post = await getById(id)
    const isOwner = hasUser && ctx.user._id == post._ownerId;

    const donations = await getDonations(id)

    let hasDonation = 1
    if (hasUser){
        hasDonation = await getOwnDonation(id, ctx.user._id)
    }

    const canDonate = !isOwner && hasDonation == 0;

    ctx.render(detailsTemplate(post, hasUser, isOwner, donations, canDonate, onDelete, onDonate));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this pet?');
        
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate() {
        await donate(id)
        ctx.page.redirect('/' + id);
    }
}