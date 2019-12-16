import {RepositoryFactory} from "../../repository/repositoryFactory";
import {
  ADD_RESULT_REQUEST,
  CREATE_RESULT_REQUEST,
  FETCH_INCOMPLETE_REQUESTS,
  FETCH_REQUEST_STATUS,
  GET_SINGLE_RESULT,
  SET_SELECTED_RESULT,
  UPDATE_RESULT_REQUEST
} from "../actions";

const state = {
  all: [],
  selected: undefined
};

const actions = {

  [CREATE_RESULT_REQUEST] ({dispatch, _commit}, {type, years, disciplines}) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('results');
      repository.request(type, years, disciplines)
        .then((result) => {

          dispatch(FETCH_REQUEST_STATUS, result.data).then((result) => {
            resolve(result);
          });

        })
        .catch((e) => {
          reject(e);
        });

    });

  },

  [FETCH_INCOMPLETE_REQUESTS] ({dispatch}, requests) {

    return new Promise((resolve, _reject) => {

      const toFetch = requests.filter(r => r.status !== 'COMPLETE' || r.status !== 'FAILED');
      const execute = toFetch.map(r => dispatch(FETCH_REQUEST_STATUS, r));

      Promise.all(execute)
        .then((complete) => {
          resolve(complete)
        });

    });

  },

  [FETCH_REQUEST_STATUS] ({_dispatch, commit}, request) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('results');

      repository.get(request.resultId)
        .then((result) => {

          commit(UPDATE_RESULT_REQUEST, result.data);
          resolve(result.data);

        })
        .catch((e) => {
          reject(e);
        });

    });

  },

  [GET_SINGLE_RESULT] ({_dispatch, _commit}, resultId) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('results');

      repository.getTopicResult(resultId)
        .then((result) => {

          result.data.topics.forEach(t => {
            let array = [];
            t.words.forEach(w => array.push(w.value[0].charAt(0).toUpperCase() + w.value.substring(1)));
            t.value = array.join(', ');
          });
          resolve(result.data);

        })
        .catch((e) => {
          reject(e);
        });

    });

  }
};

const getters = {
  request: (state) => (id) => {
    return state.all.filter(r => r.requestId = id)
  },
  completed: state => {
    return state.all.filter(r => r.status === 'COMPLETE');
  }
};

const mutations = {
  [ADD_RESULT_REQUEST] (state, request) {
    if (state.all.some(r => r.resultId === request.resultId)) {
      throw new Error('Already exists');
    }
    state.all.push(request);
  },

  [UPDATE_RESULT_REQUEST] (state, request) {
    const toFind = state.all.find(r => r.resultId === request.resultId);

    if (toFind) {
      Object.assign(toFind, request);
    } else {
      state.all.push(request);
    }

  },

  [SET_SELECTED_RESULT] (state, result) {
    state.selected = result;
  }
};

export default {
  namespaced: true,
  mutations,
  getters,
  state,
  actions,
}
