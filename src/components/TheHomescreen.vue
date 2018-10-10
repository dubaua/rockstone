
<template lang="pug">
parallax-container.section.homescreen
  parallax-scene(:depth="0.8").section__mountain.section__mountain--1-2.section__mountain--d-n
    transition-sequence(v-bind="getTransitionConfig(0, 3, 'homescreen')" @transitionAnimated="showNext('homescreen')")
      icon(glyph="mountain-group-1-2")
  parallax-scene(:depth="0.6").homescreen__logo
    transition-sequence(v-bind="getTransitionConfig(3, 3, 'homescreen')" @transitionAnimated="showNext('homescreen')")
      icon(glyph="logo")
  parallax-scene(:depth="0.4").section__mountain.section__mountain--1-1.section__mountain--l-n
    transition-sequence(v-bind="getTransitionConfig(1, 3, 'homescreen')" @transitionAnimated="showNext('homescreen')")
      icon(glyph="mountain-group-1-1")
  parallax-scene(:depth="0.15").section__mountain.section__mountain--1-3.section__mountain--d-n-n
    transition-sequence(v-bind="getTransitionConfig(2, 3, 'homescreen')" @transitionAnimated="showNext('homescreen')")
      icon(glyph="mountain-group-1-3")
  mq-layout(mq="lg+").scrolldown
    .scrolldown__dots
    .scrolldown__text
      running-text(text="scroll down")
    .scrolldown__arrow
      icon(
        glyph="double-arrow--bottom"
        :width="16"
        :height="16"
        )
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheHomescreen',
  computed: {
    ...mapGetters(['getTransitionConfig']),
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

.homescreen {
  position: relative;
  z-index: 0;
  &__logo {
    position: absolute;
    top: 38%;
    left: 10%;
    right: 10%;
    fill: white;
    padding-bottom: 11.267605633802818%;
    z-index: -1;

    @include breakpoint("lg") {
      left: 20.5%;
      right: 19.5%;
    }

    svg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
