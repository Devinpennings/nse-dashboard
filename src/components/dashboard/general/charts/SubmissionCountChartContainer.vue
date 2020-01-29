<template>
  <div class="container">
    <submission-count-chart
            v-if="loaded"
            :chartdata="chartdata"
    />
  </div>
</template>

<script>

    import SubmissionCountChart from "./SubmissionCountChart";
    import {mapActions, mapGetters, mapState} from "vuex";
    import {GET_METADATA} from "../../../../store/actions";

    export default {
        name: 'SubmissionCountChartContainer',
        components: {SubmissionCountChart},
        computed: {
            ...mapGetters('dashboard', {
                selectedYears: 'selectedYears'
            }),
            ...mapState('disciplines', {
                selectedDisciplines: state => state.selected,
            }),
        },
        methods: {
            ...mapActions('metadata', {
                getMetaData: GET_METADATA
            }),

            setData() {

                if (!this.selectionSet || !this.completeSet) return;

                this.chartdata.datasets = [
                    this.selectionSet,
                    this.completeSet
                ];

                this.loaded = true;
            }
        },
        data: () => ({
            loaded: false,
            chartdata: null,
            colors: [
                "#EF5B70",
                "#4D8EEA",
                "#F6AC49",
                "#bc49f6"
            ]
        }),
        async mounted () {

            this.chartdata = {
                labels: this.selectedYears.map(y => y.toString()),
            };

            this.selectionSet = null;
            this.completeSet = null;

            this.getMetaData({
                years: this.selectedYears,
                disciplines: this.selectedDisciplines
            }).then((result) => {

                this.selectionSet = {
                    label: 'Aantal opmerkingen selectie',
                    backgroundColor: this.colors[0],
                    data: []
                };

                result.forEach(d => {
                    this.selectionSet.data[this.chartdata.labels.indexOf(d.year.toString())] = d.entryAmount;
                });

                this.setData();

            });

            this.getMetaData({
                years: this.selectedYears
            }).then((result) => {

                this.completeSet = {
                    label: 'Aantal opmerkingen totaal',
                    backgroundColor: this.colors[1],
                    data: []
                };

                result.forEach(d => {
                    this.completeSet.data[this.chartdata.labels.indexOf(d.year.toString())] = d.entryAmount;
                });

                this.setData();

            });
        }
    }
</script>