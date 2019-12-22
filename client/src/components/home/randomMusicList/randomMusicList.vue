<template>
    <div class="bg-light-pink radius pt-3 pl-4 pr-2">
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="font-weight-bold d-inline-block mb-0">Recommended</h5>
            <span class="icon icon-refresh cursor-pointer mr-4" @click="makeNewList"></span>
        </div>
        <ol class="m-0 p-0 overflow-auto">
            <div class="container-fluid">
                <template v-for="item in recommended">
                    <li class="row my-4" :key="item.index" v-if="item.preview_url !== null">
                        <div class="col d-flex align-items-center pointer" @click="setPlayingRightNow({ url: item.preview_url,
                        image: item.album.images[2].url, artist: item.name, track: item.album.artists[0].name, status: true,
                         favorite: false })">
                            <img :src="item.album.images[2].url" width="32" height="32" class="rounded mr-3">
                            <div>
                                <small class="font-weight-bold align-top d-block">{{ item.album.artists[0].name }}</small>
                                <small class="align-baseline d-block">{{ item.name }}</small>
                            </div>
                        </div>
                    </li>
                </template>
            </div>
        </ol>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "randomMusicList",
        data() {
            return {
                recommended: []
            }
        },
        methods: {
            ...mapActions([
                'setPlayingRightNow'
            ]),
            makeNewList() {
                this.$http.get('/recommendations?limit=50&seed_genres=pop,alt-rock,' +
                    'ordA&min_energy=0.4&min_popularity=50&market=US')
                    .then(data => this.recommended = data.data.tracks)
                    .catch(error => this.recommended = error)
            }
        },
        created() {
            this.makeNewList()
        }
    }
</script>

<style scoped>
    .bg-light-pink {
        background-color: #ffcece;
    }

    ol {
        counter-reset: item;
        list-style-type: none;
    }

    li:before {
        content: counter(item, decimal-leading-zero) " ";
        counter-increment: item;
        font-size: small;
        align-self: center;
    }

    .line-height-1 {
        line-height: 1;
    }

    .overflow-auto::-webkit-scrollbar {
        background-color: white;
        width: 4px;
    }

    .overflow-auto::-webkit-scrollbar-thumb {
        background-color: #1b1e21;
        border-radius: 2rem;
    }

    .pointer {
        cursor: pointer;
    }
</style>
