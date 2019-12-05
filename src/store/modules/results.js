import {RepositoryFactory} from "../../repository/repositoryFactory";

const state = {
  all: [],
};

const actions = {

  [CREATE_RESULT_REQUEST] ({_dispatch, _commit}, result) {

    return new Promise((resolve, reject) => {

      const repository = RepositoryFactory.get('disciplines');

      repository.getByInstitute(institute.instituteId)
        .then((result) => {

          const all = result.data.map((discipline) => {
            discipline.name = discipline.name + ' ' + discipline.degree;
            discipline.institute = institute;
            return discipline;
          });

          Promise.all(all)
            .then((complete) => {
              resolve(complete)
            });

        })
        .catch((e) => {
          reject(e);
        });


    });

  },

};

const mutations = {
  [ADD_SELECTED_DISCIPLINE](state, discipline) {
    state.selected = [
      ...state.selected,
      !state.selected.some(d => d.disciplineId === discipline.disciplineId) && discipline
    ];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
