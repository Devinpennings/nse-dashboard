<script>

  import {HorizontalBar} from "vue-chartjs";

  export default {

    name: "SubmissionCountChart",
    extends: HorizontalBar,
    props: {
      chartdata: {
        type: Object,
        default() {
          return {
            labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
            datasets: [
              {
                label: 'Hoeveelheid opmerkingen',
                data: [124, 182, 89, 224, 184, 158],
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