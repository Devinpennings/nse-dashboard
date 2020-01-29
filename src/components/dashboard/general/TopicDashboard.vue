<template>
    <sui-grid id="main" v-if="topic">

      <sui-grid-row class="title" vertical-align="top">
        {{topic.value}}
      </sui-grid-row>

      <sui-grid-row style="height: 100%;">
        <div>
          <sui-card-group :items-per-row="3">
            <sui-card v-for="sentence in topic.contributedSentences" v-bind:key="sentence.value">
              <sui-card-content>
                {{sentence.value}}
              </sui-card-content>
              <sui-card-content extra>
                Positie {{topic.contributedSentences.indexOf(sentence) + 1}}
                <span slot="right">
                  <sui-icon name="thumbs up outline"/>
                  <sui-icon name="thumbs down outline"/>
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
  import {GET_TOPIC} from "../../../store/actions";

  export default {
    name: "TopicDashboard",
    components: {},
    data() {
      return {
        topic: null
      }
    },
    props: {
      topicId: {
        default: null,
        type: String
      }
    },
    methods: {
      ...mapActions('topics', {
        getSingle: GET_TOPIC
      }),

      load() {
        this.getSingle(this.topicId).then((result) => {
          this.topic = result
        })
      }
    },
    watch: {
      topicId: function (_newVal, _oldVal) {
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