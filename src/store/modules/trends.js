import {RepositoryFactory} from "../../repository/repositoryFactory";
import {GET_TRENDS} from "../actions";

const actions = {

  [GET_TRENDS] ({_dispatch}, {topicIds}) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('trend');

      repository.get(topicIds)
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
  actions,
}
