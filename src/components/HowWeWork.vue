<template lang="pug">
  section.section.how-we-work
    .section__container
      h1.title.how-we-work__title {{  content.common.how_we_work_title }}
      mq-layout(mq="lg+").how-we-work__dotted
        .dots
      .how-we-work__pagination(v-if="isReady")
        pagination(:config="paginationConfig")
      .how-we-work__slider
        swiper(:options="howWeWorkSwiperOptions" ref="howWeWorkSwiper")
          swiper-slide(v-for="(principle, index) in content.how_we_work")
            .principle
              .principle__about
                h2.subtitle.principle__title {{principle.title}}
                .principle__details.typographic(v-html="principle.details")
              .principle__icon
                animated-icon(
                  :front="'principles-'+(index+1)",
                  back="principles-back",
                  :width="iconSize",
                  :height="iconSize",
                )
        button(:class="{'slider-button--dark': fromLg}").js-how-we-work-swiper-prev.slider-button.slider-button--round.how-we-work__prev
          icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
        button(:class="{'slider-button--dark': fromLg}").js-how-we-work-swiper-next.slider-button.slider-button--round.how-we-work__next
          icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    .section__mountain.section__mountain--3-2.section__mountain--l-n
      icon(glyph="mountain-group-3-2")
    .section__mountain.section__mountain--3-1.section__mountain--l-n
      icon(glyph="mountain-group-3-1")
</template>

<script>
export default {
  name: 'HowWeWork',
  props: {
    content: Object,
  },
  data() {
    return {
      howWeWorkSwiperOptions: {
        spaceBetween:  1000,
        navigation: {
          prevEl: '.js-how-we-work-swiper-prev',
          nextEl: '.js-how-we-work-swiper-next',
        },
      },
      isReady: false,
    }
  },
  computed: {
    howWeWorkSwiperInstance() {
      return this.$refs.howWeWorkSwiper.swiper;
    },
    paginationConfig() {
      return {
        current: this.howWeWorkSwiperInstance.activeIndex + 1,
        divider: this.content.common.fraction_divider,
        total: this.content.how_we_work.length,
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
    }
  },
  mounted() {
    this.isReady = true;
  }
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.how-we-work {
  &.section {
    min-height: 50vh;
  }
  @include breakpoint("lg") {
    padding-top: 25vh !important;
  }
  &__title,
  &__pagination,
  &__slider {
    position: relative;
    z-index: 1;
    @include global-padding;
  }
  &__pagination {
    @include breakpoint("lg") {
      top: 33px;
    }
  }
  &__slider {
    position: relative;
    z-index: 0;
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
      top: -45px;
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
      top: -45px;
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
    margin-top: $base * -1.5;
    @include breakpoint("sm") {
      position: absolute;
      bottom: 0;
      left: 195px;
      right: 0;
    }
    @include breakpoint("md") {
      left: 0;
    }
    @include breakpoint("lg") {
      bottom: auto;
      top: -172px;
    }
    @include breakpoint("xl") {
      top: -230px;
    }
  }
}
</style>
