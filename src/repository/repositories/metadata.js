import Repository from "../repository";

const resource = "/metadata";

export default {

    get(years, disciplineIds) {
        let url = `${resource}`;

        if (years) {
            const copy = [...years];
            url += `?years=${copy[0]}`
            copy.shift();
            copy.forEach(y => {
                url += `&years=${y}`
            });
        }
        if (disciplineIds) {
            disciplineIds.forEach(d => {
                url += `&disciplineIds=${d}`
            });
        }
        return Repository.get(url);
    },

};
