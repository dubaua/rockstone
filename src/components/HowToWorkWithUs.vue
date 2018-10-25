<template lang="pug">
  section.section.how-to-work-with-us
    .section__container
      transition-sequence(v-bind="getTransitionConfig(3, 5, 'howToWorkWithUs')" @transitionAnimated="showNext('howToWorkWithUs')")
        h1.title.how-to-work-with-us__title {{ content.common.how_to_work_with_us_title }}
      transition-sequence(v-bind="getTransitionConfig(4, 5, 'howToWorkWithUs')" @transitionAnimated="showNext('howToWorkWithUs')")
        .how-to-work-with-us__details.typographic(v-html="content.common.how_to_work_with_us_content")
      transition-sequence(v-bind="getTransitionConfig(5, 5, 'howToWorkWithUs')" @transitionAnimated="showNext('howToWorkWithUs')")
        .how-to-work-with-us__slider
          swiper(
            :options="HowToWorkWithUsSwiperOptions"
            ref="HowToWorkWithUsSwiper"
            @ready="onSwiperInit"
            @slideChangeTransitionEnd="onSlideChangeEnd")
            swiper-slide(
              v-for="(way, index) in content.how_to_work_with_us"
              :key="way._id")
              .way
                .way__icon
                  animated-icon(
                    :front="'work-'+(index+1)",
                    back="work-back",
                    :width="250",
                    :height="250",
                    :id="index",
                  )
                h2.subtitle.way__title {{way.title}}
                div(v-html="way.details").way__details.typographic
          mq-layout(mq="lg+").how-to-work-with-us__dots
            .dots
          button.js-how-to-work-with-us-swiper-prev.slider-button.slider-button--round.slider-button--dark.how-to-work-with-us__prev
            icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
          button.js-how-to-work-with-us-swiper-next.slider-button.slider-button--round.slider-button--dark.how-to-work-with-us__next
            icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    parallax-scene(offset-y="-6%").section__mountain.section__mountain--5-2.section__mountain--l-n
      transition-sequence(v-bind="getTransitionConfig(0, 5, 'howToWorkWithUs')" @transitionAnimated="showNext('howToWorkWithUs')")
        icon(glyph="mountain-group-5-2")
    parallax-scene(offset-y="-12%").section__mountain.section__mountain--5-1.section__mountain--l-n
      transition-sequence(v-bind="getTransitionConfig(1, 5, 'howToWorkWithUs')" @transitionAnimated="showNext('howToWorkWithUs')")
        icon(glyph="mountain-group-5-1")
    parallax-scene(offset-y="-20%").section__mountain.section__mountain--5-3.section__mountain--d-n
      transition-sequence(v-bind="getTransitionConfig(2, 5, 'howToWorkWithUs')" @transitionAnimated="showNext('howToWorkWithUs')")
        icon(glyph="mountain-group-5-3")
    mq-layout(mq="lg+").scrolldown
      .scrolldown__text
        running-text(text="scroll down")
      .scrolldown__arrow
        icon(glyph="double-arrow--bottom", :width="16", :height="16")
</template>

<script>
import { EventBus } from "@/utils";
import { mapGetters } from 'vuex';

export default {
  name: 'HowToWorkWithUs',
  props: {
    content: Object,
  },
  data() {
    return {
      HowToWorkWithUsSwiperOptions: {
        navigation: {
          prevEl: '.js-how-to-work-with-us-swiper-prev',
          nextEl: '.js-how-to-work-with-us-swiper-next',
          disabledClass: 'slider-button--disabled',
        },
        speed: 450,
        slidesPerView: 1,
        breakpointsInverse: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          }
        }
      },
    }
  },
  computed: {
    ...mapGetters(['getTransitionConfig']),
  },
  methods: {
    onSwiperInit() {
      this.$store.commit('setSwiperState', { key: 'howToWorkWithUs', value: false })
      this.animateSubsequent(0);
    },
    onSlideChangeEnd() {
      const index = this.$refs.HowToWorkWithUsSwiper.swiper.activeIndex;
      this.$store.commit('setCurrentSlideIndex', { key: 'howToWorkWithUs', index });
      this.animateSubsequent(index);
    },
    showNext(key) {
      this.$store.commit('nextStep', { key })
    },
    animateSubsequent(index) {
      let count;
      switch (this.$mq) {
        case 'xs':
        case 'sm':
        default:
          count = 1;
          break;
        case 'md':
          count = 2;
          break;
        case 'lg':
        case 'xl':
          count = 3;
          break;
      }
      for (let i = 0; i < count; i++) {
        const delay = i * 333;
        const nextIndex = i + index;
        setTimeout(() => {
          EventBus.$emit('animateWorkIcon', nextIndex);
        }, delay);
      }
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.how-to-work-with-us {
  &.section {
    min-height: 130vh;
  }
  position: relative;
  z-index: 3;

  &__title,
  &__pagination,
  &__details,
  &__slider {
    @include global-padding;
    z-index: 5;
    position: relative;
  }

  &__details {
    max-width: 600px;
  }

  &__dots {
    @include global-padding;
    position: absolute;
    z-index: -1;
    top: 172px;
    left: 0;
    right: 0;
    @include breakpoint("lg") {
      top: 140px;
    }
  }

  &__prev {
    @include global-arrow-prev;
    top: 149px;
    @include breakpoint("lg") {
      top: 117px;
    }
  }
  &__next {
    @include global-arrow-next;
    top: 149px;
    @include breakpoint("lg") {
      top: 117px;
    }
  }
}
.way {
  margin: auto;
  max-width: 250px;
  padding: $base * 3 0;

  @include breakpoint("lg") {
    padding-top: $base;
  }
  &__icon {
    margin-bottom: $base;
  }
  @include breakpoint("lg-height") {
    &__icon {
      width: 175px;
      height: 175px;
    }
  }
}
</style>
