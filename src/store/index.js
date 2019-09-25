import Vue from 'vue'
import Vuex from 'vuex'
import institutes from "./modules/institutes";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        institutes,
    },
    strict: debug,
})