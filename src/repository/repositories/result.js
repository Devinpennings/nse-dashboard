import Repository from "../repository";

const resource = "/result";

export default {

  request(type, years, disciplineIds) {
    let url = `${resource}/request?type=${type}`;

    if (years) {
      years.forEach(y => {
        url += `&years=${y}`
      });
    }
    if (disciplineIds) {
      disciplineIds.forEach(d => {
        url += `&disciplineIds=${d.disciplineId}`
      });
    }
    return Repository.get(url);
  },

  get(id) {
    return Repository.get(`${resource}/${id}`);
  },

  getTopicResult(id) {
    return Repository.get(`/topicresult/${id}`)
  }

};
