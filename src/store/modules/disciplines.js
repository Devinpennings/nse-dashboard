import {GET_DISCIPLINE_BY_INSTITUTE} from "../actions";
import {RepositoryFactory} from "../../repository/repositoryFactory";

const state = {
  all: [],
};

const actions = {

  [GET_DISCIPLINE_BY_INSTITUTE] ({_dispatch, _commit}, instituteId) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('disciplines');

      repository.getByInstitute(instituteId)
        .then((result) => {
          resolve(result.data)
        })
        .catch((e) => {
          reject(e);
        });
    });

  },

};

export default {
  namespaced: true,
  state,
  actions,
}
