<template lang="pug">
  transition(:name="transitionName" @after-leave="dispatchNext")
    aside.slide-in(
      v-if="isActive",
      v-touch:swipe.top="direction === 'down' && onClose ? onClose : null",
      v-touch:swipe.left="direction === 'right' && onClose ? onClose : null",
      v-touch:swipe.right="direction === 'left' && onClose ? onClose : null",
      v-touch:swipe.bottom="direction === 'up' && onClose ? onClose : null",
      :class="[{'slide-in--wide': isWide}, directionMod]"
    )
      button.slide-in__close(@click="onClose")
        icon(glyph="close", :width="11", :height="11").slide-in__close-icon
      swiper(:options="slideInSwiperOptions" ref="slideInSwiper")
        swiper-slide
          .slide-in__content
            slot
        .js-slide-in-scrollbar.swiper-scrollbar.swiper-scrollbar-white(slot="scrollbar")
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SlideIn',
  props: {
    direction: {
      requred: true,
      type: String,
      default: 'right',
    },
    isActive: {
      requred: true,
      type: Boolean,
    },
    onClose: Function,
    isWide: Boolean,
  },
  data() {
    return {
      slideInSwiperOptions: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.js-slide-in-scrollbar',
        },
        mousewheel: true,
      },
    }
  },
  computed: {
    isMobile() {
      return this.$mq === 'mobile';
    },
    transitionName() {
      return `slide-${this.direction}`;
    },
    directionMod() {
      return `slide-in--${this.direction}`;
    },
  },
  methods: {
    ...mapActions(['dispatchNext']),
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.slide-in {
  @include fixed-overlay;

  display: flex;
  flex-direction: column;
  z-index: 10;
  color: $color-text;
  background: $color-background--dark;
  padding-top: $base * 3;
  padding-bottom: $base;

  @include breakpoint("sm") {
    right: 50%;
  }

  @include breakpoint("xl") {
    right: 66.67%;
  }

  &--left {
    @include breakpoint("sm") {
      right: 0;
      left: 50%;
    }

    @include breakpoint("xl") {
      right: 0;
      left: 66.67%;
    }
  }

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    padding: $base;
    margin: 0;
    background: none;
  }

  &__close-icon {
    fill: $color-text;
  }

  &__content {
    padding: $base * 2 $base * 3 $base * 2 $base * 2;
  }
}
</style>
