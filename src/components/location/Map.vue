<template>
  <div>
    <MglMap
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :interactive="false"
      :zoom="6"
      :center="[5.997113, 52.130043]"
      style="height: 500px; width: 100%;"
    >

      <MglMarker
        v-for="institute in institutes"
        v-bind:key="institute.id"
        :coordinates="[institute.longt, institute.latt]"
      >
        <div slot="marker">
          <div style="width: 8px; height: 8px; background: #623264; border-radius: 100px"></div>
          {{institute.name}}
        </div>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
  import Mapbox from "mapbox-gl";
  import {MglMap, MglMarker} from "vue-mapbox";

  export default {

    components: {
      MglMap,
      MglMarker
    },

    props: ['institutes'],

    data() {
      return {
        accessToken: "pk.eyJ1IjoiZGV2aW5wZW5uaW5ncyIsImEiOiJjazB3Z2s0cXkxNXByM2hwY2NrMmEwZ3hrIn0.IjhXCXouacXs_T4Ec0VZhA",
        mapStyle: "mapbox://styles/devinpennings/ck0z2bjrv04oh1cnq70talkbt",
      };
    },

    created() {
      this.mapbox = Mapbox;
    }

  };
</script>