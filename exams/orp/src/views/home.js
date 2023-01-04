import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const homeTemplate = (posts) => html`
        <section id="dashboard-page">
            <h1 class="title">All Posts</h1>
            <div class="all-posts">
                ${posts.length == 0 ? 
                    html`<h1 class="title no-posts-title">No posts yet!</h1>` : 
                    html`${posts.map(postTemplateCard)}` }
            </div>
        </section>`;

const postTemplateCard = (post) => html`
                <div class="post">
                    <h2 class="post-title">${post.title}</h2>
                    <img class="post-image" src=${post.imageUrl} alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/${post._id}" class="details-btn btn">Details</a>
                    </div>
                </div>`;

export async function showHome(ctx) {
    const posts = await getAll();
    ctx.render(homeTemplate(posts))
}