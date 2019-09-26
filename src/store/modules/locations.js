import {FETCH_INSTITUTES, FETCH_LOCATIONS} from "../actions";

const state = {
  all: [],
};

const actions = {

  [FETCH_LOCATIONS] ({dispatch, commit}) {

    return new Promise((resolve, reject) => {

      dispatch(`institutes/${FETCH_INSTITUTES}`, null, {root:true})
        .then((result) => {

          const locations = {};
          result.forEach((inst) => {

            if (!locations[inst.city]) {
              locations[inst.city] = {
                name: inst.city,
                institutes: [inst],
                longt: inst.longt,
                latt: inst.latt
              }
            } else {
              locations[inst.city].institutes.push(inst);
            }

          });

          commit('setLocations', Object.values(locations));
          resolve(Object.values(locations));

        }).catch((e) => {
          reject(e);
      });

    });

  },

};

const mutations = {
  setLocations(state, locations) {
    state.all = locations
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
