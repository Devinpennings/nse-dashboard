<template>
  <sui-grid
    class="center-container"
  >
      <sui-grid class="content">
        <sui-grid-column v-if="loading" id="loader">
          <sui-loader active indeterminate centered inline>{{loadingMessage}}</sui-loader>
        </sui-grid-column>
        <sui-grid-row v-if="!loading">
          <sui-grid-column :width="9">
            <LocationList
              :locations="locations"
              :hovered="hoveredLocations"
              v-on:hoverChange="onLocationHoveredChanged"
              v-on:selectChange="onLocationSelectedChanged"
            />
          </sui-grid-column>
          <sui-grid-column id="map" :width="7" v-if="!selectedLocation">
            <Map
              :locations="hoveredLocations"
              v-on:hoverChange="onLocationHoveredChanged"
              v-on:selectChange="onLocationSelectedChanged"
            />
          </sui-grid-column>
          <sui-grid-column id="institutes" :width="7" v-if="selectedLocation">
            <institute-list
              :institutes="selectedLocation.institutes"
              v-on:selectSubmit="onInstituteSelectedSubmitted"
            />
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
  </sui-grid>
</template>

<script>
  import Map from "../components/location/Map";
  import {mapActions} from "vuex";
  import {FETCH_LOCATIONS} from "../store/actions";
  import LocationList from "../components/location/LocationList";
  import InstituteList from "../components/location/InstituteList";

  export default {

    name: "Landing",

    components: { InstituteList, LocationList, Map },

    methods: {
      ...mapActions('locations', {
        getLocations: FETCH_LOCATIONS,
      }),

      onLocationHoveredChanged(location) {
        if (!location) {
          this.hoveredLocations = this.locations
        } else {
          this.hoveredLocations = location
        }
      },

      onLocationSelectedChanged(location) {
        if (location === undefined) {
          this.selectedLocation = {
            institutes: this.locations.map((l) => l.institutes).flat()
          }
        } else {
          this.selectedLocation = location
        }

      },

      onInstituteSelectedSubmitted(institutes) {

        this.loadingMessage = `Gegevens voor ${institutes.length > 1 ? 'de instituten' : institutes[0].title} aan het verzamelen...`;
        this.loading = true;
        this.$router.push('/dashboard');

      }

    },

    data() {
      return {
        locations: [],
        hoveredLocations: [],
        selectedLocation: null,
        loading: true,
        loadingMessage: "Gegevens ophalen..."
      }
    },

    beforeMount() {

      this.getLocations()
        .then((result) => {
          setTimeout(() => {
            this.locations = result;
            this.hoveredLocations = result;
            this.loading = false;
          }, 1000)
        });

    },

  }
</script>

<style scoped>

  .content {
    background: #ffffff;
    -webkit-box-shadow: 5px 7px 13px 0px rgba(181,181,181,1);
    -moz-box-shadow: 5px 7px 13px 0px rgba(181,181,181,1);
    box-shadow: 5px 7px 13px 0px rgba(181,181,181,1);
    border-radius: 6px;
    width: 1200px;
    height: 600px;
    padding: 0 !important;
    overflow: hidden;
  }

  #loader {
    display: flex !important;
    align-items: center !important;
    color: rgba(0,0,0,0.74);
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
    padding: 0 !important;
  }

</style>