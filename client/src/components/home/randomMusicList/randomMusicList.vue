<template>
    <div class="bg-light-pink h-100 w-100 rounded p-3 overflow-auto">
        <h5 class="font-weight-bold">Recommended</h5>
        <div>
            <ol class="p-0">
                <div class="container-fluid">
                    <template v-for="item in recommended">
                        <li class="row my-4" :key="item.index" v-if="item.preview_url !== null">
                            <div class="col-lg-3 col-md-4 d-flex align-items-center">
                                <img :src="item.album.images[2].url" width="32" height="32" class="rounded">
                            </div>
                            <div class="col p-0 line-height-1">
                                <small class="font-weight-bold align-top">{{ item.album.artists[0].name }}</small>
                                <br>
                                <small class="align-baseline">{{ item.name }}</small>
                            </div>
                        </li>
                    </template>
                </div>
            </ol>
        </div>
    </div>
</template>

<script>
    export default {
        name: "randomMusicList",
        data() {
            return {
                recommended: []
            }
        },
        methods: {

        },
        created() {
            this.$http.get('/recommendations?limit=50&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797' +
                'ordA&min_energy=0.4&min_popularity=50&market=US')
                .then(data => this.recommended = data.data.tracks)
                .catch(error => this.recommended = error)
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
        background-color: #ffcece;
        width: 5px;
    }

    .overflow-auto::-webkit-scrollbar-thumb {
        background-color: #1b1e21;
        border-radius: 2rem;
    }
</style>
