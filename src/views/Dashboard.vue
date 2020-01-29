<template>
  <div id="main">
    <sui-grid id="center">

        <sui-grid id="content" columns="equal" v-if="!loading">

          <DashboardPanel title="Meest besproken onderwerpen" description="Hier worden de meest besproken onderwerpen weergegeven." :width="10" :padded="false">
            <template v-slot:icon>
              <sui-icon style="color: #EF5B70" name="fire"/>
            </template>
            <TrendingTopicsList/>
          </DashboardPanel>

          <DashboardPanel title="Aantal inzendingen" description="Hier worden de hoeveelheid inzendingen op de open vraag weergegeven." :width=6>
            <template v-slot:icon>
              <sui-icon style="color: #4D8EEA" name="paper plane"/>
            </template>
            <SubmissionCountChartContainer/>
          </DashboardPanel>

          <DashboardPanel title="Trends" :width="16" description="Deze grafiek, die ook is gekoppeld aan de onderwerpmodellen, toont een trendlijn, de trendlijn laat zien hoe de top 5 onderwerpen in de loop der jaren veranderd in rangorder. Hiermee wordt getoond hoe onderwerpen door de jaren heen zijn verbeterd / verslechterd.">
            <template v-slot:icon>
              <sui-icon style="color: #59D6AF" name="chart line" />
            </template>
            <TrendChartContainer/>
          </DashboardPanel>

        </sui-grid>

    </sui-grid>
  </div>
</template>

<script>

  import DashboardPanel from "../components/dashboard/DashboardPanel";
  import TrendingTopicsList from "../components/dashboard/general/charts/TrendingTopicsList";
  import SubmissionCountChart from "../components/dashboard/general/charts/SubmissionCountChart";
  import TrendChart from "../components/dashboard/general/charts/TrendChart";
  import {mapActions, mapMutations} from "vuex";
  import {GET_SINGLE_RESULT, SET_SELECTED_RESULT} from "../store/actions";
  import SubmissionCountChartContainer from "../components/dashboard/general/charts/SubmissionCountChartContainer";
  import TrendChartContainer from "../components/dashboard/general/charts/TrendChartContainer";

  export default {

    name: "Dashboard",
    components: {
      TrendChartContainer,
        SubmissionCountChartContainer,
      TrendingTopicsList, SubmissionCountChart, DashboardPanel, TrendChart
    },

    data() {
      return {
        loading: false
      }
    },

    beforeMount() {
      this.loading = true;
      this.getResult(this.$route.query.result).then((result) => {
        this.setSelectedResult(result);
        this.loading = false;
      })
    },

    methods: {

      ...mapMutations('results', {
        setSelectedResult: SET_SELECTED_RESULT
      }),
      ...mapActions('results', {
        getResult: GET_SINGLE_RESULT
      }),
    },
  }

</script>

<style scoped>

  .grid {
   margin: 0;
  }

  #main {
    height: 100%;
    width: 100%;
    margin: 4vh 3vw!important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  #center {
    width: 100%;
  }

  #non-menu {
    width: auto;
  }

  .title {
    font-size: 28px;
    margin: 14px;
    height: 48px !important;
    font-family: 'Roboto', sans-serif;
    display: table-cell;
    vertical-align: bottom;
    padding: 0 !important;
    color: #ababab;
  }

  .tab {
    width: auto !important;
    padding: 8px !important;
  }

  .tab:hover {
    color: #7f7f7f;
  }

  .year:hover {
    color: #7f7f7f;
  }

  .active {
    color: #5b5b5b;
    border-bottom: 1px #414141;
  }

  .active:hover {
    color: #5b5b5b;
  }

  .right {
    float: right;
    padding-right: 0 !important;
    font-size: 18px;
  }

  .year-dropdown {
    -moz-appearance: none;
    appearance: none;
  }

  i {
    margin: 0 !important;
  }

  #content {
    width: 100%;
    padding: 0 !important;
    margin-top: 16px !important;
  }

  .intro {
    font-family: 'Roboto', sans-serif;
    color: #5b5b5b;
  }

</style>