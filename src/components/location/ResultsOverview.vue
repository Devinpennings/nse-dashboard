<template>
  <div class="center-container" id="content">
    <sui-table basic>
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell :width="4">Datum</sui-table-header-cell>
          <sui-table-header-cell :width="2">Van</sui-table-header-cell>
          <sui-table-header-cell :width="2">Tot</sui-table-header-cell>
          <sui-table-header-cell :width="4">Opleidingen</sui-table-header-cell>
          <sui-table-header-cell :width="4"/>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row v-for="request in requests" v-bind:key="request.resultId">
          <sui-table-cell>{{formatDate(request.createdAt)}}</sui-table-cell>
          <sui-table-cell>{{request.resultRequest.years[0].value}}</sui-table-cell>
          <sui-table-cell>{{request.resultRequest.years[request.resultRequest.years.length - 1].value}}</sui-table-cell>
<!--          <sui-table-cell>{{request.resultRequest.disciplines.map(d => d.name + ' ' + d.degree).join(', ')}}</sui-table-cell>-->
          <sui-table-cell>{{request.resultRequest.disciplines.length}} opleiding(en)</sui-table-cell>
          <sui-table-cell>
            <ul class="list-unstyled multi-steps" v-if="request.status !== 'FAILED' && request.status !== 'COMPLETE'">
              <li v-for="step in steps" v-bind:key="step" v-bind:class="{'is-active': step === steps[request.status]}">
                {{step}}
              </li>
            </ul>
            <ul class="list-unstyled" v-else-if="request.status === 'COMPLETE'">
              <li class="complete">
                <sui-button v-on:click="onSelect(request)" content="Bekijken" size="small" icon="angle right" label-position="right" />
              </li>
            </ul>
            <ul class="list-unstyled multi-steps " v-else>
              <li class="failed">
                Fout
              </li>
            </ul>
          </sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
  </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import moment from 'moment';
  import {FETCH_INCOMPLETE_REQUESTS} from "../../store/actions";

  export default {
    name: "ResultsOverview",
    data() {
      return {
        steps: {
          "RECEIVED": 'Ontvangen',
          "QUEUED": 'In wachtrij',
          "PROCESSING": 'In behandeling',
          "COMPLETE": 'Voltooid'
        }
      }
    },
    computed: {
      ...mapState('results', {
        requests: state => state.all
      }),
    },
    methods: {
      ...mapActions('results', {
        fetchIncompleteRequests: FETCH_INCOMPLETE_REQUESTS
      }),
      formatDate(date) {
        const string = moment(Date.parse(date)).add(1, 'hour').locale('nl').fromNow();
        return string.charAt(0).toUpperCase() + string.substring(1);
      },
      fetchData() {
        this.fetchIncompleteRequests(this.requests);
      },
      onSelect(request) {
        this.$router.push(`/dashboard?type=TOPIC&result=${request.resultId}`)
      }
    },
    mounted: function () {
      this.fetchData();

      this.interval = setInterval(function () {
        this.fetchData();
      }.bind(this), 10000);
    },

    beforeDestroy: function(){
      clearInterval(this.interval);
    }
  }
</script>

<style scoped>
  @import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

  .list-unstyled {
    list-style: none;
  }
  .multi-steps > li.is-active:before, .multi-steps > li.is-active ~ li:before {
    content: counter(stepNum);
    font-family: inherit;
    font-weight: 700;
  }
  .multi-steps > li.is-active:after, .multi-steps > li.is-active ~ li:after {
    background-color: #ededed;
  }

  .multi-steps {
    display: table;
    table-layout: fixed;
    width: 100%;
    font-size: 12px;
  }
  .multi-steps > li {
    counter-increment: stepNum;
    text-align: center;
    display: table-cell;
    position: relative;
    color: #623264;
  }
  .multi-steps > li:before {
    content: '\f00c';
    content: '\2713;';
    content: '\10003';
    content: '\10004';
    content: '\2713';
    display: block;
    margin: 0 auto 4px;
    background-color: #fff;
    width: 36px;
    height: 36px;
    line-height: 32px;
    text-align: center;
    font-weight: bold;
    border-width: 2px;
    border-style: solid;
    border-color: #623264;
    border-radius: 50%;
  }
  .multi-steps > li:after {
    content: '';
    height: 2px;
    width: 100%;
    background-color: #623264;
    position: absolute;
    top: 16px;
    left: 50%;
    z-index: -1;
  }
  .multi-steps > li:last-child:after {
    display: none;
  }
  .multi-steps > li.is-active:before {
    background-color: #fff;
    border-color: #623264;
  }
  .multi-steps > li.is-active ~ li {
    color: #808080;
  }
  .multi-steps > li.is-active ~ li:before {
    background-color: #ededed;
    border-color: #ededed;
  }
  .multi-steps > li.failed:before {
    content: '\f00d';
    font-family: "Font Awesome 5 Free"; /* This is the correct font-family*/
    font-style: normal;
    font-weight: 900;
    text-decoration: inherit;
  }
</style>