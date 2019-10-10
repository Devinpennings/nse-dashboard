<template>
  <div id="main">
    <sui-grid id="center">

      <sui-grid-row id="title">
        <div class="filter">
          Fontys Hogescholen Psychologie
        </div>
        van
        <div class="filter">
          2012
        </div>
        tot
        <div class="filter">
          2014
        </div>
      </sui-grid-row>

      
      <sui-grid id="content" columns="equal">

          <DashboardPanel title="Opmerkingen" :width="8">
            <SubmissionLengthChart></SubmissionLengthChart>
          </DashboardPanel>
          <DashboardPanel title="Opmerkingen" :width="8">

          </DashboardPanel>
          <DashboardPanel title="Opmerkingen" :width="4"></DashboardPanel>
          <DashboardPanel title="Opmerkingen" :width="4"></DashboardPanel>
          <DashboardPanel title="Opmerkingen" :width="8"></DashboardPanel>

      </sui-grid>
    </sui-grid>

  </div>
</template>

<script>

  import {FETCH_TOPIC_RESULTS} from "../store/actions";
  import {mapActions} from "vuex";
  import DashboardPanel from "../components/dashboard/DashboardPanel";
  import SubmissionLengthChart from "../components/dashboard/general/charts/SubmissionLengthChart";

  export default {

    name: "Dashboard",
    components: {SubmissionLengthChart, DashboardPanel},
    data() {
      return {
        loading: false,
        topicResults: []
      }
    },

    methods: {
      ...mapActions('topicResults', {
        getTopics: FETCH_TOPIC_RESULTS,
      }),
    },

    beforeMount() {

      this.getTopics()
        .then((result) => {
          setTimeout(() => {
            this.topicResults = result;
            this.loading = false;
          }, 1000)
        });

    },

  }

</script>

<style scoped>

  .grid {
   margin: 0;
  }

  #main {
    height: 100%;
    margin: 4vh 3vw!important;
  }

  #title {
    color: #a0a0a0;
    font-size: 32px;
    margin-bottom: 8px;
  }

    #title .filter {
      color: #868686;
      margin: 0 9px;
    }

    #title .filter:hover {
      color: #434343;
    }

  #content {
    width: 100%;
    padding: 0 !important;
  }

</style>