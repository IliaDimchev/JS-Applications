import { del, get, post, put } from "./api.js";


const pageSize = 2
const endpoints = {
    "movies": '/data/movies?sortBy=_createdOn%20desc',
    "byId": '/data/movies/'
}

export async function getAll(page, query) {
    let dataUrl = endpoints.movies;
    let sizeUrl = dataUrl;
    dataUrl += `&pageSize=${pageSize}&offset=${(page - 1) * pageSize}`;
    if (query) {
        dataUrl += `&where=${encodeURIComponent(`title LIKE "${query}"`)}`;
        sizeUrl += `&where=${encodeURIComponent(`title LIKE "${query}"`)}`;
    }
    sizeUrl += "&count"
    const [data, size] = await Promise.all([
        get(dataUrl),
        get(sizeUrl)
    ])

    return {
        data, 
        pages: Math.ceil(size / pageSize)
    };
};

export async function createMovie(movieData) {
    return post(`/data/movies/`, movieData)
};

export async function editMovie(movieData, id) {
    return put(`/data/movies/`+ id, movieData)
}

export async function getMovieById(id) {
    return get('/data/movies/' + id);
};

export async function getLikes(movieId) {
    return get(`/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
};

export async function deleteById(id) {
    return del('/data/movies/' + id);
};

