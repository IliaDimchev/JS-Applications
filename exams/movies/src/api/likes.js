import { del, get, post } from "./api.js";

const endpoints = {
    'likesByMovieId': (id) => `/data/likes?where=${encodeURIComponent(`movieId=${id}`)}&count`,
    'likeByUserId' : (movieId, userId) => `/data/likes?where=${encodeURIComponent(`_ownerId=${userId} AND movieId=${movieId}`)}&count`,
    'like': '/data/likes',
    'dislike': '/data/likes/',
    'getLikes' : (movieId) => `/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`,
    'getUserLike' : (movieId, userId) => `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`,
}

export async function getAllLikes(movieId) {
    return get(endpoints.getLikes(movieId))
}

export async function getUserLike(movieId, userId) {
    return get(endpoints.getUserLike(movieId, userId))
}

export async function getLikesByMovieId(movieId, userId) {
    const requests = [];

    requests.push(get(endpoints.likesByMovieId(movieId)));

    if (userId) {
        requests.push(get(endpoints.likeByUserId(movieId, userId)))
    }

    const [likes, userLike] = await Promise.all(requests)

    return {
        likes,
        canLike: !userId || !userLike
    }
}

export async function likeMovie(movieId) {
    return await post(endpoints.like, {movieId})
}

export async function unlikeMovie(movieId) {
    return await del(endpoints.dislike + movieId)
}