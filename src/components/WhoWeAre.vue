<template lang="pug">
  section.section.who-we-are
    .section__container
      transition-sequence(v-bind="getTransitionConfig(1, 4, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
        h1.title.who-we-are__title {{  content.common.who_we_are_title }}
      .spread-block
        transition-sequence(v-bind="getTransitionConfig(2, 4, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
          .spread-block__col.spread-block__col--left.who-we-are__content
            .typographic(v-html="content.common.who_we_are_block_1")
        transition-sequence(v-bind="getTransitionConfig(3, 4, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
          .spread-block__col.spread-block__col--middle.who-we-are__content
            .typographic(v-html="content.common.who_we_are_block_2")
            .section__mountain.section__mountain--2-2.section__mountain--l-n
              icon(glyph="mountain-group-2-2")
        transition-sequence(v-bind="getTransitionConfig(4, 4, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
          .spread-block__col.spread-block__col--right.who-we-are__content
            .typographic(v-html="content.common.who_we_are_block_3")
            .section__mountain.section__mountain--2-3.section__mountain--l-n
              icon(glyph="mountain-group-2-3")
    transition-sequence(v-bind="getTransitionConfig(0, 4, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
      .section__mountain.section__mountain--2-1.section__mountain--d-n
        icon(glyph="mountain-group-2-1")
</template>

<script>
import { getTransitionConfig } from '@/store/modules/sections';

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
    getTransitionConfig,
    showNext(key) {
      this.$store.commit('nextStep', { key })
    },
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
