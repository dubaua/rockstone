
<template lang="pug">
  section.section.contact
    .section__container
      transition-sequence(v-bind="getTransitionConfig(3, 6, 'contact')" @transitionAnimated="showNext('contact')")
        h1.title.contact__title {{  content.common.contact_title }}
      .spread-block
        transition-sequence(v-bind="getTransitionConfig(4, 6, 'contact')" @transitionAnimated="showNext('contact')")
          .spread-block__col.spread-block__col--left.contact__content
            .typographic(v-html="content.common.contact_content")
        transition-sequence(v-bind="getTransitionConfig(5, 6, 'contact')" @transitionAnimated="showNext('contact')")
          .spread-block__col.spread-block__col--middle.contact__content
            .typographic(v-html="content.common.contact_chlb")
            parallax-scene(offset-y="-20%").section__mountain.section__mountain--7-1.section__mountain--l-n
              icon(glyph="mountain-group-7-1")
        transition-sequence(v-bind="getTransitionConfig(6, 6, 'contact')" @transitionAnimated="showNext('contact')")
          .spread-block__col.spread-block__col--right.contact__content
            .typographic(v-html="content.common.contact_spb")
            parallax-scene(offset-y="-30%").section__mountain.section__mountain--7-2.section__mountain--l-n
              icon(glyph="mountain-group-7-2")
    parallax-scene(offset-y="-15%").section__mountain.section__mountain--6-3.section__mountain--l-n-n
      transition-sequence(v-bind="getTransitionConfig(0, 6, 'contact')" @transitionAnimated="showNext('contact')")
        icon(glyph="mountain-group-6-3")
    parallax-scene(offset-y="-30%").section__mountain.section__mountain--6-2.section__mountain--l-n
      transition-sequence(v-bind="getTransitionConfig(1, 6, 'contact')" @transitionAnimated="showNext('contact')")
        icon(glyph="mountain-group-6-2")
    parallax-scene(offset-y="-45%").section__mountain.section__mountain--6-1.section__mountain--l-n-n
      transition-sequence(v-bind="getTransitionConfig(2, 6, 'contact')" @transitionAnimated="showNext('contact')")
        icon(glyph="mountain-group-6-1")
    mq-layout(mq="lg+").scrolldown.scrolldown--above.scrolldown--accent
      .scrolldown__text
        running-text(text="go back", reverse)
      .scrolldown__arrow
        icon(glyph="double-arrow--top", :width="16", :height="16")
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheContact',
  props: {
    content: Object,
  },
  computed: {
    ...mapGetters(['getTransitionConfig']),
    isMobile() {
      return this.$mq === 'xs' || this.$mq === 'sm' || this.$mq === 'md';
    },
  },
  methods: {
    showNext(key) {
      this.$store.commit('nextStep', { key })
    },
  }
}
</script>

<style lang="scss">
@import "~@/styles/_globals";
.contact {
  &__title {
    @include global-padding;
  }
  &__content {
    position: relative;
    @include global-padding;
  }
}
</style>
