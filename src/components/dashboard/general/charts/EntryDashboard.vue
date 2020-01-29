<template>
  <sui-grid id="main" v-if="entries">

    <sui-grid-row class="title" vertical-align="top">
      {{entries.length}} resultaten voor '{{query}}'
    </sui-grid-row>

    <sui-grid-row style="height: 100%;">
      <div>
        <sui-card-group :items-per-row="3">
          <sui-card v-for="entry in entries" v-bind:key="entry.entryId">
            <sui-card-content>
              {{entry.remark}}
            </sui-card-content>
            <sui-card-content extra>
              <span slot="right">
                  {{entry.year}}
                </span>
            </sui-card-content>
          </sui-card>
        </sui-card-group>
      </div>
    </sui-grid-row>
  </sui-grid>
</template>

<script>
  import {mapActions} from "vuex";
  import {SEARCH_ENTRIES} from "../../../../store/actions";

  export default {
    name: "EntryDashboard",
    data() {
      return {
        entries: null
      }
    },
    props: {
      query: {
        default: null,
        type: String
      },
      years: {
        default: null,
        type: Array
      },
      disciplineIds: {
        default: null,
        type: Array
      }
    },
    methods: {
      ...mapActions('entries', {
        search: SEARCH_ENTRIES
      }),

      load() {
        this.search({
          searchQuery: this.query,
          years: this.years,
          disciplineIds: this.disciplineIds
        }).then((result) => {
          this.entries = result.sort((a, b) => (a.year < b.year) ? 1 : -1);
        })
      }
    },
    watch: {
      query: function (_newVal, _oldVal) {
        this.load()
      },
      years: function (_newVal, _oldVal) {
        this.load()
      },
      disciplineIds: function (_newVal, _oldVal) {
        this.load()
      }
    },
    beforeMount() {
      this.load();
    }
  }
</script>

<style scoped>

  #main {
    height: 100%;
    width: 100%;
    padding: 16px;
  }

  #main .button {
    justify-self: center;
  }

  .title {
    font-size: 28px;
    margin: 6px 0;
  }

  .options {
    padding: 0 !important;
  }

  .fullwidth .card {
    margin: 0 !important;
  }

</style>