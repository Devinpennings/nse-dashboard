<template>
  <trend-chart
          v-if="loaded"
          :chartdata="chartdata"
    />
</template>

<script>
  import {mapActions, mapGetters, mapState} from "vuex";
  import {GET_TOPIC, GET_TRENDS} from "../../../../store/actions";
  import TrendChart from "./TrendChart";

  export default {
    name: "TrendChartContainer",
    components: {TrendChart},
    data() {
      return {
        chartdata: null,
        loaded: false,
        colors: [
          "#EF5B70",
          "#4D8EEA",
          "#F6AC49",
          "#bc49f6",
          "#59D6AF"
        ]
      }
    },
    computed: {
      ...mapState('results', {
        topics: state => state.selected.topics
      }),
      ...mapGetters('dashboard', {
        years: 'selectedYears'
      })
    },
    methods: {

      ...mapActions('trends', {
        getTrends: GET_TRENDS
      }),

      ...mapActions('topics', {
        getTopic: GET_TOPIC
      }),

      setData() {

        function groupBy(arr, prop, duplicateKey) {
          const map = new Map(Array.from(arr, obj => [obj[prop], []]));
          arr.forEach(obj => {
            const toAdd = map.get(obj[prop]);
            if (duplicateKey) {
              toAdd.filter(o => o[duplicateKey] === obj[duplicateKey]).length === 0 && toAdd.push(obj)
            } else {
              toAdd.push(obj);
            }
          });
          return Array.from(map.values());
        }

        this.getTrends({topicIds: this.topics.map(t => t.topicId)}).then((result) => {

          const byYear = groupBy(result, 'year', 'topicId')
          const ordered = byYear.map(y => {
            return y.sort((a, b) => b.occurrences - a.occurrences);
          });

          const topFive = ordered[0].slice(0,5);

          const byFive = ordered.map(y => {
            return y.filter(t => topFive.map(tf => tf.topicId).includes(t.topicId))
          });

          const withIndex = byFive.map(y => {
            return y.map(t => {
              t.rank = y.indexOf(t) + 1;
              return t;
            })
          });

          const perTopic = groupBy(withIndex.flat(), 'topicId').map(y => y.sort((a, b) => a.year - b.year));

          const sets = perTopic.map(ta => {
            let data = [];
            ta.forEach(e => {
              data[this.years.indexOf(e.year)] = e.rank;
            });

            return {
              label: this.topics.filter(t => t.topicId === ta[0].topicId)[0].value,
              data: data,
              lineTension: 0,
              fill: false,
              borderColor: this.colors[perTopic.indexOf(ta)],
              pointStyle: 'line'
            }

          });



          this.chartdata = {
            datasets: sets,
            labels: this.years
          };
          this.loaded = true;

        })

      }
    },
    async mounted() {
      this.setData();
    }
  }
</script>

<style scoped>

</style>