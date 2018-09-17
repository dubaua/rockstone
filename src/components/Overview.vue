<template lang="pug">
  section.overview
    h1.title.overview__title {{  content.common.who_we_are_title }}
    .overview__row
      .overview__col(v-html="content.common.who_we_are_block_1")
      .overview__col(v-html="content.common.who_we_are_block_2")
      .overview__col(v-html="content.common.who_we_are_block_3")
</template>

<script>
export default {
  name: 'Overview',
  props: {
    content: Object,
  },
}
</script>

<style lang="scss">
</style>
