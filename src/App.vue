<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  name: 'app',
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .mapboxgl-map{
    overflow: visible;
  }

  .mapboxgl-canvas {
    position: static !important;
  }

  .mapboxgl-canvas:focus {
    outline: none;
  }

  .mapboxgl-ctrl-logo {
    width: 0 !important;
    height: 0 !important;
  }

</style>
