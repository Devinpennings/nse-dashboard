import Vue from 'vue'
import Vuex from 'vuex'
import institutes from "./modules/institutes";
import locations from "./modules/locations";
import topicResults from "./modules/topic-results";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        institutes,
        locations,
        topicResults
    },
    strict: debug,
})