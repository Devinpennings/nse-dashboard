<template>
  <sui-grid-column class="panel-wrap" :width="width">
    <div class="panel">
      <sui-grid-row class="panel-top">
        {{ title }}
      </sui-grid-row>
      <sui-grid-row style="padding: 16px">
        <slot></slot>
      </sui-grid-row>
    </div>
  </sui-grid-column>
</template>

<script>
  export default {

    name: "DashboardPanel",
    props: ['title', 'width']

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
    overflow: hidden;
    width: auto;
  }

  .panel-top {
    background-color: white;
    color: #585858;
    padding: 12px 0 12px 16px;
    border-bottom: #eeeeee 1px solid;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
  }

</style>