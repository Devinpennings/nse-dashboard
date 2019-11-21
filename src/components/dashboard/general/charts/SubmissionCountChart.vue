<script>

  import {Bar} from "vue-chartjs";

  export default {

    name: "SubmissionCountChart",
    extends: Bar,
    props: {
      chartdata: {
        type: Object,
        default() {
          return {
            labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
            datasets: [
              {
                label: 'Hoeveelheid opmerkingen',
                data: [4422, 3213, 4589, 5624, 6284, 6421],
                backgroundColor: '#4D8EEA'
              },
            ],
          }
        }
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
                align: 'top'
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