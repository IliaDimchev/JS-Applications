import { del, get, post, put } from "./api.js";

export async function getAll() {
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
};

export async function getById(id) {
    return get('/data/albums/' + id)
}

export async function deleteById(id) {
    return del('/data/albums/' + id)
}

export async function createAlbum(albumData) {
    return post('/data/albums', albumData)
}

export async function editAlbum(id, albumData) {
    return put('/data/albums/' + id, albumData)
}

export async function searchAlbums(query) {
    return get(`/data/albums?where=name%20LIKE%20%22${query}%22`)
}