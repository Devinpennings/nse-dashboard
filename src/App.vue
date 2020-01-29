<template>
  <div id="app">
    <sui-grid class="fullHeight">

      <sui-grid-column id="main-top" v-if="showMenu" :width="3">
        <sui-grid-row class="title header">
          <div class="item">Nationale</div>
          <div class="item">Studenten</div>
          <div class="item">Enquete</div>

          <div id="search">
            <sui-input v-on:input="onSearchChanaged" v-model="searchQuery"  transparent class="fullwidth search" placeholder="Zoek naar onderwerp..." icon="search" icon-position="left"/>
            <div class="results">
              <sui-loader v-if="searching" class="centered loader" style="font-size: 18px" active inline />

              <span class="value" v-if="searchMessage">{{searchMessage}}</span>

              <h4 v-if="searchTopicsResult.length > 0">Onderwerpen</h4>
              <div class="topic" v-for="topic in searchTopicsResult" v-bind:key="topic.topicId" v-on:click="onTopicSelect(topic)">
                <div class="value">
                  <span class="value-span">{{topic.value}}</span>
                  <sui-icon class="next" name="angle right"/></div>
              </div>

              <h4 v-if="searchEntriesResult.length > 0">Opmerkingen</h4>
              <div v-if="searchEntriesResult.length > 0" class="entries" v-on:click="onEntrySelect(searchEntriesResult)">
                <div class="value">
                  <span class="value-span">{{searchEntriesResult.length}} resultaten</span>
                  <sui-icon class="next" name="angle right"/></div>
              </div>

            </div>
          </div>
        </sui-grid-row>

        <sui-grid-row class="information">
          <div class="title">
            Toelichting
          </div>

          <div class="information-content" v-if="informationExpanded">
            Welkom in de kwaliteitszorgtool! Hier is een overzicht te vinden van de kwalitatieve data van de NSE, welke bestaat uit alle open opmerkingen van studenten. Door de meest informatieve opmerkingen voor verschillende topics te visualiseren helpt deze tool met het verklaren van de kwantitatieve resultaten.
            <br/>
            <br/>
            Benieuwd hoe deze grafieken tot stand zijn gekomen? De data is geprepareerd en daarna met behulp van een algoritme ingedeeld in verschillende topics. Vervolgens zijn voor die topics de meest informatieve opmerkingen geïdentificeerd, om op een effectieve manier inzicht te krijgen in de extra informatie die deze bevatten.
          </div>
          <sui-image size="tiny" floated="right" src="/assets/logo.png"/>
        </sui-grid-row>

      </sui-grid-column>

      <sui-grid-column id="content" class="center-container" v-bind:class="{'menu-ignore': showMenu}" :width="showMenu ? 13 : 16">
        <router-view></router-view>
        <portal-target name="semantic-ui-vue"/>
      </sui-grid-column>

    </sui-grid>
  </div>
</template>

<script>

  import {mapActions, mapGetters, mapState} from "vuex";
  import {SEARCH_ENTRIES, SEARCH_TOPICS} from "./store/actions";

  export default {

    name: 'app',
    data() {
      return {
        searching: false,
        informationExpanded: true,
        searchQuery: "",
        searchTopicsResult: [],
        searchEntriesResult: [],
        searchMessage: undefined
      }
    },
    computed: {

      ...mapState('results', {
        selectedResult: state => state.selected
      }),

      ...mapState('disciplines', {
        selectedDisciplines: state => state.selected
      }),

      ...mapGetters('dashboard', {
        selectedYears: 'selectedYears'
      }),

      showMenu() {
        return this.$route.path !== '/';
      }
    },

    watch: {
      searchQuery() {
        if (this.searchQuery === "") {
          this.resetSearch()
        }
        else {
          this.searchTopicsResult = [];
          this.searchEntriesResult = [];
        }
      }
    },

    methods: {

      ...mapActions('topics', {
        searchTopics: SEARCH_TOPICS
      }),

      ...mapActions('entries', {
        searchEntries: SEARCH_ENTRIES
      }),

      resetSearch() {
        this.searchTopicsResult = [];
        this.searchEntriesResult = [];
        this.searching = false;
        this.searchQuery = "";
        this.searchMessage = false;
      },

      onTopicSelect(topic) {
        this.$router.push('/dashboard/topic/' + topic.topicId)
      },

      onEntrySelect() {
        this.$router.push({
          path: '/dashboard/entries',
          query: {
            query: this.searchQuery,
            years: this.selectedYears,
            disciplineIds: this.selectedDisciplines.map(d => d.disciplineId)
          }
        });
      },

      onSearchChanaged(value) {

        if (value.length === 0) this.resetSearch();

        if (value.length < 3) return;

        this.searching = true;
        this.searchMessage = undefined;

        if (this.searchTimer) clearTimeout(this.searchTimer);

        this.searchTimer = setTimeout(() => {

          const promiseTopics = this.searchTopics({
            searchQuery: value,
            result: this.selectedResult
          });

          const promiseEntries = this.searchEntries({
            searchQuery: value,
            years: this.selectedYears,
            disciplineIds: this.selectedDisciplines.map(d => d.disciplineId)
          });

          Promise.all([promiseEntries, promiseTopics]).then((values) => {
            this.searchEntriesResult = values[0];
            this.searchTopicsResult = values[1];
            this.searching = false;
            this.searchMessage = this.searchTopicsResult.length < 1 && this.searchEntriesResult.length < 1 ? 'Geen resultaten.' : undefined;
          }).catch(() => {
            this.searching = false;
            this.searchMessage = 'Er is een fout opgetreden.'
          })

        }, 1000)

      }

    },

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
    font-size: 18px;
    color: #585858;
    z-index: 100;
    min-height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0 !important;
    padding-top: 36px !important;
    position: fixed;
  }

  #main-top .header {
    /*background-color: #623264;*/
    /*color: white !important;*/
    margin: 0;
  }

  #main-top > * {
    padding: 0 14px !important;
  }

  #main-top #search  {
    padding: 0 !important;
    align-content: stretch;
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

  #navigation .active:hover {
    transform: scale(1.2) !important;
  }

  #navigation .item:hover {
    transform: scale(1.1);
  }

  #content {
    width: 100%;
  }

  .menu-ignore {
    margin-left: 360px !important;
  }

  .search {
    font-size: 14px !important;
    opacity: 100% !important;
  }

  .search:focus, .search>input:focus {
    /*color: white !important;*/
  }

  .search>input::placeholder {
    /*color: rgba(255, 255, 255, 0.6) !important;*/
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
    padding-bottom: 0 !important;
  }

  .information .title {
    font-size: 14px;
    font-weight: 800;
    margin: 6px 0;
  }

  .information-content {
    padding-bottom: 16px !important;
    border-bottom: #aeaeae 1px solid;
  }

  .information img {
    margin: 8px 0 16px 0 !important;
  }

  .loader {
    margin-top: 16px !important;
  }

  .results {
    margin-top: 16px;
  }

  .topic {
    padding: 2px 0;
  }

  .value:hover {
    color: #1a1a1a;
  }

  h4 {
    margin-bottom: 6px !important;
    margin-top: 12px !important;
    color: #663366;
  }

  .value-span {
    width: 310px !important;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }

  .next {
    display: inline-block;
    vertical-align: center;
    color: #663366;
    font-size: 14px;
  }

  .value {
    font-size: 14px;
  }

</style>
