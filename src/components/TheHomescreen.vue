
<template lang="pug">
section.section.homescreen
  transition-sequence(v-bind="getTransitionConfig(0, 3, 'homescreen')" @transitionAnimated="showNext('homescreen')")
    .section__mountain.section__mountain--1-2.section__mountain--d-n
      icon(glyph="mountain-group-1-2")
  transition-sequence(v-bind="getTransitionConfig(3, 3, 'homescreen')" @transitionAnimated="showNext('homescreen')")
    .homescreen__logo
      icon(glyph="logo")
  transition-sequence(v-bind="getTransitionConfig(1, 3, 'homescreen')" @transitionAnimated="showNext('homescreen')")
    .section__mountain.section__mountain--1-1.section__mountain--l-n
      icon(glyph="mountain-group-1-1")
  transition-sequence(v-bind="getTransitionConfig(2, 3, 'homescreen')" @transitionAnimated="showNext('homescreen')")
    .section__mountain.section__mountain--1-3.section__mountain--d-n-n
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
import { getTransitionConfig } from '@/store/modules/sections';

export default {
  name: 'TheHomescreen',
  methods: {
    getTransitionConfig,
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
