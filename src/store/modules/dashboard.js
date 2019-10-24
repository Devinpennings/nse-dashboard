const state = {
  selectedInstitutes: [],
  selectedYears: []
};

const mutations = {

  setSelectedInstitutes(state, institutes) {
    state.selectedInstitutes = institutes;
  },

  setSelectedYears(state, years) {
    state.selectedYears = years;
  }

};

export default {
  namespaced: true,
  state,
  mutations
}
