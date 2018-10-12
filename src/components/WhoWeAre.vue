<template lang="pug">
  section.section.who-we-are
    .section__container
      transition-sequence(v-bind="getTransitionConfig(1, 6, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
        h1.title.who-we-are__title {{  content.common.who_we_are_title }}
      .spread-block
        transition-sequence(v-bind="getTransitionConfig(2, 6, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
          .spread-block__col.spread-block__col--left.who-we-are__content
            .typographic(v-html="content.common.who_we_are_block_1")
        .spread-block__col.spread-block__col--middle.who-we-are__content
          transition-sequence(v-bind="getTransitionConfig(3, 6, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
            .typographic(v-html="content.common.who_we_are_block_2")
          .section__mountain.section__mountain--2-2.section__mountain--l-n
            transition-sequence(v-bind="getTransitionConfig(4, 6, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
              icon(glyph="mountain-group-2-2")
        .spread-block__col.spread-block__col--right.who-we-are__content
          transition-sequence(v-bind="getTransitionConfig(5, 6, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
            .typographic(v-html="content.common.who_we_are_block_3")
          .section__mountain.section__mountain--2-3.section__mountain--l-n
            transition-sequence(v-bind="getTransitionConfig(6, 6, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
              icon(glyph="mountain-group-2-3")
    .section__mountain.section__mountain--2-1.section__mountain--d-n
      transition-sequence(v-bind="getTransitionConfig(0, 6, 'whoWeAre')" @transitionAnimated="showNext('whoWeAre')")
        icon(glyph="mountain-group-2-1")
</template>

<script>
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['getTransitionConfig']),
  },
  methods: {
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
