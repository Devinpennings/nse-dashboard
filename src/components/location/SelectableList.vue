<template>
  <div class="center-container" id="content">
    <sui-grid centered class="fullwidth">
      <sui-grid-row id="title">
        <div id="icon">
          <sui-icon :name="icon" size="big"/>
        </div>
        <h2>{{title}}</h2>
      </sui-grid-row>
      <sui-grid-row id="content-list">
        <div id="search" v-if="allowSearch || allowSelectAll">
          <sui-input v-if="allowSearch" v-model="searchInput" v-on:input="onSearchChanged" style="width: 100%" placeholder="Zoeken..." icon="search" />
          <div v-if="allowSelectAll" id="select-all" v-on:click="onSelectAll">
            {{ shouldSelectAll ? 'Selecteer alles' : 'Deselecteer alles'}}
          </div>
        </div>
        <ul>
          <li
            v-for="item in sorted"
            v-bind:key="item[keyField]"
            v-on:click="onSelectChange(item)"
          >
            {{ item[displayField] }} <sui-icon v-if="isSelected(item)" style="color: #623264" name="check" />
          </li>
          <li id="empty" v-if="filtered.length < 1">
            Geen resultaten.
          </li>
        </ul>
      </sui-grid-row>
      <sui-grid-row id="bottom" v-if="(allowMultiSelect || allowSubmit) && !disableBottom">
        <div id="selected-count" v-if="allowMultiSelect">
          {{ this.selected.length > 0 ? this.selected.length : 'Geen ' }} item{{this.selected.length === 1 ? '' : 's'}}
        </div>
        <sui-button v-if="allowSubmit" v-on:click="onSelectSubmit" v-bind:class="{ disabled: selected.length < 1 }" content="Bevestigen" size="small" icon="angle right" label-position="right" />
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
  export default {

    name: "SelectableList",
    props: {
      icon: String,
      title: String,
      allowSearch: Boolean,
      allowSelectAll: Boolean,
      allowMultiSelect: {
        type: Boolean,
        default() {
          return this.allowSelectAll
        }
      },
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
      items: {
        type: Array,
        default() { return [] }
      },
      disableBottom: {
        type: Boolean,
        default() { return false; }
      }
    },
    events: [
      'selectChange',
      'selectSubmit'
    ],

    data() {
      return {
        filtered: [],
        searchInput: "",
        selected: []
      }
    },

    computed: {

      sorted() {
        return [...this.filtered].sort((a,b) => (a[this.displayField] > b[this.displayField]) ? 1 : ((b[this.displayField] > a[this.displayField]) ? -1 : 0));
      },

      shouldSelectAll() {
        return !this.filtered.every((i) => this.selected.includes(i));
      }

    },

    methods: {

      onSearchChanged() {
        setTimeout(() => {
          this.filtered = [...this.items].filter((i) => i[this.displayField].toLowerCase().includes(this.searchInput.toLowerCase()));
        }, 200);
      },

      reset() {
        this.filtered = this.items;
        this.searchInput = "";
      },

      onSelectChange(item) {
        if (this.selected.includes(item)) {
          this.selected = this.selected.filter(i => i !== item);
          this.$emit('selectChange', {
            item,
            deselect: true
          });
        } else {
          if (!this.allowMultiSelect) this.selected = [item];
          else this.selected.push(item);
          this.$emit('selectChange', {
            item,
            deselect: false
          });
        }
      },

      onSelectSubmit() {
        this.$emit('selectSubmit', this.selected);
      },

      isSelected(item) {
        return this.selected.some(i => i[this.keyField] === item[this.keyField])
      },

      onSelectAll() {

        if (this.shouldSelectAll) {
          this.filtered.forEach((item) => {
            if (!this.selected.includes(item)) {
              this.selected.push(item);
              this.$emit('selectChange', {
                item,
                deselect: false
              });
            }
          });
        } else {
          this.selected = this.selected.filter((item) => {
            if (this.filtered.includes(item)) {
              this.$emit('selectChange', {
                item,
                deselect: true
              });
              return false
            }
            return true
          })
        }

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