<template>
  <ul>
    <li v-for="institute in institutes" v-bind:key="institute.id">
      {{ institute.city }} <sui-icon name="angle right" />
    </li>
  </ul>
</template>

<script>
  export default {
    name: "InstituteList",
    props: ['institutes']
  }
</script>

<style scoped>

  ul {
    list-style-type: none;
  }

  li {
    margin: 20px;
  }

</style>