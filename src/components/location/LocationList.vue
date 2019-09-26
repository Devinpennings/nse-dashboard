<template>
  <div class="center-container">
    <sui-grid centered class="fullwidth">
      <sui-grid-row id="marker">
        <sui-icon name="map marker alternate" size="big"/>
      </sui-grid-row>
      <sui-grid-row id="title">
        <h2>Selecteer een locatie</h2>
      </sui-grid-row>
      <sui-grid-row>
        <ul>
          <li
            v-on:mouseenter="onHoverChange(undefined)"
            v-on:click="onSelectChange(undefined)"
            v-bind:class="{selected: selected === undefined}"
          >
            Alle locaties <sui-icon name="angle right" />
          </li>
        </ul>
      </sui-grid-row>
      <sui-divider horizontal id="divider">Of</sui-divider>
      <sui-grid-row>
        <ul
          v-on:mouseleave="onHoverChange(null)"
        >
          <li
            v-for="location in sortedLocations"
            v-bind:key="location.id"
            v-on:mouseenter="onHoverChange(location)"
            v-on:click="onSelectChange(location)"
            v-bind:class="{ selected: (selected && selected === location) || (hovered && hovered.length === 1 && hovered.includes(location)) }"
          >
            {{ location.name }} <sui-icon name="angle right" />
          </li>
        </ul>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
  export default {

    name: "LocationList",
    props: ['locations', 'hovered'],
    events: ['hoverChange', 'selectChange'],

    data() {
      return {
        selected: null,
      }
    },

    methods: {

      onHoverChange(location) {

        if (!location) {
          this.$emit('hoverChange', this.locations);
        } else {
          this.$emit('hoverChange', [location]);
        }
      },

      onSelectChange(location) {
        this.selected = location;
        this.$emit('selectChange', this.selected);
      },

    },

    computed: {
      sortedLocations() {
        return [...this.locations].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
    },

  }
</script>

<style scoped>

  ul {
    list-style-type: none;
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
  }

  li {
    padding: 10px 10px 10px 16px;
    cursor: default;
  }

  li:hover, li.selected {
    background: rgba(0, 0, 0, 0.06);
  }

  #marker {
    padding-bottom: 6px !important;
    color: #623264;
  }

  #divider {
    height: 100% !important;
    margin: 6px !important;
  }

  #title {
    margin-bottom: 16px;
  }

</style>