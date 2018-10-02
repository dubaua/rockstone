<template lang="pug">
  section.section.how-to-work-with-us
    a(name="how_to_work_with_us")
    .section__container
      h1.title.how-to-work-with-us__title(v-scroll-reveal) {{ content.common.how_to_work_with_us_title }}
      .how-to-work-with-us__details(v-html="content.common.how_to_work_with_us_content", v-scroll-reveal)
      .how-to-work-with-us__slider(v-scroll-reveal)
        swiper(:options="HowToWorkWithUsSwiperOptions", ref="HowToWorkWithUsSwiper", @init="animateSubsequent", @slideChangeTransitionEnd="animateSubsequent")
          swiper-slide(v-for="(way, index) in content.how_to_work_with_us")
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
              div(v-html="way.details").way__details
        mq-layout(mq="lg+", v-scroll-reveal).how-to-work-with-us__dots
          .dots
        button(v-scroll-reveal).js-how-to-work-with-us-swiper-prev.slider-button.slider-button--round.slider-button--dark.how-to-work-with-us__prev
          icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
        button(v-scroll-reveal).js-how-to-work-with-us-swiper-next.slider-button.slider-button--round.slider-button--dark.how-to-work-with-us__next
          icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    .section__mountain.section__mountain--5-2.section__mountain--l-n(v-scroll-reveal)
      icon(glyph="mountain-group-5-2")
    .section__mountain.section__mountain--5-1.section__mountain--l-n(v-scroll-reveal)
      icon(glyph="mountain-group-5-1")
    .section__mountain.section__mountain--5-3.section__mountain--d-n(v-scroll-reveal)
      icon(glyph="mountain-group-5-3")
    mq-layout(mq="lg+", v-scroll-reveal).scrolldown
      .scrolldown__text
        running-text(text="scroll down")
      .scrolldown__arrow
        icon(glyph="double-arrow--bottom", :width="16", :height="16")
</template>

<script>
import { EventBus } from "@/utils";

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
      isReady: false,
    }
  },
  computed: {
    HowToWorkWithUsSwiperInstance() {
      return this.$refs.HowToWorkWithUsSwiper.swiper;
    },
  },
  mounted() {
    this.isReady = true;
  },
  methods: {
    animateSubsequent() {
      const index = this.HowToWorkWithUsSwiperInstance.activeIndex;
      const count = this.HowToWorkWithUsSwiperInstance.params.slidesPerView;
      for (let i = 0; i < count; i++) {
        const delay = i * 333;
        const nextIndex = i + index;
        setTimeout(() => {
          EventBus.$emit('animateWorkIcon', nextIndex);
        }, delay);
      }
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.how-to-work-with-us {
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
}
</style>
