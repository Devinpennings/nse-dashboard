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
    height: 100%;
  }

  .mapboxgl-map{
    overflow: visible;
  }

  .mapboxgl-canvas {
    position: static !important;
    height: 100% !important;
  }

  .mapboxgl-map-wrapper{
    height: 100% !important;
  }

  .mapboxgl-canvas-container {
    height: 100% !important;
  }

  .mapboxgl-canvas:focus {
    outline: none;
  }

  .mapboxgl-ctrl-logo {
    width: 0 !important;
    height: 0 !important;
  }

  .center-container {
    height: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .fullwidth {
    width: 100%;
  }

</style>
