<template>
    <div class="row px-4">
        <div class="col-3">
            <random-music-list></random-music-list>
        </div>
        <div class="col-9">
            <new-releases></new-releases>
        </div>
    </div>
</template>

<script>
    import randomMusicList from "./randomMusicList/randomMusicList"
    import newReleases from "./newReleases/newReleases";
    export default {
        name: "home",
        data() {
            return {

            }
        },
        components: {
            randomMusicList,
            newReleases
        }
    }
</script>

<style>
    .icon.icon-refresh {
        height: 1rem;
        width: 1rem;
        -webkit-mask-image: url('../../assets/refresh.svg');
        mask-image: url('../../assets/refresh.svg');
        background-color: black;
    }
</style>
