<template>
  <div id="app">
    <sui-grid id="main">
      <sui-grid-row id="main-top" v-if="showMenu" vertical-align="middle">
        <sui-grid-column :width="6">
          Nationale Studenten Enquete
        </sui-grid-column>
        <sui-grid-column :width="8" text-align="right" floated="right">
          <sui-input placeholder="Zoek naar onderwerp..." icon="search"/>
        </sui-grid-column>
      </sui-grid-row>
<!--      <div id="return">-->
<!--        <sui-icon name="chevron left" v-on:click="onBackButtonClick()"/> ga terug-->
<!--      </div>-->
      <sui-grid-row id="content" class="center-container">
        <router-view></router-view>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
  export default {

    name: 'app',
    computed: {
      showMenu() {
        return this.$route.path !== '/';
      }
    },

    methods: {
      onBackButtonClick() {
        this.$router.push('/');
      }
    }

  }
</script>

<style>

  html, body {
    background: #f7f7f7;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    user-select: none !important;
    /*overflow: hidden;*/
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
    padding: 0 !important;
    margin: 0 !important;
  }

  #main {
    height: 100% !important;
  }

  .fullwidth {
    width: 100%;
  }

  .grid {
    margin: 0 !important;
  }

  #main-top {
    background-color: #ffffff;
    -webkit-box-shadow: 0 8px 6px -6px rgba(181,181,181,1);
    -moz-box-shadow: 0 8px 6px -6px rgba(181,181,181,1);
    box-shadow: 0 8px 6px -6px rgba(181,181,181,1);
    font-size: 18px;
    color: #585858;
    width: 100%;
  }

  #main-top::before, #main-top::after {
    content: "";
    width: 3vw;
  }

  #content {
    width: 100%;
    margin-top: 32px;
  }

  .ui.input {
    font-size: 14px !important;
  }

</style>
