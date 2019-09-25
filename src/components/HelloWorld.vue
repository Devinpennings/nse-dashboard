<template>
  <div class="hello">
    {{ institutes }}
  </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import {REFRESH_INSTITUTES} from "../store/actions";

  export default {
    name: 'HelloWorld',
    computed: {
      ...mapState({
        institutes: state => state.institutes.all
      }),
    },
    methods: {
      ...mapActions('institutes', {
        refreshInstitutes: REFRESH_INSTITUTES
      })
    },
    mounted() {
      this.refreshInstitutes();
    }
  }
</script>
