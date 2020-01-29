<script>

  import {Line} from "vue-chartjs";

  export default {

    name: "TrendChart",
    extends: Line,
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
            plugins: {
              datalabels: {
                display: false
              }
            },
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true
              }
            },
            scales: {
              yAxes: [{
                gridLines: {
                  display:false
                },
                ticks: {
                  precision: 0,
                  reverse: true,
                }
              }],
            },
            tooltips: {
              callbacks: {
                title: function (tooltipItem, data) {
                  return data['datasets'][tooltipItem[0]['datasetIndex']]['data'][tooltipItem[0]['index']] + '. ' + data['datasets'][tooltipItem[0]['datasetIndex']]['label']
                },
                label: function(_tooltipItem, _data) {
                  return null
                }
              },
            }
          }
        }
      },
    },

    mounted () {
      this.renderChart(this.chartdata, this.options)
    }

  }
</script>

<style scoped>

</style>