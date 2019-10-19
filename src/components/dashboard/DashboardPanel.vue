<template>
  <sui-grid-column class="panel-wrap" :width="width">
    <div class="panel">
      <sui-grid-row class="panel-top">
        <div class="icon"><slot name="icon"></slot></div> {{ title }}
      </sui-grid-row>
      <sui-grid-row v-bind:style="{ padding: padded ? '16px' : '0px'}" style="padding: 16px" >
        <slot></slot>
      </sui-grid-row>
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
      padded: {
        default: true,
        type: Boolean
      },
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
  }

  .panel-top {
    background-color: white;
    color: #585858;
    padding: 16px 0 16px 16px;
    border-bottom: #eeeeee 1px solid;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
  }

  .panel-top .icon {
    font-size: 16px;
    display: inline;
    margin-right: 4px;
    color: #623264 !important;
  }

</style>