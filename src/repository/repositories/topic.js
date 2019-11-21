import Repository from "../repository";

const resource = "/topics";

export default {

  all() {
    return Repository.get(`${resource}`);
  },

  get(id) {
    return Repository.get(`${resource}/${id}`);
  },

};
