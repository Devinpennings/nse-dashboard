<template>
  <sui-grid-column class="panel-wrap" :width="width">
    <div class="panel">
      <div class="panel-top">
        <div class="description"><slot name="icon"></slot> {{ title }}</div>
        <sui-popup v-if="description" :content="description" position="bottom right">
          <sui-icon class="info" name="info circle" slot="trigger"/>
        </sui-popup>
      </div>
      <div class="panel-content" v-bind:style="{ padding: padded ? '16px' : '0px'}" >
        <slot></slot>
      </div>
    </div>
  </sui-grid-column>
</template>

<script>
  export default {

    name: "DashboardPanel",
    props: {
      title: String,
      icon: Object,
      width: Number,
      description: String,
      padded: {
        default: true,
        type: Boolean
      },
    },
    data() {
      return {
        infoVisible: false
      }
    },
    methods: {
      enableInfo() {
        this.infoVisible = true
      },
      disableInfo() {
        this.infoVisible = false
      }
    }

  }
</script>

<style scoped>

  .panel-wrap {
    width: auto !important;
  }

  .panel {
    background-color: #fbfbfb;
    -webkit-box-shadow: 5px 7px 9px 0 rgba(181,181,181,1);
    -moz-box-shadow: 5px 7px 9px 0 rgba(181,181,181,1);
    box-shadow: 5px 7px 9px 0 rgb(218, 218, 218);
    border-radius: 6px;
    width: auto;
    height: 480px !important;
    display: flex;
    flex-direction: column;
  }

  .panel-top {
    background-color: white;
    color: #585858;
    padding: 16px;
    border-bottom: #eeeeee 1px solid;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }

  .description {
    font-size: 16px;
    display: inline-block;
    margin-right: 4px;
  }

  .info {
    color: #dfdfdf !important;
  }

  .panel-content {
    padding: 16px;
    height: 100%;
  }

</style>