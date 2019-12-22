import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        playingRightNow: {},
        favorites: [],
    },
    mutations: {
        setPlayingRightNow: ( state, payload ) => {
            state.playingRightNow = payload
        },
        setFavorites: ( state, payload ) => {
            state.favorites = payload
        },
        addFavorites: ( state, payload ) => {
            state.favorites.push(payload)
        },
        removeFavorites: ( state, payload ) => {
            state.favorites.forEach(function (item, index) {
                if (item.url === payload) {
                    state.favorites.splice(index, 1)
                }
            })
        }
    },
    actions: {
        setPlayingRightNow: ( { commit }, payload ) => {
            commit('setPlayingRightNow', payload)
        },
        setFavorites: ( { commit }, payload ) => {
            commit('setFavorites', payload)
        },
        addFavorites: ( { commit }, payload ) => {
            commit('addFavorites', payload)
        },
        removeFavorites: ( { commit }, payload ) => {
            commit('removeFavorites', payload)
        }
    }
});
