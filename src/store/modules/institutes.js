import {FETCH_INSTITUTE_LOCATION, FETCH_INSTITUTES} from "../actions";
import {RepositoryFactory} from "../../repository/repositoryFactory";

const state = {
  all: [],
};

const actions = {

  [FETCH_INSTITUTES] ({dispatch, commit}) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('institutes');

      repository.all()
        .then((result) => {

          const all = result.data.map((institute) => {
            return dispatch(FETCH_INSTITUTE_LOCATION, institute);
          });

          Promise.all(all)
            .then((complete) => {
              commit('setInstitutes', complete);
              resolve(complete)
            });

        })
        .catch((e) => {
          reject(e)
        });
    });

  },

  [FETCH_INSTITUTE_LOCATION] ({state}, institute) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('institutes');
      repository.getLocation(institute)
        .then((result) => {

          institute.latt = result.data.latt;
          institute.longt = result.data.longt;

          resolve(institute)

        }).catch((error) => {
          reject(error)
      })

    });

  }

};

const mutations = {
  setInstitutes(state, institutes) {
    state.all = institutes
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
