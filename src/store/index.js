import Vue from 'vue'
import Vuex from 'vuex'
import institutes from "./modules/institutes";
import locations from "./modules/locations";
import topics from "./modules/topics";
import dashboard from "./modules/dashboard";
import disciplines from "./modules/disciplines";
import results from "./modules/results";
import metadata from './modules/metadata';
import entries from './modules/entries';
import trends from './modules/trends';
import {VuexPersistence} from "vuex-persist";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
    strictMode: debug,
    storage: window.localStorage
});

export default new Vuex.Store({
    modules: {
        institutes,
        locations,
        topics,
        disciplines,
        dashboard,
        results,
        metadata,
        entries,
        trends
    },
    strict: debug,
    plugins: [vuexLocal.plugin],
    mutations: {
        RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
    }
});