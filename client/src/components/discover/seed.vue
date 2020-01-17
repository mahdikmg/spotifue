<template>
  <div class="row px-4 justify-content-around">
        <div class="col-12 text-center">
            <p>Find your favorite musics and add them (max 5, min 1) to get recommended musics like them.</p>
        </div>
        <div class="col-12 text-center mb-4" v-if="$store.state.discoveredMusics.length > 0">
            <router-link class="btn btn-primary" tag="a" to="/discover/result">last result</router-link>
        </div>
        <div class="col-4">
            <form class="form-inline">
                <div class="input-group">
                    <div class="input-group-prepend rounded-left bg-light d-flex justify-content-center align-items-center px-2">
                        <span class="icon icon-search input-group-text border-0 p-0" id="searchPrepend"></span>
                    </div>
                    <input type="search" class="form-control no-focus border-0 bg-light pl-0" placeholder="Search"
                        aria-describedby="searchPrepend" aria-label="Search"
                        @input="searchMusic($event.target.value)">
                </div>
            </form>
            <div v-if="searchedData.length > 0">
                <template v-for="(track, index) in searchedData">
                    <div class="row my-4" :key="index">
                        <div class="col d-flex align-items-center cursor-pointer" @click="setPlayingRightNow({ url: track.preview_url,
                        image: track.album.images[2].url, artist: track.name, track: track.artists[0].name, status: true,
                        favorite: false })">
                            <img :src="track.album.images[2].url" width="32" height="32" class="rounded mr-3">
                            <div class="w-100">
                                <small class="font-weight-bold align-top d-block">{{ track.artists[0].name }}</small>
                                <small class="align-baseline">{{ track.name }}</small>
                            </div>
                        </div>
                        <div class="ml-4">
                            <a class="align-baseline float-right cursor-pointer small" @click="addToDiscoverList({ url: track.preview_url,
                                image: track.album.images[2].url, artist: track.name, track: track.artists[0].name, status: true,
                                favorite: false, id: track.id })">add</a>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="col-4">
            <div v-if="$store.state.discoverList.length > 0">
                <template v-for="(item, index) in $store.state.discoverList">
                    <div class="row my-4" :key="index">
                        <div class="col d-flex align-items-center cursor-pointer" @click="setPlayingRightNow({ url: item.preview_url,
                        image: item.image, artist: item.name, track: item.track, status: true, favorite: false })">
                            <img :src="item.image" width="32" height="32" class="rounded mr-3">
                            <div class="w-100">
                                <small class="font-weight-bold align-top d-block">{{ item.artist }}</small>
                                <small class="align-baseline">{{ item.track }}</small>
                            </div>
                        </div>
                        <div class="ml-4">
                            <a class="align-baseline float-right cursor-pointer small" @click="removeFromDiscoverList(item.id)">remove</a>
                        </div>
                    </div>
                </template>
                <a class="btn btn-primary text-white" @click="showResult()">result</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        name: "seed",
        data() {
            return {
                searchedData: []
            }
        },
        methods: {
            ...mapActions([
                'setPlayingRightNow',
                'addToDiscoverList',
                'removeFromDiscoverList',
                'setDiscoveredMusics'
            ]),
            searchMusic(val) {
                if(val.length !== 0) {
                    this.$http.get('/search?q=' + encodeURI(val) + '&type=track,artist')
                        .then(data => this.searchedData = data.data.tracks.items)
                        .catch(error => this.searchedData = error)
                } else {
                    this.searchedData = []
                }
            },
            getIds() {
                let ids = ''
                for (const x of this.$store.state.discoverList) {
                    ids = ids + x.id + ','
                }
                return ids
            },
            showResult() {
                if (this.$store.state.discoverList.length > 0) {
                    this.$http.get('/recommendations?seed_tracks=' + this.getIds())
                    .then(data => {
                        this.setDiscoveredMusics(data.data.tracks)
                        this.$router.push('/discover/result')
                    })
                    .catch(error => this.setDiscoveredMusics(error))
                }
            }
        }
    }
</script>

<style scoped>
    .no-focus:focus {
        box-shadow: none;
        border-color: unset;
    }

    .icon.icon-search {
        height: 1rem;
        width: 1rem;
        -webkit-mask-image: url('../../assets/search.svg');
        mask-image: url('../../assets/search.svg');
        background-color: black;
    }
</style>