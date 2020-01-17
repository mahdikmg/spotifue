<template>
    <div class="row bg-light-blue radius py-3 px-4 mb-4">
        <h5 class="font-weight-bold w-100">New Releases in US</h5>
        <div class="col p-0 mt-4">
            <Flickity v-if="newReleases.length > 10" ref="flickity" :options="flickityOptions">
                <div class="carousel-cell mr-3 p-0 cursor-pointer " v-for="(album, index) in newReleases" :key="index"
                     @click="playRandomly(album.id, album.images[2].url)">
                    <img :src="album.images[1].url" width="100" height="100" class="rounded">
                    <div class="mt-2 info">
                        <small class="font-weight-bold align-top d-block">{{ album.artists[0].name }}</small>
                        <small class="align-baseline d-block text-wrap">{{ album.name }}</small>
                    </div>
                </div>
            </Flickity>
            <!--flickity has a bug and it does not show up if an element wont come after it.-->
            <div class="invisible">1</div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "newReleases",
        data() {
            return {
                newReleasesTest: [],
                newReleases: [],
                flickityOptions: {
                    freeScroll: true,
                    contain: true,
                    prevNextButtons: false,
                    pageDots: false,
                },
                albumsTracks: [],
            }
        },
        methods: {
            ...mapActions([
                'setPlayingRightNow'
            ]),
            playRandomly(albumId, imgUrl) {
                this.$http.get('/albums/' + albumId + '/tracks')
                    .then(data => {
                        this.albumsTracks = data.data.items
                        let max = this.albumsTracks.length
                        let randomNum = Math.floor(Math.random() * max)
                        let track = this.albumsTracks[randomNum]
                        this.setPlayingRightNow({
                                url: track.preview_url,
                                image: imgUrl, artist: track.name, track: track.artists[0].name, status: true,
                                favorite: false })
                    })
                    .catch(error => {
                        this.albumsTracks = error
                    })
            }
        },
        async created() {
            this.$http.get('/browse/new-releases?country=US&limit=50')
                .then(data => {
                    this.newReleases = data.data.albums.items
                    /*this.newReleasesTest.forEach(item => {
                        this.$http.get('/albums/' + item.id + '/tracks')
                            .then(data => {
                                let track = data.data.items[0].preview_url
                                if (track !== null) {
                                    this.newReleases.push(item)
                                }
                            })
                            .catch(error => this.newReleases = error)
                    })*/
                })
                .catch(error => this.newReleasesTest = error)
        },
        components: {
            Flickity: () => import('vue-flickity')
        },
    }
</script>

<style scoped>
    .bg-light-blue {
        background-color: #b8d7ff;
    }

    .info {
        width: 100px;
    }
</style>
