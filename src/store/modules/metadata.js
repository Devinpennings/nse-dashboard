import {RepositoryFactory} from "../../repository/repositoryFactory";
import {GET_METADATA} from "../actions";

const actions = {

    [GET_METADATA] ({_dispatch}, {years, disciplines}) {

        return new Promise((resolve, reject) => {

            const disciplineIds = disciplines && disciplines.map(d => d.disciplineId);

            const repository = RepositoryFactory.get('metadata');

            repository.get(years, disciplineIds)
                .then((result) => {
                    resolve(result.data)
                })
                .catch((e) => {
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
    actions,
    mutations
}
