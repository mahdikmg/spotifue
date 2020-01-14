<template>
    <div class="row flex-grow-1 justify-content-center align-content-center text-center px-4">
        <div class="col-7">
            <h2 class="spotifue-title">SPOTIFUE</h2>
        </div>
        <div class="col-7">
            Designed by <a href="https://www.linkedin.com/in/reza-daneshian/" target="blank">Reza Daneshian</a>
            Coded by <a href="https://www.linkedin.com/in/mahdikmg/" target="blank">Mehdi Ghasemi</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "about",

}
</script>

<style scoped>
    .col-7:first-of-type {
        margin-top: -56px;
    }

    .spotifue-title {
        font-size: 80px !important;
        font-weight: bold;
        text-shadow: -4px 0px 0px #41B883 !important;
        letter-spacing: 10px;
        color: #34495E !important;
    }

    a {
        color: teal;
    }

    a:hover {
        text-decoration: none !important;
        color: royalblue !important;
    }
</style>