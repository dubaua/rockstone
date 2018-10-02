<template lang="pug">
  section.section.who-we-are
    a(name="who_we_are")
    .section__container
      h1.title.who-we-are__title {{  content.common.who_we_are_title }}
      .spread-block
        .spread-block__col.spread-block__col--left.who-we-are__content
          .typographic(v-html="content.common.who_we_are_block_1")
        .spread-block__col.spread-block__col--middle.who-we-are__content
          .typographic(v-html="content.common.who_we_are_block_2")
          .section__mountain.section__mountain--2-2.section__mountain--l-n
            icon(glyph="mountain-group-2-2")
        .spread-block__col.spread-block__col--right.who-we-are__content
          .typographic(v-html="content.common.who_we_are_block_3")
          .section__mountain.section__mountain--2-3.section__mountain--l-n
            icon(glyph="mountain-group-2-3")
    .section__mountain.section__mountain--2-1.section__mountain--d-n
      icon(glyph="mountain-group-2-1")
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
@import "~@/styles/_globals";

.who-we-are {
  &__title,
  &__content {
    position: relative;
    @include global-padding;
  }
}
</style>
