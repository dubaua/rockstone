<template lang="pug">
  section.section.careers
    a(name="careers")
    .section__container
      h1.title.careers__title {{ content.common.careers_title }}
      template(v-if="content.common.careers_cover")
        mq-layout(mq="lg+", :style="coverStyle").careers__cover
      .careers__list
        .position(v-for="(position, index) in content.careers", @click="openPosition(index)")
          h2.subtitle.position__title {{position.title}}
          .position__city {{position.city}}
          icon(glyph="arrow-right", :width="24", :height="24").position__icon
      .careers__apply
        button.button.button--wide(@click="openFeedback") {{ content.common.apply_button_text }}
    mq-layout(mq="lg+").scrolldown.scrolldown--above.scrolldown--accent
      .scrolldown__text
        running-text(text="scroll down")
      .scrolldown__arrow
        icon(glyph="double-arrow--bottom", :width="16", :height="16")
</template>

<script>
import { EventBus } from "@/utils";

export default {
  name: 'Careers',
  props: {
    content: Object,
  },
  computed: {
    coverStyle() {
      return `background-image: url(${this.content.common.careers_cover.path})`;
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
    }
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
