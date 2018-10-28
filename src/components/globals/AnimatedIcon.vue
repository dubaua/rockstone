<template lang="pug">
  .animated-icon(@click="play" @mouseenter="play")
    .animated-icon__back
      icon(
        :glyph="back"
        :width="width"
        :height="height").animated-icon__glyph
    .animated-icon__front
      icon(
        :glyph="front"
        :width="width"
        :height="height"
        :data-icon-id="id").animated-icon__glyph.js-animated-icon
</template>

<script>
// todo extract animated icon as presentational component
import { EventBus } from '@/utils';

export default {
  name: 'AnimatedIcon',
  props: {
    front: String,
    back: String,
    width: Number,
    height: Number,
    id: String,
  },
  data() {
    return {
      isPlaying: false,
    }
  },
  methods: {
    play() {
      if (!this.isPlaying) {
        this.isPlaying = true;
        const activeClassName = 'animated-icon__glyph--spin';
        const icons = Array.from(document.getElementsByClassName('js-animated-icon'))
        const activeIcons = icons.filter(icon => icon.dataset.iconId === this.id);
        activeIcons.forEach(icon => {
          icon.classList.add(activeClassName);
        });
        setTimeout(() => {
          this.isPlaying = false;
          activeIcons.forEach(icon => {
            icon.classList.remove(activeClassName);
          });
        }, 667);
      }
    },
  },
  mounted () {
    var self = this;
    EventBus.$on('animateWorkIcon', function (index) {
      if (self.id === index) self.play();
    });
  }
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.animated-icon {
  $block: &;
  display: inline-block;
  max-width: 100%;
  line-height: 0;
  position: relative;
  perspective: 800px;

  &__front {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  &__glyph {
    fill: $color-primary;
    &--spin {
      animation: spin 0.667s ease-in-out;
    }
  }
}
@keyframes spin {
  100% {
    transform: rotateY(360deg);
  }
}
</style>
