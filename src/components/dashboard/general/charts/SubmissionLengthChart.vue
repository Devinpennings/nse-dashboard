<script>
  import {Line} from "vue-chartjs";

  export default {

    name: "SubmissionLengthChart",
    extends: Line,
    props: {
      chartdata: {
        type: Object,
        default() {
          return null
        }
      },
      options: {
        type: Object,
        default() {
          return {
            maintainAspectRatio: false,
            responsive: true
          }
        }
      }
    },
    mounted () {
      this.renderChart([], this.options)
    }

  }
</script>

<style scoped>

</style>