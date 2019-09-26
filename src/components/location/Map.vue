<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :interactive="false"
    :zoom="6.4"
    :center="[5.277113, 52.130043]"
  >

    <MglMarker
      v-for="location in locations"
      v-bind:key="location.name"
      :coordinates="[location.longt, location.latt]"
      v-on:mouseenter="onHoverChange(location)"
      v-on:mouseleave="onHoverChange(null)"
      v-on:click="onSelectChange(location)"
    >
      <div slot="marker">
        <div style="width: 8px; height: 8px; background: rgba(98,50,100,0.64); border-radius: 100px"></div>
      </div>
    </MglMarker>
  </MglMap>
</template>

<script>
  import Mapbox from "mapbox-gl";
  import {MglMap, MglMarker} from "vue-mapbox";

  export default {

    components: {
      MglMap,
      MglMarker
    },

    props: ['locations'],

    events: ['hoverChange', 'selectChange'],

    data() {
      return {
        accessToken: "pk.eyJ1IjoiZGV2aW5wZW5uaW5ncyIsImEiOiJjazB3Z2s0cXkxNXByM2hwY2NrMmEwZ3hrIn0.IjhXCXouacXs_T4Ec0VZhA",
        mapStyle: "mapbox://styles/devinpennings/ck0z2bjrv04oh1cnq70talkbt",
      };
    },

    methods: {

      onHoverChange(location) {

        if (!location) {
          this.$emit('hoverChange', undefined);
        } else {
          this.$emit('hoverChange', [location]);
        }
      },

      onSelectChange(location) {
        this.selected = location;
        this.$emit('selectChange', this.selected);
      },

    },

    created() {
      this.mapbox = Mapbox;
    }

  };
</script>