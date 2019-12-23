<template>
    <div class="row bg-very-light-blue radius py-3 px-4 mb-4">
        <h5 class="font-weight-bold w-100">Featured Playlists</h5>
        <div class="col p-0 mt-4">
            <Flickity v-if="featuredPlaylists.length > 0" ref="flickity" :options="flickityOptions">
                <div class="carousel-cell mr-3 p-0 cursor-pointer " v-for="(playlist, index) in featuredPlaylists" :key="index"
                     @click="playRandomly(playlist.id)">
                    <img :src="playlist.images[0].url" width="100" height="100" class="rounded">
                    <div class="mt-2 info">
                        <small class="font-weight-bold align-top d-block">{{ playlist.name }}</small>
                        <small class="align-baseline d-block text-wrap">{{ playlist.owner.display_name }}</small>
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
        name: "featuredPlaylists",
        data() {
            return {
                featuredPlaylistsTest: [],
                featuredPlaylists: [],
                flickityOptions: {
                    freeScroll: true,
                    contain: true,
                    prevNextButtons: false,
                    pageDots: false,
                },
                playlistTracks: [],
            }
        },
        methods: {
            ...mapActions([
                'setPlayingRightNow'
            ]),
            playRandomly(playlistId) {
                this.$http.get('/playlists/' + playlistId + '/tracks')
                    .then(data => {
                        this.playlistTracks = data.data.items
                        let max = this.playlistTracks.length
                        let randomNum = Math.floor(Math.random() * max)
                        let track = this.playlistTracks[randomNum]
                        while (track.track.preview_url === null) {
                            randomNum = Math.floor(Math.random() * max)
                            track = this.playlistTracks[randomNum]
                        }
                        this.setPlayingRightNow({
                            url: track.track.preview_url,
                            image: track.track.album.images[1].url, artist: track.track.album.name,
                            track: track.track.artists[0].name, status: true,
                            favorite: false })
                    })
                    .catch(error => {
                        this.playlistTracks = error
                    })
            }
        },
        async created() {
            this.$http.get('/browse/featured-playlists?country=US&limit=50')
                .then(data => {
                    this.featuredPlaylists = data.data.playlists.items
                })
                .catch(error => this.featuredPlaylists = error)
        },
        components: {
            Flickity: () => import('vue-flickity')
        },
    }
</script>

<style scoped>
    .bg-very-light-blue {
        background-color: #d3fff0;
    }

    .info {
        width: 100px;
    }
</style>
