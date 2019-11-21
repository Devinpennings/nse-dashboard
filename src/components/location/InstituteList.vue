<template>
  <div class="center-container" id="content">
    <sui-grid centered class="fullwidth">
      <sui-grid-row id="icon">
        <sui-icon name="building" size="big"/>
      </sui-grid-row>
      <sui-grid-row id="title">
        <h2>Selecteer een instituut</h2>
      </sui-grid-row>
      <sui-grid-row id="content-list">
        <div id="search">
          <sui-input v-model="searchInput" v-on:input="onSearchChanged" style="width: 100%" placeholder="Zoeken..." icon="search" />
          <div id="select-all" v-on:click="onSelectAll">
            {{ shouldSelectAll ? 'Selecteer alles' : 'Deselecteer alles'}}
          </div>
        </div>
        <ul>
          <li
            v-for="institute in sortedInstitutes"
            v-bind:key="institute.id"
            v-on:click="onSelectChange(institute)"
            v-bind:class="{ selected: selected && selected.id === institute.id }"
          >
            {{ institute.title }} <sui-icon v-if="selectedInstitutes.includes(institute)" style="color: #623264" name="check" />
          </li>
          <li id="empty" v-if="sortedInstitutes.length < 1">
            Er zijn geen instituten gevonden.
          </li>
        </ul>
      </sui-grid-row>
      <sui-grid-row id="bottom">
        <div id="selected-count">
          {{ this.selectedInstitutes.length > 0 ? this.selectedInstitutes.length : 'Geen ' }} item{{this.selectedInstitutes.length === 1 ? '' : 's'}}
        </div>
        <sui-button v-on:click="onSelectSubmit" v-bind:class="{ disabled: selectedInstitutes.length < 1 }" content="Bevestigen" size="small" icon="angle right" label-position="right" />
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
  export default {

    name: "InstituteList",
    props: ['institutes'],
    events: ['selectChange', 'selectSubmit'],

    data() {
      return {
        selected: null,
        filteredInstitutes: [],
        searchInput: "",
        selectedInstitutes: []
      }
    },

    computed: {

      sortedInstitutes() {
        return [...this.filteredInstitutes].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      },

      shouldSelectAll() {
        return !this.filteredInstitutes.every((i) => this.selectedInstitutes.includes(i));
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

      },

      onSelectSubmit() {
        this.$emit('selectSubmit', this.selectedInstitutes);
      },

      onSelectAll() {

        if (this.shouldSelectAll) {
          this.filteredInstitutes.forEach((i) => {
            if (!this.selectedInstitutes.includes(i)) {
              this.selectedInstitutes.push(i);
            }
          });
        } else {
          this.selectedInstitutes = this.selectedInstitutes.filter((i) => !this.filteredInstitutes.includes(i))
        }

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
    background: #ffffff;
    padding-top: 24px !important;
  }

  ::-webkit-scrollbar {
    display: block !important;
  }

  #icon {
    padding-bottom: 6px !important;
    color: #623264;
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

  #search {
    width: 100%;
    background: transparent !important;
    margin-right: 12px;
    margin-left: 12px;
    margin-bottom: 12px;
  }

  #select-all {
    width: 100%;
    color: #8a478d;
    text-align: right;
    margin-top: 4px;
  }

  #select-all:hover {
    color: #623264;
  }

  #empty {
    color: rgba(0,0,0,0.51);
  }

  #content-list {
    padding-bottom: 0 !important;
  }

  #content-list ul {
    height: 300px;
    overflow-y: scroll;
    scroll-padding: 10px !important;
  }

  i {
    float: right !important;
  }

  #bottom {
    bottom: 0 !important;
    display: flex;
    width: 100% !important;
    background: rgba(0, 0, 0, 0.04);
    color: rgba(0,0,0,0.74) !important;
  }

  #bottom .divider {
    width: 100%;
    margin: 0;
  }

  #selected-count {
    color: rgb(125, 125, 125);
    margin: 8px !important;
    margin-left: 16px !important;
    align-self: center !important;
    cursor: default !important;
  }

  #bottom div, i {
    padding: 0 !important;
  }

  #bottom i {
    align-self: center !important;
    margin-bottom: 6px !important;
    margin-left: 32px !important;
  }

  #bottom .button {
    background-color: rgba(98, 50, 100, 0.88);
    color: white;
    right: 0 !important;
    width: auto !important;
    margin: 8px !important;
    margin-left: auto !important;
  }

  #bottom .disabled {
    background-color: rgb(112, 111, 111) !important;
  }

  #bottom .button:hover {
    background-color: #623264;
  }

  .fullwidth {
    height: 100%;
  }

</style>