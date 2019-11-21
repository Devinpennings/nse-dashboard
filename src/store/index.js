import Vue from 'vue'
import Vuex from 'vuex'
import institutes from "./modules/institutes";
import locations from "./modules/locations";
import topics from "./modules/topics";
import dashboard from "./modules/dashboard";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        institutes,
        locations,
        topics,
        dashboard
    },
    strict: debug,
})