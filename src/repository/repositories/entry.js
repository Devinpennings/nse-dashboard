import Repository from "../repository";

const resource = "/entry";

export default {

  search(query, years, disciplineIds) {

    let url = `${resource}/search?searchQuery=${query}`;

    if (years) {
      const copy = [...years];
      copy.forEach(y => {
        url += `&years=${y}`
      });
    }
    if (disciplineIds) {
      disciplineIds.forEach(d => {
        url += `&disciplineIds=${d}`
      });
    }
    return Repository.get(url);
  }

};
