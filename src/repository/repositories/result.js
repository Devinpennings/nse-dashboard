import Repository from "../repository";

const resource = "/result";

export default {

  all(type, years, disciplineIds) {
    return Repository.get(`${resource}`, {
      params: {
        years,
        type,
        disciplineIds
      }
    });
  },

  get(id) {
    return Repository.get(`${resource}/${id}`);
  },

};
