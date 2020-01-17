<template>
    <div class="row px-4 justify-content-center" v-if="$store.state.discoverList.length > 0">
        <div class="col-7 d-flex align-items-center rounded bg-persian-green py-3 px-3 cursor-pointer mb-3"
        v-for="(item, index) in $store.state.discoveredMusics" :key="index"
        @click="setPlayingRightNow({ url: item.preview_url,
        image: item.album.images[2].url, artist: item.name, track: item.album.artists[0].name, status: true,
        favorite: false })">
            <img class="rounded border-0 mr-3" :src="item.album.images[2].url" width="64" height="64">
            <div class="text-white">
                <small class="font-weight-bold align-top d-block">{{ item.artists[0].name }}</small>
                <small class="align-baseline d-block">{{ item.name }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'result',
    methods: {
        ...mapActions([
            'setPlayingRightNow'
        ])
    }
}
</script>

<style scoped>
    .bg-persian-green {
        background-color: #71a559;
    }
</style>