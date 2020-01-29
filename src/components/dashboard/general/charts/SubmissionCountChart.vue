<script>

  import {Bar} from "vue-chartjs";

  export default {

    name: "SubmissionCountChart",
    extends: Bar,
    props: {
      chartdata: {
        type: Object,
        default: null
    },
    options: {
      type: Object,
      default() {
        return {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                suggestedMin: 0,
                display: false
              },
              gridLines: {
                display: false,
              },
            }],
            xAxes: [{
              gridLines: {
                display: false,
              },
            }]
          },
          plugins: {
            datalabels: {
              display: true,
              anchor: 'end',
              align: 'top',
              offset: 0
            }
          }
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }

}
</script>

<style scoped>

</style>