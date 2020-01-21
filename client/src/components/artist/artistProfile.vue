<template>
    <div class="row px-4 mb-2" v-if="artist.status === 200">
        <div class="col-7">
            <h2>{{ artist.data.name }}</h2>
            <p>Followers: {{ artist.data.followers.total }}</p>
            <p>genre:
                <ul>
                    <li v-for="(genre, index) in artist.data.genres" :key="index">
                        {{ genre }}
                    </li>
                </ul>
            </p>
        </div>
        <div class="col-5">
            <img :src="artist.data.images[0].url" class="img-fluid rounded">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'artistProfile',
    data() {
        return {
            artist: {}
        }
    },
    beforeRouteEnter(to, from, next) {
        axios.get('https://api.spotify.com/v1/artists/' + to.params.id)
             .then(data => {
                 next(vm => vm.artist = data)
             })
             .catch(error => {
                 next(vm => vm.artist = error)
             })
    }
}
</script>

<style scope>

</style>