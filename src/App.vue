<template>
  <div id="app">
    <sui-grid class="fullHeight">

      <sui-grid-column id="main-top" v-if="showMenu" :width="3">
        <sui-grid-row class="title">
          <div class="item">Nationale</div>
          <div class="item">Studenten</div>
          <div class="item">Enquete</div>
          <sui-input transparent class="fullwidth search" placeholder="Zoek naar onderwerp..." icon="search" icon-position="left"/>
        </sui-grid-row>

        <sui-grid-row id="navigation">
          <div class="item active">
            Algemeen
          </div>
          <div class="item">
            Onderwerpen
          </div>
          <div class="item">
            Thema's
          </div>
        </sui-grid-row>

        <div class="information">
          <div class="title">
            Toelichting
          </div>
          Welkom in de kwaliteitszorgtool! Hier is een overzicht te vinden van de kwalitatieve data van de NSE, welke bestaat uit alle open opmerkingen van studenten. Door de meest informatieve opmerkingen voor verschillende topics te visualiseren helpt deze tool met het verklaren van de kwantitatieve resultaten.
          <br/>
          <br/>
          Benieuwd hoe deze grafieken tot stand zijn gekomen? De data is geprepareerd en daarna met behulp van een algoritme ingedeeld in verschillende topics. Vervolgens zijn voor die topics de meest informatieve opmerkingen geïdentificeerd, om op een effectieve manier inzicht te krijgen in de extra informatie die deze bevatten.
        </div>
      </sui-grid-column>

      <sui-grid-column id="content" class="center-container" :width="showMenu ? 13 : 16">
        <router-view></router-view>
        <portal-target name="semantic-ui-vue"/>
      </sui-grid-column>

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
    height: 100% !important;
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

  .fullHeight {
    height: 100%;
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
    z-index: 100;
    min-height: 100%;
    padding: 24px !important;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  #main-top img {
    display: block;
    max-width: 120px;
  }

  #navigation {
    font-family: 'Roboto', sans-serif;
    font-weight: lighter;
    font-size: 32px;
  }

  #navigation .item {
    margin: 20px 0;
    transition: .2s ease-in-out;
    transform-origin: left center;

  }

  #navigation .active {
    font-weight: 400;
    transform: scale(1.1) !important;
  }

  #navigation .item:hover {
    transform: scale(1.1);
  }

  #content {
    width: 100%;
  }

  .search {
    font-size: 14px !important;
  }

  ::-webkit-scrollbar {
    display: none !important;
  }
  ::-webkit-scrollbar {
    width: 14px !important;
    height: 18px;
  }
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgb(255, 255, 255);
    background-clip: padding-box;
    -webkit-border-radius: 4px !important;
    background-color: rgba(79, 54, 79, 0.56) !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(79, 57, 77, 0.71) !important;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  .title {
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    font-size: 46px;
    height: auto;
    margin-bottom: 32px;
    margin-top: 32px;
  }

  .title .item {
    margin-bottom: 32px;
  }

  .bolder {
    font-weight: normal;
    display: inline;
  }

  .information {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 300;
  }

  .information .title {
    font-size: 14px;
    font-weight: 800;
    margin: 6px 0;
  }

</style>
