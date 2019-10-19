<script>

  import {Doughnut} from "vue-chartjs";

  export default {

    name: "SubmissionLengthChart",
    extends: Doughnut,
    props: {
      chartdata: {
        type: Object,
        default() {
          return {
            labels: ['Docenten', 'Kantine', 'Tentamens', 'Huiswerk', 'Muziek', 'Overige'],
            datasets: [
              {
                data: [201, 155, 65, 24, 8, 6],
                backgroundColor: [
                  "#3d1f3e",
                  "#4e214f",
                  "#562857",
                  "#7c3f7e",
                  "#a856ab",
                  "#de71e2",
                ]
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
              position: "bottom"
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