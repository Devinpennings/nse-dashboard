<template>
  <div>
    <div v-for="topic in topics" v-bind:key="topic.name" class="list-item">
      <div class="comment-count">
        <sui-icon name="comment outline"></sui-icon>
        {{topic.commentCount}}
      </div>
      {{topic.name}}
    </div>
    <div class="list-item-last">
      Alle onderwerpen <sui-icon name="angle right"></sui-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TrendingTopicsList",
    data() {
      return {
        topics: [
          {
            name: 'Docenten, Lessen, Klassen',
            commentCount: 201
          },
          {
            name: 'Kantine, Broodjes, Koffie, Thee',
            commentCount: 155
          },
          {
            name: 'Tentamens, Stilte, Pennen, Potloden, Materiaal',
            commentCount: 65
          },
          {
            name: 'Huiswerk, Parkeren, Fietsen',
            commentCount: 24
          },
          {
            name: 'Muziek, Oortjes, Geluid, Herrie',
            commentCount: 8
          },
        ]
      }
    }
  }
</script>

<style scoped>

  .list-item {
    border-bottom: #c7c7c7 1px solid;
    padding: 24px 36px;
    color: #5b5b5b;
    position: relative;
    font-family: 'Roboto', sans-serif;
  }

  .list-item:hover {
    background-color: #f7f7f7;
  }

  .list-item:hover::before {
    content: "";
    display: inline-block;
    width: 2px;
    height: 100%;
    background-color: #623264;
    left: 0;
    top: 0;
    position: absolute;
  }

  .list-item-last {
    text-align: right;
    padding: 12px 12px 12px 36px;
    border-bottom: 0;
    font-family: 'Roboto', sans-serif;
    color: #5b5b5b;
    background-color: white;
  }

  .list-item-last:hover {
    color: #353535;
  }

  .comment-count {
    display: inline-block;
    margin-right: 16px;
    min-width: 50px !important;
    font-size: 14px;
  }

    .comment-count i {
      margin-right: 0 !important;
    }

</style>