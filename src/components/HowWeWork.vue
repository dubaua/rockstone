<template lang="pug">
  section.section.how-we-work
    a(name="how_we_work")
    .section__container
      transition-sequence(v-bind="getTransitionConfig(2, 4, 'howWeWork')" @transitionAnimated="showNext('howWeWork')")
        h1.title.how-we-work__title {{  content.common.how_we_work_title }}
      transition-sequence(v-bind="getTransitionConfig(3, 4, 'howWeWork')" @transitionAnimated="showNext('howWeWork')")
        .how-we-work__dotted
          .dots
      .how-we-work__slider
        transition-sequence(v-bind="getTransitionConfig(3, 4, 'howWeWork')" @transitionAnimated="showNext('howWeWork')" :isBlocked="!isSwiperReady")
          .how-we-work__pagination(v-if="isSwiperReady")
            pagination(:config="paginationConfig")
        transition-sequence(v-bind="getTransitionConfig(4, 4, 'howWeWork')")
          swiper(:options="howWeWorkSwiperOptions", ref="howWeWorkSwiper", @ready="onSwiperInit('howWeWork')" @slideChangeTransitionEnd="onSlideChangeEnd")
            swiper-slide(
              v-for="(principle, index) in content.how_we_work"
              :key="principle._id"
              )
              .principle
                .principle__about(data-swiper-parallax="-400", data-swiper-parallax-opacity="0")
                  h2.subtitle.principle__title {{principle.title}}
                  .principle__details.typographic(v-html="principle.details")
                .principle__icon(data-swiper-parallax="-800", data-swiper-parallax-opacity="0")
                  animated-icon(
                    :front="'principles-'+(index+1)",
                    back="principles-back",
                    :width="iconSize",
                    :height="iconSize",
                    :id="index",
                  )
        transition-sequence(v-bind="getTransitionConfig(3, 4, 'howWeWork')")
          button.js-how-we-work-swiper-prev.slider-button.slider-button--round.slider-button--dark.how-we-work__prev
            icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
        transition-sequence(v-bind="getTransitionConfig(3, 4, 'howWeWork')")
          button.js-how-we-work-swiper-next.slider-button.slider-button--round.slider-button--dark.how-we-work__next
            icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    parallax-scene(offset-y="-6%").section__mountain.section__mountain--3-2.section__mountain--l-n
      transition-sequence(v-bind="getTransitionConfig(0, 4, 'howWeWork')" @transitionAnimated="showNext('howWeWork')")
        icon(glyph="mountain-group-3-2")
    parallax-scene(offset-y="-12%").section__mountain.section__mountain--3-1.section__mountain--l-n
      transition-sequence(v-bind="getTransitionConfig(1, 4, 'howWeWork')" @transitionAnimated="showNext('howWeWork')")
        icon(glyph="mountain-group-3-1")
</template>

<script>
import { EventBus } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'HowWeWork',
  props: {
    content: Object,
  },
  data() {
    return {
      howWeWorkSwiperOptions: {
        speed: 1000,
        spaceBetween: 0,
        navigation: {
          prevEl: '.js-how-we-work-swiper-prev',
          nextEl: '.js-how-we-work-swiper-next',
          disabledClass: 'slider-button--disabled',
        },
        parallax: true,
      },
      isReady: false,
    }
  },
  computed: {
    ...mapGetters(['getTransitionConfig']),
    howWeWorkSwiperInstance() {
      return this.$refs.howWeWorkSwiper.swiper;
    },
    paginationConfig() {
      return {
        current: this.currentSlideIndex + 1,
        divider: this.content.common.fraction_divider,
        total: this.content.how_we_work.length,
      }
    },
    currentSlideIndex() {
      return this.$store.state.sections.howWeWork.currentSlideIndex;
    },
    iconSize() {
      const _config = {
        xs: 250,
        sm: 250,
        md: 250,
        lg: 350,
        xl: 465,
      }
      return _config[this.$mq];
    },
    fromLg() {
      return this.$mq === 'lg' || this.$mq === 'xl' || this.$mq === 'xxl';
    },
    isSwiperReady() {
      return this.$store.state.sections.howWeWork.isSwiperReady;
    },
  },
  methods: {
    onSlideChangeEnd() {
      const index = this.howWeWorkSwiperInstance.activeIndex;
      this.$store.commit('setHowWeWorkSlideProject', { index });
      EventBus.$emit('animateWorkIcon', index);
    },
    showNext(key) {
      this.$store.commit('nextStep', { key })
    },
    onSwiperInit(key) {
      this.$store.commit('swiperReady', { key })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.how-we-work {
  &.section {
    min-height: 88vh;
  }
  @include breakpoint("lg") {
    padding-top: 25vh !important;
  }
  &__title,
  &__slider {
    position: relative;
    z-index: 1;
    @include global-padding;
  }
  &__pagination {
    @include breakpoint("lg") {
      top: 13px;
      padding-left: 0;
      position: absolute;
    }
  }
  &__slider {
    position: relative;
    z-index: 0;
    min-height: 460px;
    @include breakpoint("lg") {
      min-height: 0;
    }
    .swiper-container {
      overflow: visible;
    }
  }
  &__prev {
    @include global-arrow-prev;
    bottom: 102px;
    @include breakpoint("sm") {
      bottom: auto;
      top: 42px;
    }
    @include breakpoint("lg") {
      top: -25px;
    }
  }
  &__next {
    @include global-arrow-next;
    bottom: 102px;
    @include breakpoint("sm") {
      bottom: auto;
      top: 42px;
    }
    @include breakpoint("lg") {
      top: -25px;
    }
  }
  &__dotted {
    height: 2px;
    @include global-padding;
  }
}

.principle {
  padding-top: $base * 2;
  position: relative;
  min-height: 400px;
  @include breakpoint("sm") {
    min-height: 240px;
  }
  @include breakpoint("lg") {
    padding: $base 0;
  }
  &__about {
    @include breakpoint("lg") {
      margin-left: 64px;
    }
    max-width: 250px;
  }
  &__details {
    position: relative;
    z-index: 1;
  }
  &__icon {
    text-align: center;
    line-height: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    @include breakpoint("sm") {
      left: 195px;
      bottom: auto;
      top: -59px;
    }
    @include breakpoint("md") {
      left: 0;
    }
    @include breakpoint("lg") {
      top: -195px;
    }
    @include breakpoint("xl") {
      top: -254px;
    }
  }
}
</style>
