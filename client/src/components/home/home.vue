<template>
    <div class="row px-4">
        <div class="col-3">
            <random-music-list></random-music-list>
        </div>
        <div class="col-9">
            <div class="container-fluid">
                <new-releases></new-releases>
                <featured-playlists></featured-playlists>
            </div>
        </div>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            Hi :D, some tracks have preview, you can listen by clicking on them.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
    import randomMusicList from "./randomMusicList/randomMusicList"
    import newReleases from "./newReleases/newReleases"
    import featuredPlaylists from "./featuredPlaylists/featuredPlaylists"
    import jquery from 'jquery'

    export default {
        name: "home",
        components: {
            randomMusicList,
            newReleases,
            featuredPlaylists
        },
        mounted() {
            let $ = jquery
            $('.alert').alert()
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

    .alert {
        position: fixed !important;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
    }
</style>
