<template lang="pug">
  section.section.how-we-work
    .section__container
      transition-sequence(v-bind="getTransitionConfig(2, 4, 'howWeWork')" @transitionAnimated="showNext('howWeWork')")
        h1.title.how-we-work__title {{ currentLanguage.common.how_we_work_title }}
      transition-sequence(v-bind="getTransitionConfig(3, 4, 'howWeWork')" @transitionAnimated="showNext('howWeWork')")
        .how-we-work__dotted
          .dots
      .how-we-work__slider
        transition-sequence(v-bind="getTransitionConfig(3, 4, 'howWeWork')" @transitionAnimated="showNext('howWeWork')" :isBlocked="!isSwiperReady")
          .how-we-work__pagination(v-if="isSwiperReady")
            pagination(:config="paginationConfig")
        transition-sequence(v-bind="getTransitionConfig(4, 4, 'howWeWork')")
          swiper(
            :options="howWeWorkSwiperOptions"
            ref="howWeWorkSwiper"
            @ready="onSwiperInit"
            @slideChangeTransitionEnd="onSlideChangeEnd")
            swiper-slide(
              v-for="(principle, index) in content.howWeWork"
              :key="principle._id"
              )
              .principle
                .principle__about(data-swiper-parallax="-400", data-swiper-parallax-opacity="0")
                  h2.subtitle.principle__title.hidden-en {{principle.title_ru}}
                  h2.subtitle.principle__title.hidden-ru {{principle.title_en}}
                  .principle__details.typographic.hidden-en(v-html="principle.details_ru")
                  .principle__details.typographic.hidden-ru(v-html="principle.details_en")
                .principle__icon(data-swiper-parallax="-800", data-swiper-parallax-opacity="0")
                  animated-icon(
                    :front="'principles-'+(index+1)",
                    back="principles-back",
                    :width="iconSize",
                    :height="iconSize",
                    :id="'howWeWork-'+index",
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
    mq-layout(mq="lg+").scrolldown
      .scrolldown__text
        running-text(text="scroll down")
      .scrolldown__arrow
        icon(glyph="double-arrow--bottom", :width="16", :height="16")
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
        loop: true,
      },
      isReady: false,
    }
  },
  computed: {
    ...mapGetters(['getTransitionConfig']),
    paginationConfig() {
      return {
        current: this.$store.state.sections.howWeWork.currentSlideIndex + 1,
        divider: this.content[this.$store.state.page.currentLanguageCode].common.fraction_divider,
        total: this.content.howWeWork.length,
      }
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
    currentLanguage() {
      return this.content[this.$store.state.page.currentLanguageCode];
    },
  },
  methods: {
    onSwiperInit() {
      this.animateIcon(0);
      this.$store.commit('setSwiperState', { key: 'howWeWork', value: true })
    },
    onSlideChangeEnd() {
      const index = this.$refs.howWeWorkSwiper.swiper.realIndex;
      this.$store.commit('setCurrentSlideIndex', { key: 'howWeWork', index });
      this.animateIcon(index);
    },
    animateIcon(index) {
      EventBus.$emit('animateWorkIcon', `howWeWork-${index}`);
    },
    showNext(key) {
      this.$store.commit('nextStep', { key })
    },
  }
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.how-we-work {
  &.section {
    @include breakpoint("lg") {
      padding-top: 37vh;
    }
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
    position: relative;
    z-index: 1;
    max-width: 300px;
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
