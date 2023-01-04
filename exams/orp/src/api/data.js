import { del, get, post, put } from "./api.js";

export async function getAll() {
    return get('/data/posts?sortBy=_createdOn%20desc');
};

export async function getUserPosts(userId) {
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
};

export async function createPost(postData) {
    return await post('/data/posts', postData)
}

export async function getById(id) {
    return get(`/data/posts/` + id)
};

export async function editPost(id, postData) {
    return put('/data/posts/' + id, postData)
}

export async function deleteById(id) {
    return await del('/data/posts/' + id)
}