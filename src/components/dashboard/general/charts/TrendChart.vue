<script>

  import {Line} from "vue-chartjs";

  export default {

    name: "TrendChart",
    extends: Line,
    props: {
      chartdata: {
        type: Object,
        default() {
          return {
            labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
            datasets: [
              {
                label: 'Vak, Kennis, Niveau, Onderwijs, Leren, Theorie, Inhoud, Vaardigheid, Engels',
                data: [1, 2, 2, 3, 2, 2],
                lineTension: 0,
                fill: false,
                borderColor: "#EF5B70",
                pointStyle: 'line'
              },
              {
                label: 'Werken, Ruimte, Waar, Zitten, Lokaal, Vaak, Werkplek, Groep, Studeren, Plek',
                data: [5, 4, 3, 4, 4, 5],
                lineTension: 0,
                fill: false,
                borderColor: "#4D8EEA",
                pointStyle: 'line'
              },
              {
                label: 'Stage, Minor, Lopen, School, Mogelijkheid, Contact, Gaan, Bijvoorbeeld, Zoeken, Buitenland',
                data: [2, 3, 1, 2, 1, 3],
                lineTension: 0,
                fill: false,
                borderColor: "#59D6AF",
                pointStyle: 'line'
              },
              {
                label: 'Docent, Feedback, Geven, Kwaliteit, Groot, Beoordeling, Goed, Beoordelen, Verschil, Manier',
                data: [3, 5, 4, 1, 3, 1],
                lineTension: 0,
                fill: false,
                borderColor: "#F6AC49",
                pointStyle: 'line'
              },
              {
                label: 'Toets, Periode, Tentamen, Tentamens, Vraag, Halen, Toetsing, Moment, Leren, Maken',
                data: [4, 1, 5, 5, 5, 4],
                lineTension: 0,
                fill: false,
                borderColor: "#bc49f6",
                pointStyle: 'line'
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