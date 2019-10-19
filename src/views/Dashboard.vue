<template>
  <div id="main">
    <sui-grid id="center">

        <sui-grid-row class="title" vertical-align="middle">
          <sui-grid-column class="tab active">
            Algemeen
          </sui-grid-column>
          <sui-grid-column class="tab">
            Onderwerpen
          </sui-grid-column>
          <sui-grid-column class="tab">
            Sentiment
          </sui-grid-column>
          <sui-grid-column floated="right" text-align="right" :width="4">
            2013 - 2018 <sui-icon name="angle down"></sui-icon>
          </sui-grid-column>
        </sui-grid-row>

        <sui-grid id="content" columns="equal">

          <DashboardPanel title="Ontvangen" :width="8">
            <template v-slot:icon>
              <sui-icon name="paper plane"/>
            </template>
            <SubmissionCountChart></SubmissionCountChart>
          </DashboardPanel>
          <DashboardPanel title="Meest besproken" :width="8" :padded="false">
            <template v-slot:icon>
              <sui-icon name="fire"/>
            </template>
            <TrendingTopicsList></TrendingTopicsList>
          </DashboardPanel>
          <DashboardPanel title="Opmerkingen" :width="4" :padded="false">
            <template v-slot:icon>
              <sui-icon name="comment"/>
            </template>
            <SubmissionList></SubmissionList>
          </DashboardPanel>
          <DashboardPanel title="Opmerking lengte" :width="8">
            <template v-slot:icon>
              <sui-icon name="text width"/>
            </template>
            <SubmissionLengthChart></SubmissionLengthChart>
          </DashboardPanel>
          <DashboardPanel title="Onderwerp verspreiding" :width="4">
            <template v-slot:icon>
              <sui-icon name="chart pie"/>
            </template>
            <TopicDistributionChart></TopicDistributionChart>
          </DashboardPanel>

        </sui-grid>

    </sui-grid>

  </div>
</template>

<script>

  import {FETCH_TOPIC_RESULTS} from "../store/actions";
  import {mapActions} from "vuex";
  import DashboardPanel from "../components/dashboard/DashboardPanel";
  import TrendingTopicsList from "../components/dashboard/general/charts/TrendingTopicsList";
  import SubmissionCountChart from "../components/dashboard/general/charts/SubmissionCountChart";
  import SubmissionLengthChart from "../components/dashboard/general/charts/SubmissionLengthChart";
  import TopicDistributionChart from "../components/dashboard/general/charts/TopicDistributionChart";
  import SubmissionList from "../components/dashboard/general/charts/SubmissionList";

  export default {

    name: "Dashboard",
    components: {
      SubmissionList,
      TrendingTopicsList, SubmissionCountChart, DashboardPanel, SubmissionLengthChart, TopicDistributionChart},
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
    width: 100%;
    margin: 4vh 3vw!important;
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

  .tab:hover, .right:hover {
    color: #7f7f7f;
  }

  .active {
    color: #414141;
    border-bottom: 1px #414141;
  }

  .active:hover {
    color: #414141;
  }

  .right {
    float: right;
    padding-right: 0 !important;
    font-size: 18px;
  }

  i {
    margin: 0 !important;
  }

  #content {
    width: 100%;
    padding: 0 !important;
  }

</style>