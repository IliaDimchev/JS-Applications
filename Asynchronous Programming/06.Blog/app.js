function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", getPosts)
    document.getElementById("btnViewPost").addEventListener("click", getComments)
}

const posts = document.getElementById('posts');
const postTitle = document.getElementById('post-title');
const postBody = document.getElementById('post-body');
const postComments = document.getElementById('post-comments');

async function getPosts(e) {
    postsUrl = "http://localhost:3030/jsonstore/blog/posts"
    const response = await fetch(postsUrl);
    const data = await response.json();
    posts.innerHTML= "";
    for (post in data){
        const {body, id, title} = data[post]
        let option = document.createElement('option');
        option.setAttribute("value", `${id}`);
        option.textContent = `${title.toUpperCase()}`;
        posts.appendChild(option);
    }
}

async function getComments(e) {
    commentsUrl = "http://localhost:3030/jsonstore/blog/comments/"
    updateContent();
    const response = await fetch(commentsUrl);
    const data = await response.json();
    postComments.replaceChildren();
    for (comment in data){
        const {id, postId, text} = data[comment]
        if (postId === posts.value){
            let li = document.createElement('li');
            li.setAttribute('id', id);
            li.textContent = text;
            postComments.appendChild(li)
        }
    }
}

async function updateContent(e) {
    postUrl = "http://localhost:3030/jsonstore/blog/posts/"
    if (posts.value){
        const response = await fetch(postUrl+posts.value);
        const data = await response.json();
        postTitle.textContent = data.title.toUpperCase();
        postBody.textContent = data.body;
    }
}

attachEvents();