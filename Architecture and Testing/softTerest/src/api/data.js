import { del, get, post } from "./api.js";

export async function getAllIdeas() {
    return get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
};

export async function getIdeaById(id) {
    return get(`/data/ideas/` + id);
};

export async function deleteById(id) {
    return del(`/data/ideas/` + id);
}

export async function createIdea(ideaData) {
    return post(`/data/ideas`, ideaData)
}