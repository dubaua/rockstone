<template lang="pug">
  .animated-icon(@mouseover="play")
    .animated-icon__back
      icon(:glyph="back", :width="width", :height="height").animated-icon__glyph
    .animated-icon__front
      icon(:glyph="front", :width="width", :height="height", :class="{'animated-icon__glyph--spin': isPlaying}").animated-icon__glyph
</template>

<script>
export default {
  name: 'AnimatedIcon',
  props: {
    front: String,
    back: String,
    width: Number,
    height: Number,
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
        setTimeout(() => {
          this.isPlaying = false;
        }, 667);
      }
    },
  },
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
