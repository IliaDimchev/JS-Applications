function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", getPosts)
    document.getElementById("btnViewPost").addEventListener("click", getComments)
    // posts.addEventListener("change", getComments)
}

// const posts = document.getElementById('posts');
// const postTitle = document.getElementById('post-title');
// const postBody = document.getElementById('post-body');
// const postComments = document.getElementById('post-comments');

const posts = document.querySelector("#posts");
const postTitle = document.querySelector("#post-title");
const postBody = document.querySelector("#post-body");
const postComments = document.querySelector("#post-comments");

async function getPosts(e) {
    postsUrl = "http://localhost:3030/jsonstore/blog/posts/"
    const response = await fetch(postsUrl);
    const data = await response.json();
    posts.replaceChildren();

    for (item in data){
        const {body, id, title} = data[item]
        let option = document.createElement('option');
        option.setAttribute("value", `${id}`);
        option.textContent = `${title}`;
        posts.appendChild(option);
    }
}

async function getComments(e) {
    commentsUrl = "http://localhost:3030/jsonstore/blog/comments/"

    const res = await fetch("http://localhost:3030/jsonstore/blog/posts/")
    const allPosts = await res.json();

    const id = posts.value;
    const title = posts.options[posts.selectedIndex].text;
    console.log(Object.values(allPosts))
    const body = Object.values(allPosts).find(x => x.title === title);

    postTitle.textContent = title;
    postBody.textContent = body.body;
    
    const response = await fetch(commentsUrl);
    const info = await response.json();

    postComments.replaceChildren();
    Object.values(info).forEach(x => {
        if (id === x.postId) {
            const li = document.createElement('li');
            li.id = x.id;
            li.textContent = x.text;
            postComments.appendChild(li)
        }
    })

    // const response = await fetch(commentsUrl);
    // const data = await response.json();
    // postComments.replaceChildren();
    // for (comment in data){
    //     const {id, postId, text} = data[comment]
    //     if (postId === posts.value){
    //         let li = document.createElement('li');
    //         li.setAttribute('id', id);
    //         li.textContent = text;
    //         postComments.appendChild(li)
    //     }
    // }
}

// async function updateContent(e) {
//     postUrl = `http://localhost:3030/jsonstore/blog/posts/${posts.value}`
//     if (posts.value){
//         const response = await fetch(postUrl);
//         const data = await response.json();
//         postTitle.textContent = data.title;
//         postBody.textContent = data.body;
//     //     console.log(postTitle.textContent);
//     //     console.log(postBody.textContent);
//     // } else {
//     //    console.log('no value') 
//     }
// }

attachEvents();