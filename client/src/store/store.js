import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        playingRightNow: {},
        favorites: [],
        discoverList: [],
        discoveredMusics: []
    },
    mutations: {
        setPlayingRightNow: ( state, payload ) => {
            if (state.playingRightNow.url !== payload.url && payload.url !== null) {
                state.playingRightNow = payload
            }
        },
        setFavorites: ( state, payload ) => {
            state.favorites = payload
        },
        addFavorites: ( state, payload ) => {
            payload.status = true
            state.favorites.push(payload)
        },
        removeFavorites: ( state, payload ) => {
            state.favorites.forEach(function (item, index) {
                if (item.url === payload) {
                    state.favorites.splice(index, 1)
                }
            })
        },
        addToDiscoverList: ( state, payload ) => {
            if (state.discoverList.length < 5) {
                state.discoverList.push(payload)
            }
        },
        removeFromDiscoverList: ( state, payload ) => {
            state.discoverList.forEach( (item, index) => {
                if (item.id === payload) {
                    state.discoverList.splice(index, 1)
                }
            } )
        },
        setDiscoveredMusics: ( state, payload ) => {
            state.discoveredMusics = payload
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
        },
        addToDiscoverList: ( { commit }, payload ) => {
            commit('addToDiscoverList', payload)
        },
        removeFromDiscoverList: ( { commit }, payload ) => {
            commit('removeFromDiscoverList', payload)
        },
        setDiscoveredMusics: ( { commit }, payload ) => {
            commit('setDiscoveredMusics', payload)
        }
    }
});
