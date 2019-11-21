<template>
  <div id="main">
    <sui-grid id="center">

<!--        <sui-grid-row class="title" vertical-align="middle">-->
<!--          <sui-grid-column class="tab active">-->
<!--            Algemeen-->
<!--          </sui-grid-column>-->
<!--          <sui-grid-column class="tab">-->
<!--            Onderwerpen-->
<!--          </sui-grid-column>-->
<!--          <sui-grid-column class="tab">-->
<!--            Sentiment-->
<!--          </sui-grid-column>-->
<!--          <sui-grid-column floated="right" text-align="right" :width="4">-->
<!--            <sui-dropdown-->
<!--              floating-->
<!--              :icon="null"-->
<!--              :options="availableYears"-->
<!--              v-model="startYear"-->
<!--              class="year"-->
<!--            />-->
<!--            - -->
<!--            <sui-dropdown-->
<!--              floating-->
<!--              :icon="null"-->
<!--              :options="availableYears"-->
<!--              v-model="endYear"-->
<!--              class="year"-->
<!--            />-->
<!--          </sui-grid-column>-->
<!--        </sui-grid-row>-->

        <sui-grid id="content" columns="equal">

          <DashboardPanel title="Meest besproken onderwerpen" description="Hier worden de meest besproken onderwerpen weergegeven." :width="10" :padded="false">
            <template v-slot:icon>
              <sui-icon style="color: #EF5B70" name="fire"/>
            </template>
            <TrendingTopicsList></TrendingTopicsList>
          </DashboardPanel>

          <DashboardPanel title="Aantal inzendingen" description="Hier worden de hoeveelheid inzendingen op de open vraag weergegeven." :width=6>
            <template v-slot:icon>
              <sui-icon style="color: #4D8EEA" name="paper plane"/>
            </template>
            <SubmissionCountChart></SubmissionCountChart>
          </DashboardPanel>

          <DashboardPanel title="Trends" :width="16">
            <template v-slot:icon>
              <sui-icon style="color: #59D6AF" name="chart line" />
            </template>
            <TrendChart></TrendChart>
          </DashboardPanel>

        </sui-grid>

    </sui-grid>

  </div>
</template>

<script>

  import {FETCH_TOPICS, SET_END_YEAR, SET_START_YEAR} from "../store/actions";
  import {mapActions, mapMutations} from "vuex";
  import DashboardPanel from "../components/dashboard/DashboardPanel";
  import TrendingTopicsList from "../components/dashboard/general/charts/TrendingTopicsList";
  import SubmissionCountChart from "../components/dashboard/general/charts/SubmissionCountChart";
  import TrendChart from "../components/dashboard/general/charts/TrendChart";

  export default {

    name: "Dashboard",
    components: {
      TrendingTopicsList, SubmissionCountChart, DashboardPanel, TrendChart
    },

    data() {
      return {
        loading: false,
        topicResults: [],
      }
    },

    computed: {

      startYear: {
        get() {
          return this.$store.state.dashboard.startYear;
        },
        set(newValue) {
          return this.setStartYear(newValue)
        }
      },
      endYear: {
        get() {
          return this.$store.state.dashboard.endYear;
        },
        set(newValue) {
          return this.setEndYear(newValue)
        }
      },
      availableYears() {
        return this.$store.state.dashboard.availableYears.map(this.yearToSelect)
      }

    },

    methods: {

      ...mapActions('topics', {
        getTopics: FETCH_TOPICS,
      }),

      ...mapMutations('dashboard', {
        setStartYear: SET_START_YEAR,
        setEndYear: SET_END_YEAR
      }),

      yearToSelect(year) {
        if (!year) return undefined;
        return { text: year.toString(), value: year}
      }

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