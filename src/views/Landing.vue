<template>
  <div>
    <sui-grid :columns="2">
      <sui-grid-column>
        <InstituteList :institutes="institutes"/>
      </sui-grid-column>
      <sui-grid-column>
        <Map :institutes="institutes"/>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
  import Map from "../components/location/Map";
  import InstituteList from "../components/location/InstituteList";
  import {mapActions} from "vuex";
  import {FETCH_INSTITUTES} from "../store/actions";

  export default {

    name: "Landing",

    components: { InstituteList, Map },

    methods: {
      ...mapActions('institutes', {
        getInstitutes: FETCH_INSTITUTES,
      })
    },

    data() {
      return {
        institutes: []
      }
    },

    beforeMount() {

      this.getInstitutes()
        .then((result) => {
          this.institutes = result
        });

    },

  }
</script>

<style scoped>

</style>