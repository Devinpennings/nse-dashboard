import Repository from "../repository";

const resource = "/topic";

export default {

  all() {
    return Repository.get(`${resource}`);
  },

  get(id) {
    return Repository.get(`${resource}/${id}`);
  },

  search(query, resultId) {
    let url = `${resource}/search?resultId=${resultId}&searchQuery=${query}`;

    return Repository.get(url);
  }

};
