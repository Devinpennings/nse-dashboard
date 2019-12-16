<template>
    <div id="main" v-if="topic">

      <div class="header">
        <div class="title">
          {{topic.value}}
        </div>
        <div>
          <sui-checkbox label="Problemen"/>
          <sui-checkbox label="Oplossingen"/>
          <sui-checkbox label="Complimenten"/>
        </div>
      </div>

      <sui-card class="fluid" v-for="sentence in topic.contributedSentences" v-bind:key="sentence.value">
        <sui-card-content>
          {{sentence.value}}
        </sui-card-content>
        <sui-card-content extra>
        <span slot="right">
          <sui-icon name="thumbs up outline"/>
          <sui-icon name="thumbs down outline"/>
        </span>
        </sui-card-content>
      </sui-card>
      <div>
        <sui-button basic>
          <sui-icon name="chevron down"/>Laad meer opmerkingen
        </sui-button>
      </div>
    </div>
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
      })
    },
    beforeMount() {
      this.getSingle(this.topicId).then((result) => {
        this.topic = result
      })
    }
  }
</script>

<style scoped>

  #main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #main .button {
    justify-self: center;
  }

  .header {
    padding-bottom: 64px;
  }

  .header .title {
    font-size: 28px;
  }

</style>