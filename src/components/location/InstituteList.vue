<template>
  <div class="center-container" id="content">
    <sui-grid centered class="fullwidth">
      <sui-grid-row>
        <ul>
          <li id="search">
            <sui-input v-model="searchInput" v-on:input="onSearchChanged" style="width: 100%" placeholder="Zoeken..." icon="search" />
          </li>
          <li
            v-for="institute in filteredInstitutes"
            v-bind:key="institute.id"
            v-on:click="onSelectChange(institute)"
            v-bind:class="{ selected: selected && selected.id === institute.id }"
          >
            {{ institute.title }} <sui-icon v-if="selectedInstitutes.includes(institute)" style="color: #623264" name="check" />
          </li>
          <li id="empty" v-if="filteredInstitutes.length < 1">
            Er zijn geen instituten gevonden.
          </li>
        </ul>
      </sui-grid-row>
      <sui-grid-row id="bottom">
        {{ this.selectedInstitutes.length }} items geselecteerd.
        <sui-button v-bind:class="{ disabled: selectedInstitutes.length < 1 }" content="Bevestigen" size="small" icon="angle right" label-position="right" />
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
  export default {

    name: "InstituteList",
    props: ['institutes'],
    events: ['selectChange'],

    data() {
      return {
        selected: null,
        filteredInstitutes: [],
        searchInput: "",
        selectedInstitutes: []
      }
    },

    methods: {

      onSearchChanged() {
        setTimeout(() => {
          this.filteredInstitutes = [...this.institutes].filter((i) => i.title.toLowerCase().includes(this.searchInput.toLowerCase()));
        }, 200);
      },

      resetInstitutes() {
        this.filteredInstitutes = this.institutes;
        this.searchInput = "";
      },

      onSelectChange(institute) {

        if (this.selectedInstitutes.includes(institute)) {
          this.selectedInstitutes = this.selectedInstitutes.filter(item => item !== institute)
        } else {
          this.selectedInstitutes.push(institute)
        }

        // this.$emit('selectChange', institute);

      }

    },

    beforeMount() {
      this.resetInstitutes();
    },

    watch: {
      institutes() {
        this.resetInstitutes();
      }
    }

  }
</script>

<style scoped>

  #content {
    background: rgba(0, 0, 0, 0.03);
  }

  ul {
    list-style-type: none;
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
  }

  li {
    padding: 10px 10px 10px 16px;
    cursor: default;
    text-align: left;
  }

  li:hover, li.selected {
    background: rgba(0, 0, 0, 0.03);
  }

  #search:hover, #search.selected {
    width: 100%;
    background: transparent !important;
  }

  #empty {
    color: rgba(0,0,0,0.51);
  }

  i {
    float: right !important;
  }

  #bottom {
    bottom: 0 !important;
    position: absolute;
    display: flex;
    width: 100% !important;
    background: rgba(0, 0, 0, 0.04);
    color: rgba(0,0,0,0.74) !important;
  }

  #bottom .divider {
    width: 100%;
    margin: 0;
  }

  #bottom .button {
    background-color: rgba(98, 50, 100, 0.88);
    color: white;
    right: 0 !important;
    width: auto !important;
    margin: 8px !important;
    margin-left: auto !important;
  }

  #bottom .button:hover {
    background-color: #623264;
  }

</style>