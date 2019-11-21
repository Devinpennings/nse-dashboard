import {RepositoryFactory} from "../../repository/repositoryFactory";
import {FETCH_TOPICS} from "../actions";

const state = {
  all: [],
};

const actions = {

  [FETCH_TOPICS] ({commit}) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('topics');

      repository.all()
        .then((result) => {
          let topics = result.data.map((r) => {
            return {
              ...r,
              value: r.words.map(s => s.value.charAt(0).toUpperCase() + s.value.substring(1)).join(', '),
            }
          });
          commit('setTopics', topics);
          resolve(topics)
        })
        .catch((e) => {
          reject(e);
        });
    });

  },

};

const mutations = {
  setTopics(state, topics) {
    state.all = topics
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
