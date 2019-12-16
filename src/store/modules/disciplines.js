import {ADD_SELECTED_DISCIPLINE, GET_DISCIPLINE_BY_INSTITUTE, REMOVE_SELECTED_DISCIPLINE} from "../actions";
import {RepositoryFactory} from "../../repository/repositoryFactory";

const state = {
  all: [],
  selected: []
};

const actions = {

  [GET_DISCIPLINE_BY_INSTITUTE] ({_dispatch, _commit}, institute) {

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

  [REMOVE_SELECTED_DISCIPLINE](state, discipline) {
    const item = state.selected.find(d => d.disciplineId === discipline.disciplineId);
    const i = state.selected.indexOf(item);
    state.selected.splice(i, 1);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
