<template>
  <sui-grid
    class="main"
    centered
  >
    <sui-grid-column :width="12">
      <sui-grid class="content">
        <sui-grid-column v-if="loading" id="loader">
          <sui-loader active indeterminate centered inline>{{loadingMessage}}</sui-loader>
        </sui-grid-column>
        <sui-grid-row v-if="!loading">
          <sui-grid-column :width="9">
            <selectable-list
              :items="institutes"
              icon="building"
              title="Selecteer een instituut"
              display-field="name"
              key-field="instituteId"
              allow-search
              v-on:selectChange="onInstituteSelectedChange($event)"
            />
          </sui-grid-column>
          <sui-grid-column id="logo" :width="7" v-if="!selectedInstitute">
            <img src="../../public/assets/logo-inverted.png">
            <p>
              Nationale Studenten Enquete
            </p>
          </sui-grid-column>
          <sui-grid-column id="map" :width="7" v-if="false">
            <Map
              :locations="hoveredLocations"
              v-on:hoverChange="onLocationHoveredChanged"
              v-on:selectChange="onLocationSelectedChanged"
            />
          </sui-grid-column>
          <sui-grid-column id="disciplines" :width="7" v-if="disciplines && disciplines.length > 0">
            <discipline-list
              :items="disciplines"
              icon="graduation cap"
              title="Selecteer een opleiding"
              display-field="name"
              allow-multi-select
              allow-select-all
              disable-bottom
              key-field="disciplineId"
            />
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
    </sui-grid-column>

    <sui-grid-column :width="4">
      <selected-discipline-list
        class="content"
        :items="selectedDisciplines"
        title="Geselecteerde opleidingen"
        display-field="name"
        key-field="disciplineId"
        allow-submit
        :loading="submitting"
        v-on:submit="onSubmit"
      />
    </sui-grid-column>

    <sui-grid-row id="below" v-if="results.length > 0">
      <ResultsOverview class="content"/>
    </sui-grid-row>

  </sui-grid>
</template>

<script>
  import Map from "../components/location/Map";
  import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
  import {
    CREATE_RESULT_REQUEST,
    FETCH_INSTITUTES,
    GET_DISCIPLINE_BY_INSTITUTE,
    SET_SELECTED_INSTITUTES
  } from "../store/actions";
  import SelectableList from "../components/location/SelectableList";
  import SelectedDisciplineList from "../components/location/SelectedDisciplineList";
  import DisciplineList from "../components/location/DisciplineList";
  import ResultsOverview from "../components/location/ResultsOverview";

  export default {

    name: "Landing",
    components: {ResultsOverview, DisciplineList, SelectedDisciplineList, SelectableList, Map },

    computed: {
      ...mapState('disciplines', {
        selectedDisciplines: state => state.selected,
      }),

      ...mapGetters('dashboard', {
        selectedYears: 'selectedYears'
      }),

      ...mapState('results', {
        results: 'all'
      })
    },

    methods: {

      ...mapActions('institutes', {
        getInstitutes: FETCH_INSTITUTES
      }),

      ...mapActions('disciplines', {
        getDisciplinesByInstitute: GET_DISCIPLINE_BY_INSTITUTE
      }),

      ...mapMutations('dashboard', {
        setSelectedInstitutes: SET_SELECTED_INSTITUTES
      }),

      ...mapActions('results', {
        createResultRequest: CREATE_RESULT_REQUEST
      }),

      onLocationHoveredChanged(location) {
        if (!location) {
          this.hoveredLocations = this.locations
        } else {
          this.hoveredLocations = location
        }
      },

      onLocationSelectedChanged(location) {
        if (location.item === undefined) {
          this.selectedLocation = {
            institutes: this.locations.map((l) => l.institutes).flat()
          }
        } else {
          this.selectedLocation = location.item
        }

      },

      onInstituteSelectedChange(institute) {

        if (!institute.deselect) {
          this.selectedInstitute = institute.item;
          this.getDisciplinesByInstitute(institute.item).then((result) => {
            this.disciplines = result;
          })
        } else {
          this.selectedInstitute = undefined;
          this.disciplines = []
        }

      },

      onSubmit() {

        this.submitting = true;
        this.createResultRequest({
          type: 'TOPIC',
          years: this.selectedYears,
          disciplines: this.selectedDisciplines})
        .then(() => {
          this.submitting = false;
        }).catch(() => {
          this.submitting = false;
        });

      }

    },

    data() {
      return {
        institutes: [],
        locations: [],
        hoveredLocations: [],
        selectedInstitute: null,
        loading: false,
        submitting: false,
        loadingMessage: "Gegevens ophalen...",
        disciplines: [],
      }
    },

    beforeMount() {

      // this.getLocations()
      //   .then((result) => {
      //     setTimeout(() => {
      //       this.locations = result;
      //       this.hoveredLocations = result;
      //       this.loading = false;
      //     }, 1000)
      //   });

        this.getInstitutes()
          .then((result) => {
            setTimeout(() => {
              this.institutes = result;
              this.hoveredLocations = result;
              this.loading = false;
            }, 1000)
          })

    },

  }
</script>

<style scoped>

  .content {
    background: #ffffff;
    -webkit-box-shadow: 5px 7px 13px 0 rgba(181,181,181,1);
    -moz-box-shadow: 5px 7px 13px 0 rgba(181,181,181,1);
    box-shadow: 5px 7px 13px 0 rgba(181,181,181,1);
    border-radius: 6px;
    width: 1200px;
    height: 600px;
    padding: 0 !important;
    overflow: hidden;
  }

  .main {
    width: 100% !important;
    margin: 0 6vw !important;;
  }

  #loader {
    display: flex !important;
    align-items: center !important;
    color: rgba(0,0,0,0.74);
  }

  #logo {
    background: rgb(79, 54, 79);
    height: 100%;
    display: grid;
  }

  #logo img {
    height: 100px;
    image-rendering: smooth;
    margin: auto auto 0;
  }

  #logo p {
    margin: 8px auto auto;
    color: white;
    font-family: 'Raleway', sans-serif;
    font-size: 18px;
  }

  #map {
    background: rgba(98, 50, 100, 0.4);
  }

  .column {
    padding: 0 !important;
  }

  #institutes {
    box-shadow: inset 7px 0 9px -7px rgba(0,0,0,0.4);
  }

  .row {
    padding: 0!important;
  }

  #below {
    padding-top: 32px !important;
  }

</style>