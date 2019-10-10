import {RepositoryFactory} from "../../repository/repositoryFactory";
import {FETCH_TOPIC_RESULTS} from "../actions";

const state = {
  all: [],
};

const actions = {

  [FETCH_TOPIC_RESULTS] ({commit}) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('topicResults');

      repository.all()
        .then((result) => {
          commit('setTopics', result.data);
          resolve(result.data)
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
