import {RepositoryFactory} from "../../repository/repositoryFactory";
import {SEARCH_ENTRIES} from "../actions";

const actions = {

  [SEARCH_ENTRIES] ({_commit}, {searchQuery, years, disciplineIds}) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('entry');

      repository.search(searchQuery, years, disciplineIds)
          .then((result) => {
            resolve(result.data);
          })
          .catch((e) => {
            reject(e);
          })
    });

  }

};

const mutations = {
  setTopics(state, topics) {
    state.all = topics
  }
};

export default {
  namespaced: true,
  actions,
  mutations
}
