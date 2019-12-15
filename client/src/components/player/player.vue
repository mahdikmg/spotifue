<template>
    <div class="row bg-purple px-5 py-2 player-radius position-fixed w-100 player d-flex align-items-center">
        <img class="rounded" :src="this.$store.state.playingRightNow.image" width="64" height="64">
        <div class="col-2 text-white">
            <small class="font-weight-bold align-top d-block">{{ this.$store.state.playingRightNow.track }}</small>
            <small class="align-baseline d-block">{{ this.$store.state.playingRightNow.artist }}</small>
        </div>
        <!--<audio class="col" :src="this.$store.state.playingRightNow.url" autoplay controls></audio>-->
        <div class="col">
            <div class="audio-player row align-items-center">
                <span class="icon icon-favorite"></span>
                <div class="col mx-5">
                    <div class="row justify-content-center align-content-center mb-2">
                        <span class="icon icon-play"></span>
                        <span class="icon icon-pause"></span>
                    </div>
                    <div class="row align-items-center">
                        <small class="text-white">2:05</small>
                        <div class="col">
                            <div class="progress">
                                <div class="progress-bar bg-white w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <small class="text-white">3:56</small>
                    </div>
                </div>
                <span class="icon icon-volume mr-2"></span>
                <input type="range" class="volume" min="0" max="100">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "player",
    }
</script>

<style scoped>
    .player {
        bottom: 0;
    }

    .bg-purple {
        background-color: #665cff;
    }

    .player-radius {
        border-radius: 15px 15px 0 0;
    }

    audio:focus {
        outline: none !important;
    }

    .progress {
        height: 2px;
        background-color: darkgrey;
    }

    /* edit input range for sound volume - cross browser compatible */
    input[type=range] {
        height: 2px;
        -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
        width: 100px; /* Specific width is required for Firefox. */
        background: transparent;
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-ms-track {
        width: 100px;
        cursor: pointer;
        /* Hides the slider so custom styles can be added */
        background: transparent;
        border-color: transparent;
        color: transparent;
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
