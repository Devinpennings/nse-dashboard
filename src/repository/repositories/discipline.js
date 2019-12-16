import Repository from "../repository";

const resource = "/discipline";

export default {

  all() {
    return Repository.get(`${resource}`);
  },

  get(id) {
    return Repository.get(`${resource}/${id}`);
  },

  getByInstitute(instituteId) {
    return Repository.get(`${resource}/byinstitute/${instituteId}`);
  },

};
