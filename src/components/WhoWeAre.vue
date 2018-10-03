<template lang="pug">
  section.section.who-we-are
    .section__container
      transition-sequence(
        :order="0"
        section="whoWeAre"
        :final="3"
        )
        h1.title.who-we-are__title {{  content.common.who_we_are_title }}
      .spread-block
        transition-sequence(
          :order="1"
          section="whoWeAre"
          :final="3"
          )
          .spread-block__col.spread-block__col--left.who-we-are__content
            .typographic(v-html="content.common.who_we_are_block_1")
        transition-sequence(
          :order="2"
          section="whoWeAre"
          :final="3"
          )
          .spread-block__col.spread-block__col--middle.who-we-are__content
            .typographic(v-html="content.common.who_we_are_block_2")
            .section__mountain.section__mountain--2-2.section__mountain--l-n
              icon(glyph="mountain-group-2-2")
        transition-sequence(
          :order="3"
          section="whoWeAre"
          :final="3"
          )
          .spread-block__col.spread-block__col--right.who-we-are__content
            .typographic(v-html="content.common.who_we_are_block_3")
            .section__mountain.section__mountain--2-3.section__mountain--l-n
              icon(glyph="mountain-group-2-3")
    .section__mountain.section__mountain--2-1.section__mountain--d-n
      icon(glyph="mountain-group-2-1")
</template>

<script>
export default {
  name: 'WhoWeAre',
  props: {
    content: Object,
  },
  data() {
    return {
      animationStep: 0,
    }
  },
  methods: {
    isStepReached(order) {
      return this.$store.state.sections.whoWeAre.isInViewport && this.animationStep >= order;
    },
    nextStep(delay) {
      setTimeout(() => this.animationStep++, delay);
    }
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
