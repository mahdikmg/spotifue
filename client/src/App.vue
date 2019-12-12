<template>
  <div id="app" class="bg-white container-fluid pb-4 d-flex flex-column vh-100">
    <navbar></navbar>
    <div class="row px-4 flex-grow-1 h-100">
      <div class="col-12 h-100">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from "./components/navbar/navbar";
export default {
  name: 'app',
  components: {navbar},
}
</script>

<style>
  :root, body {
    height: 100%;
  }

  html, body {
    min-width: 930px;
    width: auto !important;
  }

  .icon {
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    display: inline-block;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #000632;
  }
</style>
