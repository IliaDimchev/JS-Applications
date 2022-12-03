import { getMovieById, deleteById, createMovie } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getAllLikes, getUserLike, likeMovie, unlikeMovie } from "../api/likes.js";
import { createSubmitHandler } from "../util.js";
import { createComment, getCommentById } from "../api/comments.js";

const detailsTemplate = (movie, user, isOwner, userId, likes, userLiked, onLike, onUnlike, onDelete, comments, onComment) => html`
      <section id="movie-example" class="view-section">
        <div class="container">
          <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${movie.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${movie.description}
              </p>
              ${movieControls(movie, user, isOwner, userId, likes, userLiked, onLike, onUnlike, onDelete, comments, onComment)}
              <span class="enrolled-span">Liked ${likes}</span>
            <ul>
              ${comments.map(c => html`<li>${c.author.email}: ${c.content}</li>`)}
            </ul>
              <div>
              <form @submit=${onComment}>
                <div>
                <textarea width="500" rows="10" name="content"></textarea>
                </div>
                <button>Post Comment</button>

              </form>
            </div>
            </div>
          </div>
        </div>
      </section>`;

// ${isOwner && user ? html`<a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
//                                  <a class="btn btn-warning" href="edit/${movie._id}">Edit</a>` : 
//                             html`${ userLiked == 0 ? html`<a class="btn btn-primary" href="javascript:void(0)" @click=${onLike}>Like</a>` : 
//                             html`<a class="btn btn-warning" href="javascript:void(0)" @click=${onUnlike}>Unlike</a>`}`}

function movieControls(movie, user, isOwner, userId, likes, userLiked, onLike, onUnlike, onDelete, comments, onComment) {
  if (!user) {
      return nothing;
  }

  if (isOwner) {
      return html`
      <a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>                            
      <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>`;
  }
  if (userLiked == 0) {
    return html`
      <a class="btn btn-primary" href="javascript:void(0)" @click=${onLike}>Like</a>`;
  }
  // } else { return html`
  // <a class="btn btn-warning" href="javascript:void(0)" @click=${onUnlike}>Unlike</a>`;
  // }
}

export async function showDetails(ctx) {
    const user = ctx.user;
    const id = ctx.params.id;
    let userId;
    if (user){
      userId = user._id
    }

    const movie = await getMovieById(id);
    const isOwner = user && ctx.user._id == movie._ownerId

    const comments = await getCommentById(id);

    const likes = await getAllLikes(id)
    const userLiked = await getUserLike(id, userId)
    let likeId = null
    if (userLiked.length > 0){
      likeId = userLiked[0]._id
    }

    ctx.render(detailsTemplate(movie, user, isOwner, userId, likes, userLiked,  onLike, onUnlike, onDelete, comments, createSubmitHandler(onComment)))

    async function onDelete() {
      await deleteById(id);
      ctx.page.redirect('/home');
    }

    async function onLike() {
      await likeMovie(id);
      ctx.page.redirect('/home/' + id)
    }

    async function onComment({content}) {
      await createComment(id, content)
      ctx.page.redirect('/home/' + id)
    }

    async function onUnlike() {
      await unlikeMovie(likeId);
      ctx.page.redirect('/home/' + id)
    }


}