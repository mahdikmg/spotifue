<template>
    <div class="row px-4 mb-2" v-if="artist.status === 200">
        <div class="col-7">
            <div class="row">
                <div class="col-12 bg-caribbean text-light py-3 px-4 rounded mb-3">
                    <h2 class="text-light">{{ artist.data.name }}</h2>
                    <div class="row my-3">
                        <div class="col-5 d-flex align-items-center justify-content-center">
                            <span class="h3 m-0">{{artist.data.followers.total | seperator}}</span>
                        </div>
                        <div class="col-7 d-flex align-items-center justify-content-center">
                            <ul class="m-0 p-0">
                                <li v-for="(genre, index) in artist.data.genres" :key="index">
                                    {{ genre }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row text-center">
                        <div class="col-5">
                            <span class="mb-0">Followers</span>
                        </div>
                        <div class="col-7">
                            <span>Genres</span>
                        </div>
                    </div>
                </div>
                <div class="col-12 bg-regal px-4 py-3 rounded">
                    <div class="row mb-4" v-if="albums.status === 200 && showMoreStatus">
                        <div class="col-12">
                            <h3 class="text-light">Latest Albums</h3>
                        </div>
                        <div class="col-12">
                            <Flickity v-if="albums.data.items.length > 1" ref="flickity" :options="flickityOptions">
                                <div class="carousel-cell mr-3 p-0" v-for="(album, index) in albums.data.items" :key="index">
                                    <img :src="album.images[1].url" width="100" height="100" class="rounded">
                                    <div class="mt-2 info text-light">
                                        <small class="font-weight-bold align-top d-block text-wrap">{{ album.name }}</small>
                                        <small class="align-middle d-block">{{ album.release_date }}</small>
                                        <small class="align-baseline d-block">{{ album.total_tracks }} tracks</small>
                                    </div>
                                </div>
                            </Flickity>
                        </div>
                    </div>
                    <div class="row" v-if="topTracks.status === 200 && showMoreStatus">
                        <div class="col-12">
                            <h3 class="text-light">Top tracks</h3>
                        </div>
                        <div class="col-12 d-flex align-items-center rounded px-3 cursor-pointer mb-3"
                        v-for="(item, index) in topTracks.data.tracks" :key="index" @click="setPlayingRightNow({ url: item.preview_url,
                        image: item.album.images[2].url, artist: item.name, track: item.album.artists[0].name, status: true,
                         favorite: false })">
                            <img class="rounded border-0 mr-3" :src="item.album.images[2].url" width="64" height="64">
                            <div class="text-light">
                                <small class="font-weight-bold align-top d-block">{{item.name}}</small>
                            </div>
                        </div>
                    </div>
                    <a class="title-line d-flex flex-row text-light cursor-pointer" v-if="!showMoreStatus" @click="showMore">show more</a>
                </div>
            </div>
        </div>
        <div class="col-5 profile-img align-self-start">
            <img :src="artist.data.images[0].url" class="img-fluid rounded position-relative">
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'artistProfile',
    data() {
        return {
            artist: {},
            topTracks: {},
            albums: {},
            flickityOptions: {
                freeScroll: true,
                contain: true,
                prevNextButtons: false,
                pageDots: false,
            },
            showMoreStatus: false
        }
    },
    methods: {
        ...mapActions([
            'setPlayingRightNow'
        ]),
        getArtist(id) {
            this.$http.get('/artists/' + id)
                .then(data => this.artist = data )
                .catch(error => this.artist = error )
        },
        showMore() {
            this.topTracks = {}
            this.albums = {}

            this.$http.get('/artists/' + this.$route.params.id + '/top-tracks?country=US')
                .then(data => this.topTracks = data)
                .catch(error => this.topTracks = error)
            
            this.$http.get('/artists/' + this.$route.params.id + '/albums?include_groups=album')
                .then(data => this.albums = data)
                .catch(error => this.albums = error)

            this.showMoreStatus = true
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getArtist(to.params.id)
            vm.showMoreStatus = false
        })
    },
    filters: {
        seperator(num) {
            let letter = ''
            let number = num.toString().split('')
            switch (true) {
                case number.length >= 5 && number.length <= 6 :
                    number.splice(-2,2)
                    letter = 'K'
                    break
                case number.length >= 7 :
                    number.splice(-5,5)
                    letter = 'M'
                    break
                default:
                    letter = ''
            }
            if (number[number.length - 1] != 0 ) {
                let lastNum = '.' + number[number.length - 1]
                number[number.length - 1] = lastNum
            } else {
                number.pop()
            }
            return (number.join('') + letter)
        }
    },
    components: {
        Flickity: () => import('vue-flickity')
    },
}
</script>

<style scoped>
    .profile-img::before {
        content: "";
        background: #34495E;
        position: absolute;
        right: 0px;
        top: -1rem;
        width: 90%;
        height: 100%;
        border-radius: .25rem;
    }

    .bg-caribbean {
        background-color: #1E646E;
    }

    .bg-regal {
        background-color: #004E6D;
    }

    .title-line:after, .title-line:before {
        content: "";
        flex: 1 1;
        border-bottom: 1px solid lightblue;
        margin: auto;
    }

    .info {
        width: 100px;
    }

    ul li {
        display: inline
    }

    ul li:not(:last-of-type)::after {
        content: "-"
    }
</style>