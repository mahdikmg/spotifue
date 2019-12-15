<template>
    <div id="app" class="bg-white container-fluid d-flex flex-column h-100">
        <navbar></navbar>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
    import navbar from "./components/navbar/navbar";
    import player from "./components/player/player";

    export default {
        name: 'app',
        components: {
            navbar,
            player
        },
    }
</script>

<style>
    :root, body {
        height: 100%;
    }

    html, body {
        min-width: 930px;
        max-width: 1360px;
        margin-right: auto;
        margin-left: auto;
    }

    .icon {
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
        display: inline-block;
    }

    h1, h2, h3, h4, h5, h6 {
        color: #000632;
    }

    .radius {
        border-radius: 15px;
    }
</style>
