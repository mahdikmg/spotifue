<template>
    <div class="row px-4">
        <div class="col-3">
            <random-music-list></random-music-list>
        </div>
        <div class="col-9">

        </div>
    </div>
</template>

<script>
    import randomMusicList from "./randomMusicList/randomMusicList";
    export default {
        name: "home",
        data() {
            return {

            }
        },
        components: {
            randomMusicList,
        }
    }
</script>

<style scoped>

</style>
