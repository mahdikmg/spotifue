<template>
    <div class="row px-4 justify-content-center">
        <div class="col-7 text-center" v-show="!($store.state.favorites.length > 0)">
            add some music to your favorite list.
        </div>
        <div class="col-7 d-flex align-items-center rounded bg-mint py-3 px-3 cursor-pointer mb-3"
        v-for="(track, index) in $store.state.favorites" :key="index"
        @click="setPlayingRightNow(track)">
            <img class="rounded border-0 mr-3" :src="track.image" width="64" height="64">
            <div class="text-white">
                <small class="font-weight-bold align-top d-block">{{ track.artist }}</small>
                <small class="align-baseline d-block">{{ track.track }}</small>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "favorites",
        methods: {
            ...mapActions([
                'setPlayingRightNow'
            ]),
        }
    }
</script>

<style scoped>
    .bg-mint {
        background-color: #41B883;
    }
</style>
