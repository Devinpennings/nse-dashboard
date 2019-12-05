<template>
  <div class="center-container" id="content">
    <sui-grid centered class="fullwidth">
      <sui-grid-row id="title">
        <div id="icon" v-if="icon">
          <sui-icon :name="icon" size="big"/>
        </div>
        <h2>{{title}}</h2>
      </sui-grid-row>
      <sui-grid-row id="content-list">
          <div class="list-group"
            v-for="institute in Object.keys(sorted)"
            v-bind:key="institute.instituteId"
          >
            <div class="group-title">{{ institute }}</div>
            <sui-divider class="divider"/>
            <ul>
              <li v-for="discipline in sorted[institute]" v-bind:key="discipline.disciplineId">
                {{ discipline.name }}
              </li>
            </ul>
          </div>
          <div id="empty" v-if ="items.length < 1">
            Geen items.
          </div>
      </sui-grid-row>
      <sui-grid-row id="bottom" v-if="allowSubmit && !disableBottom">
        <div class="fullwidth submit">
          <div id="selected-count">
            {{ this.items.length > 0 ? this.items.length : 'Geen ' }} item{{this.items.length === 1 ? '' : 's'}}
          </div>
          <div class="years">
            van<sui-dropdown v-on:input="startYearChange" :icon="null" direction="upward" class="year-dropdown" :value="startYear" :options="availableYears"/>
            tot<sui-dropdown v-on:input="endYearChange" :icon="null" direction="upward" class="year-dropdown" :value="endYear" :options="availableYears"/>
          </div>
          <sui-button v-if="allowSubmit" v-on:click="onSelectSubmit" v-bind:class="{ disabled: sorted.length < 1 }" content="Bevestigen" size="small" icon="angle right" label-position="right" />
        </div>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
  import {mapMutations, mapState} from "vuex";
  import {SET_END_YEAR, SET_START_YEAR} from "../../store/actions";

  export default {

    name: "SelectedDisciplineList",
    props: {
      icon: String,
      title: String,
      allowSubmit: Boolean,
      displayField: {
        type: String,
        default: 'value'
      },
      keyField: {
        type: String,
        default() {
          return this.displayField
        }
      },
      disableBottom: {
        type: Boolean,
        default() { return false; }
      }
    },
    events: [
      'selectSubmit'
    ],

    data() {
      return {
        selected: [],
        searchInput: "",
        hovered: undefined
      }
    },

    computed: {

      ...mapState('disciplines', {
        items: state => state.selected,
      }),

      ...mapState('dashboard', {
        startYear: state => state.startYear,
        endYear: state => state.endYear,
        availableYears: (state) => {
          return state.availableYears.map(y => {
            return {
              value: y,
              text: y.toString()
            }
          })
        }
      }),

      sorted() {
        return this.items.reduce(function(rv, x) {
          if (!x) return rv;
          (rv[x.institute.name] = rv[x.institute.name] || []).push(x);
          return rv;
        }, {});
      },

      shouldSelectAll() {
        return !this.items.every((i) => this.selected.includes(i));
      }

    },

    methods: {

      ...mapMutations('dashboard', {
        setStartYear: SET_START_YEAR,
        setEndYear: SET_END_YEAR
      }),

      startYearChange(year) {
        if (year > this.endYear) {
          this.setEndYear(year);
        }
        this.setStartYear(year);
      },

      endYearChange(year) {
        if (year < this.startYear) {
          this.setStartYear(year);
        }
        this.setEndYear(year);
      },

      reset() {
        this.searchInput = "";
      },

      onSelectSubmit() {
        this.$emit('selectSubmit', this.selected);
      },

      onSelectAll() {

        if (this.shouldSelectAll) {
          this.items.forEach((i) => {
            if (!this.selected.includes(i)) {
              this.selected.push(i);
            }
          });

        } else {
          this.selected = this.selected.filter((i) => !this.items.includes(i))
        }
      },

      onHover(item) {
        this.hovered = item;
      }

    },

    beforeMount() {
      this.reset();
    },

    watch: {
      items() {
        this.reset();
      }
    }

  }
</script>

<style scoped>

  #content {
    background: #ffffff;
    padding-top: 24px !important;
    max-height: 600px;
  }

  ::-webkit-scrollbar {
    display: block !important;
  }

  #icon {
    color: #623264;
    width: 100%;
    display: flex;
    justify-content: center;
    height: auto;
    flex: 1 1 auto;
  }

  h2 {
    margin: 0 !important;
  }

  .list-group {
    list-style-type: none;
    margin: 0 !important;
    margin-bottom: 16px !important;
    padding: 0 !important;
    width: 100%;
    height: auto !important;
  }

  .group-title {
    font-weight: bold;
    text-align: left;
    width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 8px;
  }

  .divider {
    margin-top: 8px !important;
    margin-bottom: 0 !important;
  }

  ul {
    list-style: none;
    width: 100% !important;
    padding: 0 !important;
    margin: 0;
    height: auto !important;
  }

  li {
    padding: 10px 10px 10px 16px;
    cursor: default;
    text-align: left;
    width: 100% !important;
  }

  #search {
    width: 100%;
    background: transparent !important;
    margin-right: 12px;
    margin-left: 12px;
    /*margin-bottom: 12px;*/
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
    height: 65%;
    overflow: scroll;
    display: flex;
    align-content: flex-start;
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
    /*height: 64px;*/
    padding: 0 !important;
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

  #bottom .fullwidth {
    height: 50%;
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
    display: flex;
  }

  .years {
    color: rgb(125, 125, 125) !important;
    height: auto !important;
    margin: 8px !important;
    margin-left: 16px !important;
  }

  .submit {
    height: 100% !important;
    display: flex;
    flex-direction: row;
    align-items:flex-start;
    align-content:flex-start;
  }

  .submit>* {
    align-self: center;
  }

  .year-dropdown {
    -moz-appearance: none;
    appearance: none;
    margin-left: 6px;
    margin-right: 12px;
  }

</style>