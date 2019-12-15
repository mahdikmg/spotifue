import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        playingRightNow: {}
    },
    getters: {

    },
    mutations: {
        setPlayingRightNow: ( state, payload ) => {
            state.playingRightNow = payload
        }
    },
    actions: {
        setPlayingRightNow: ( { commit }, payload ) => {
            commit('setPlayingRightNow', payload)
        }
    }
});
