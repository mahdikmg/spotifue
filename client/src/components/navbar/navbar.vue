<template>
    <nav class="navbar navbar-expand navbar-light px-4 my-4">
        <ul class="navbar-nav mr-auto">
            <router-link class="nav-item" active-class="active" tag="li" v-bind:to="'/'" exact>
                <a class="nav-link font-weight-bold pl-0">Home</a>
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
            <router-link class="nav-item" active-class="active" tag="li" v-bind:to="'/about'">
                <a class="nav-link font-weight-bold">About</a>
            </router-link>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>
    .active a {
        color: #665bfe !important;
    }
</style>
