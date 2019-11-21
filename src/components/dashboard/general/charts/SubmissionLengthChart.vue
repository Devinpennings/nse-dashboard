<script>

  import {Bar} from "vue-chartjs";

  export default {

    name: "SubmissionLengthChart",
    extends: Bar,
    props: {
      chartdata: {
        type: Object,
        default() {
          return {
            labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
            datasets: [
              {
                label: 'Gemiddelde opmerking lengte',
                data: [515, 421, 611, 711, 384, 458],
                backgroundColor: "#3d1f3e",

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