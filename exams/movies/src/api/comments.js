import { get, post } from "./api.js";


const endpoints = {
    'commentsByMovieId': (id) => `/data/comments?where=${encodeURIComponent(`movieId=${id}`)}&load=author%3D_ownerId%3Ausers`,
    'getComments': (movieId) => `/data/comments?where=movieId%3D%22${movieId}%22&load=author%3D_ownerId%3Ausers`,
    'create': '/data/comments',
}

export async function getCommentById(movieId) {
    return await get(endpoints.getComments(movieId))
}

export async function createComment(movieId, content) {
    return await post(endpoints.create, {movieId, content})
}