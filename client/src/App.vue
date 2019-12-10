<template>
  <div id="app" class="bg-white container-fluid">
    <navbar></navbar>
    <div class="px-4">
      <router-view></router-view>
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
  .icon {
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    display: inline-block;
  }
</style>
