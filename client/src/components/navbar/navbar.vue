<template>
    <nav class="navbar navbar-expand navbar-light px-4">
        <ul class="navbar-nav mr-auto">
            <router-link class="nav-item" active-class="active" tag="li" v-bind:to="'/'" exact>
                <a class="nav-link font-weight-bold pl-0">Home</a>
            </router-link>
            <router-link class="nav-item" active-class="active" tag="li" v-bind:to="'/library'">
                <a class="nav-link font-weight-bold">Library</a>
            </router-link>
            <router-link class="nav-item" active-class="active" tag="li" v-bind:to="'/discover'">
                <a class="nav-link font-weight-bold">Discover</a>
            </router-link>
            <router-link class="nav-item" active-class="active" tag="li" v-bind:to="'/artist'">
                <a class="nav-link font-weight-bold">Artists</a>
            </router-link>
            <router-link class="nav-item" active-class="active" tag="li" v-bind:to="'/favorites'">
                <a class="nav-link font-weight-bold">Favorites</a>
            </router-link>
        </ul>
        <form class="form-inline my-4">
            <div class="input-group">
                <div class="input-group-prepend rounded-left bg-light d-flex justify-content-center align-items-center px-2">
                    <span class="icon icon-search input-group-text border-0 p-0" id="searchPrepend"></span>
                </div>
                <input type="search" class="form-control no-focus border-0 bg-light pl-0" placeholder="Search"
                       aria-describedby="searchPrepend" aria-label="Search">
            </div>
        </form>
    </nav>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>
    .no-focus:focus {
        box-shadow: none;
        border-color: unset;
    }

    .active a {
        color: #665bfe !important;
    }

    .icon.icon-search {
        height: 1rem;
        width: 1rem;
        -webkit-mask-image: url('../../assets/search.svg');
        mask-image: url('../../assets/search.svg');
        background-color: black;
    }
</style>
