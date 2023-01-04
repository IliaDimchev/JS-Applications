import { getUserPosts } from "../api/data.js";
import { html } from "../lib.js";

const personalTemplate = (posts) => html`
        <section id="dashboard-page">
            <h1 class="title">My Posts</h1>
            <div class="all-posts">
                ${posts.length == 0 ? 
                    html`<h1 class="title no-posts-title">You have no posts yet!</h1>` : 
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

export async function showPersonal(ctx) {
    const user = ctx.user
    
    // let userId = ''
    // if (user){
    //     userId = user._id
    // }

    const userId = user._id

    const posts = await getUserPosts(userId);
    ctx.render(personalTemplate(posts))
}