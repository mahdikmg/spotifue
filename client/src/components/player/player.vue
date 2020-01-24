<template>
    <div class="row bg-purple px-5 py-2 player-radius position-sticky player align-items-center" v-show="playingRightNow.url">
        <img class="rounded border-0" :src="playingRightNow.image" width="64" height="64">
        <div class="col-2 text-white">
            <small class="font-weight-bold align-top d-block">{{ playingRightNow.track }}</small>
            <small class="align-baseline d-block">{{ playingRightNow.artist }}</small>
        </div>
        <div class="col">
            <div class="audio-player row align-items-center">
                <span class="icon icon-favorite cursor-pointer" @click="removeFavorite(playingRightNow.url)"
                      v-if="playingRightNow.favorite"></span>
                <span class="icon icon-unFavorite cursor-pointer" @click="setFavorite" v-else></span>
                <div class="col mx-5">
                    <div class="row justify-content-center align-content-center mb-2">
                        <span class="icon icon-pause cursor-pointer" @click="paused" v-if="playingRightNow.status"></span>
                        <span class="icon icon-play cursor-pointer" @click="played" v-else></span>
                        <audio class="d-none" id="player" :src="playingRightNow.url" @timeupdate="timeUpdate"
                               @ended="paused" autoplay></audio>
                    </div>
                    <div class="row align-items-center">
                        <small class="text-white">{{ musicProgress | timeFilter }}</small>
                        <div class="col d-flex align-items-center">
                            <input type="range" class="w-100 music-progress" min="0" max="30" v-model="musicProgress"
                            @change="changeMusicTime">
                        </div>
                        <small class="text-white">0:30</small>
                    </div>
                </div>
                <span class="icon icon-volume mr-2"></span>
                <input type="range" class="volume" min="0" max="100" @click="volumeChanged" v-model="volumer">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "player",
        data() {
            return {
                musicProgress: 0,
                volumer: 50,
            }
        },
        computed: {
            ...mapState([
                'playingRightNow',
                'favorites'
            ])
        },
        methods: {
            ...mapActions([
                'setFavorites',
                'addFavorites',
                'removeFavorites'
            ]),
            played() {
                document.getElementById('player').play()
                this.playingRightNow.status = true
            },
            paused() {
                document.getElementById('player').pause()
                this.playingRightNow.status = false
            },
            timeUpdate() {
                this.musicProgress = document.getElementById('player').currentTime
            },
            changeMusicTime() {
                document.getElementById('player').currentTime = this.musicProgress
            },
            volumeChanged() {
                document.getElementById('player').volume = this.volumer / 100
            },
            setFavorite() {
                this.playingRightNow.favorite = true
                this.addFavorites(this.playingRightNow)
                this.saveFavorites()
            },
            removeFavorite(item) {
                this.playingRightNow.favorite = false
                this.removeFavorites(item)
                this.saveFavorites()
            },
            saveFavorites() {
                const parsed = JSON.stringify(this.favorites)
                localStorage.setItem('favorites', parsed)
            },
            checkFavorite() {
                for (let i=0; i < this.favorites.length; i++) {
                    if (this.favorites[i].url === this.playingRightNow.url) {
                        return true
                    }
                }
                return false
            }
        },
        filters: {
            timeFilter(sec) {
                if (sec < 10) {
                    return '0:0' + Math.floor(sec)
                } else {
                    return '0:' + Math.floor(sec)
                }
            }
        },
        created() {
            this.$store.watch(
                (state) => state.playingRightNow,
                () => {
                    this.playingRightNow.favorite = this.checkFavorite()
                }
            );
        },
        mounted() {
            document.getElementById('player').volume = 0.5
            if(localStorage.getItem('favorites')) {
                try {
                    this.setFavorites(JSON.parse(localStorage.getItem('favorites')))
                } catch (e) {
                    localStorage.removeItem('favorites')
                }
            }
        }
    }
</script>

<style scoped>
    .player {
        bottom: 0;
        margin-top: auto;
        display: flex;
    }

    .bg-purple {
        background-color: #665cff;
    }

    .player-radius {
        border-radius: 15px 15px 0 0;
    }

    /* edit input range for sound volume - cross browser compatible */
    input[type=range] {
        height: 2px;
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        background: transparent;
    }
    input[type=range].volume {
        width: 100px; /* Specific width is required for Firefox. */
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-ms-track {
        cursor: pointer;
        /* Hides the slider so custom styles can be added */
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range].volume::-ms-track {
        width: 100px;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }
    /* for Firefox */
    input[type=range]::-moz-range-thumb {
        -moz-appearance: none;
    }
    /* for IE */
    input[type=range]::-ms-thumb {
        width: 0px;
        height: 0px;
    }

    /* two background color range */
    input[type='range'] {
        overflow: hidden;
        -webkit-appearance: none;
        background-color: darkgrey;
    }

    input[type='range']::-webkit-slider-thumb {
        width: 0px;
        -webkit-appearance: none;
        height: 0px;
        cursor: pointer;
        box-shadow: -80px 0 0 80px white;
    }
    input[type='range'].music-progress::-webkit-slider-thumb {
        box-shadow: -500px 0 0 500px white;
    }

    input[type="range"]::-moz-range-progress {
        background-color: white;
    }
    input[type="range"]::-moz-range-track {
        background-color: darkgrey;
    }
    /* IE*/
    input[type="range"]::-ms-fill-lower {
        background-color: white;
    }
    input[type="range"]::-ms-fill-upper {
        background-color: darkgrey;
    }

    input[type=range]:hover {
        cursor: pointer;
    }

    .icon.icon-unFavorite {
        height: 1.2rem;
        width: 1.3rem;
        -webkit-mask-image: url('../../assets/unFavorite.svg');
        mask-image: url('../../assets/unFavorite.svg');
        background-color: white;
    }

    .icon.icon-favorite {
        height: 1.2rem;
        width: 1.3rem;
        -webkit-mask-image: url('../../assets/favorite.svg');
        mask-image: url('../../assets/favorite.svg');
        background-color: white;
    }

    .icon.icon-play {
        height: 1rem;
        width: 1rem;
        -webkit-mask-image: url('../../assets/play.svg');
        mask-image: url('../../assets/play.svg');
        background-color: white;
    }

    .icon.icon-pause {
        height: 1rem;
        width: 1rem;
        -webkit-mask-image: url('../../assets/pause.svg');
        mask-image: url('../../assets/pause.svg');
        background-color: white;
    }

    .icon.icon-volume {
        height: .9rem;
        width: .9rem;
        -webkit-mask-image: url('../../assets/volume.svg');
        mask-image: url('../../assets/volume.svg');
        background-color: white;
    }
</style>
