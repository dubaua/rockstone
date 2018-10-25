<template lang="pug">
  transition(:name="transitionName" @after-leave="dispatchNext")
    aside(
      v-if="isActive",
      v-touch:swipe.top="direction === 'down' && onClose ? onClose : null",
      v-touch:swipe.left="direction === 'right' && onClose ? onClose : null",
      v-touch:swipe.right="direction === 'left' && onClose ? onClose : null",
      v-touch:swipe.bottom="direction === 'up' && onClose ? onClose : null",
      :class="[{'slide-in--wide': isWide}, directionMod]"
    ).slide-in.js-prevent-scroll
      button.slide-in__close(v-if="!noClose", @click="onClose")
        icon(glyph="close", :width="11", :height="11").slide-in__close-icon
      .slide-in__content(v-if="noScroll")
        slot
      swiper(v-else :options="slideInSwiperOptions" ref="slideInSwiper")
        swiper-slide
          .slide-in__content
            slot
        .js-slide-in-scrollbar.swiper-scrollbar.swiper-scrollbar-white(slot="scrollbar")
</template>

<script>
import { mapActions } from 'vuex';
import { EventBus } from "@/utils";

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
    noClose: Boolean,
    noScroll: Boolean,
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
  mounted () {
    var self = this;
    EventBus.$on('resetScroller', function () {
      if (self.$refs.slideInSwiper) {
       self.$refs.slideInSwiper.swiper.slideReset(300);
      }
    });
  }
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

  &--wide {
    @include breakpoint("sm") {
      right: 0;
      left: 0;
    }

    @include breakpoint("xl") {
      right: 0;
      left: 0;
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
    padding: 0 $base * 3 0 $base * 2;
    @include breakpoint("lg") {
      padding: $base * 2 $base * 3 $base * 2 $base * 2;
    }
  }
}
</style>
