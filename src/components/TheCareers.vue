<template lang="pug">
  section.section.careers
    .section__container
      transition-sequence(v-bind="getTransitionConfig(0, 3, 'careers')" @transitionAnimated="showNext('careers')")
        h1.title.careers__title {{ currentLanguage.common.careers_title }}
      transition-sequence(v-bind="getTransitionConfig(1, 3, 'careers')" @transitionAnimated="showNext('careers')")
        .careers__cover(:style="coverStyle")
      transition-sequence(v-bind="getTransitionConfig(2, 3, 'careers')" @transitionAnimated="showNext('careers')")
        .careers__list
          .position(
            v-for="(position, index) in content.careers"
            :key="position._id"
            @click="openPosition(index)")
            h2.subtitle.position__title.hidden-en {{position.title_ru}}
            h2.subtitle.position__title.hidden-ru {{position.title_en}}
            .position__city.hidden-en {{position.city_ru}}
            .position__city.hidden-ru {{position.city_en}}
            icon(glyph="arrow-right", :width="24", :height="24").position__icon
      transition-sequence(v-bind="getTransitionConfig(3, 3, 'careers')" @transitionAnimated="showNext('careers')")
        .careers__apply
          button.button.button--wide(@click="openFeedback") {{ currentLanguage.common.apply_button_text }}
    mq-layout(mq="lg+").scrolldown.scrolldown--above.scrolldown--accent
      .scrolldown__text
        running-text(text="scroll down")
      .scrolldown__arrow
        icon(glyph="double-arrow--bottom", :width="16", :height="16")
</template>

<script>
import { EventBus } from "@/utils";
import { mapGetters } from 'vuex';

export default {
  name: 'TheCareers',
  props: {
    content: Object,
  },
  computed: {
    ...mapGetters(['getTransitionConfig']),
    coverStyle() {
      return `background-image: url(${this.currentLanguage.common.careers_cover.path})`;
    },
    currentLanguage() {
      return this.content[this.$store.state.page.currentLanguageCode];
    },
  },
  methods: {
    openPosition(index) {
      this.$store.dispatch('setByKey', {key: 'isPositionOpen', value: true});
      this.$store.dispatch('setByKey', {key: 'currentPosition', value: index});
      EventBus.$emit('resetScroller');
    },
    openFeedback() {
      this.$store.dispatch('setByKey', {key: 'isFeedbackOpen', value: true});
    },
    showNext(key) {
      this.$store.commit('nextStep', { key })
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.careers {
  &__title {
    @include global-padding;
  }
  &__cover {
    @include breakpoint("lg") {
      position: absolute;
      bottom: -10vw;
      top: 0;
      left: 50%;
      z-index: -1;
      right: 0;
      background-position: center center;
      background-size: cover;
      box-shadow: 0 100px 0 $color-background;

      @include breakpoint("xl") {
        left: 42%;
      }

      &:before {
        content: "";
        position: absolute;
        bottom: -1px;
        right: 0;
        left: 0;
        background: linear-gradient(transparent, $color-background--dark);
        height: 38%;
      }

      & img {
        width: auto;
        max-height: 100%;
      }
    }
  }

  &__apply {
    margin-top: $base;
    max-width: 320px;
    @include global-padding;
  }
}

.position {
  max-width: 326px;
  @include breakpoint("sm") {
    max-width: 295px;
  }
  padding-bottom: $base;
  padding-top: $base;
  @include global-padding;
  position: relative;
  cursor: pointer;

  &__title {
    font-weight: normal !important;
    font-size: $base !important;
    margin-bottom: $base * 0.5 !important;
  }

  &__icon {
    fill: $color-primary;
    position: absolute;
    right: $base * 2;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>
