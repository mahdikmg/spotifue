<template>
    <div class="row px-4">
        <div class="col-6">
            <h2 class="font-weight-bold">Artists</h2>
        </div>
        <div class="col-6">
            <form class="form-inline float-right">
                <div class="input-group">
                    <div class="input-group-prepend rounded-left bg-light d-flex justify-content-center align-items-center px-2">
                        <span class="icon icon-search input-group-text border-0 p-0" id="searchPrepend"></span>
                    </div>
                    <input type="search" class="form-control no-focus border-0 bg-light pl-0" placeholder="Search"
                        aria-describedby="searchPrepend" aria-label="Search"
                        @input="searchArtist($event.target.value)">
                </div>
            </form>
        </div>
        <div v-if="searchedData.length > 0" class="col-12">
                <div class="row px-2">
                <template v-for="(item, index) in searchedData">
                    <div class="col-2 px-2 my-2 object-cover" :key="index" v-if="item.images.length > 0 && item.genres.length > 0">
                        <div class="w-100 artist-profile rounded d-flex align-items-end justify-content-center"
                        :style="{'background-image':'url('+item.images[2].url+')'}">
                            <span class="text-white small font-weight-bold mb-1">{{item.name}}</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "artist",
        data() {
            return {
                searchedData: []
            }
        },
        methods: {
            searchArtist(val) {
                if(val.length !== 0) {
                    this.$http.get('/search?q=' + encodeURI(val) + '&type=artist')
                        .then(data => this.searchedData = data.data.artists.items)
                        .catch(error => this.searchedData = error)
                } else {
                    this.searchedData = []
                }
            },
        }
    }
</script>

<style scoped>
    .no-focus:focus {
        box-shadow: none;
        border-color: unset;
    }

    .icon.icon-search {
        height: 1rem;
        width: 1rem;
        -webkit-mask-image: url('../../assets/search.svg');
        mask-image: url('../../assets/search.svg');
        background-color: black;
    }

    .artist-profile {
        height: 160px;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
