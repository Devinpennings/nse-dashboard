import Repository from "../repository";
import * as axios from "axios";

const resource = "/institutes";

export default {

    all() {
        return Repository.get(`${resource}`);
    },

    get(id) {
        return Repository.get(`${resource}/${id}`);
    },

    getLocation(institute) {
        return axios.get(`https://geocode.xyz/${institute.city}+netherlands?json=1`);
    }


};
