<template lang="pug">
  section.section.how-we-work
    h1.title.how-we-work__title {{  content.common.how_we_work_title }}
    .how-we-work__pagination(v-if="isReady")
      pagination(:config="paginationConfig")
    .how-we-work__slider
      swiper(:options="howWeWorkSwiperOptions" ref="howWeWorkSwiper")
        swiper-slide(v-for="(principle, index) in content.how_we_work")
          .principle
            h2.subtitle.principle__title {{principle.title}}
            .principle__details.typographic(v-html="principle.details")
            .principle__icon
              animated-icon(
                :front="'principles-'+(index+1)",
                back="principles-back",
                :width="250",
                :height="250",
              )
      button.js-how-we-work-swiper-prev.slider-button.slider-button--round.slider-button--contrast.how-we-work__prev
        icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
      button.js-how-we-work-swiper-next.slider-button.slider-button--round.slider-button--contrast.how-we-work__next
        icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    .section__mountain.section__mountain--3-1.section__mountain--l-n
      icon(glyph="mountain-group-3-1")
    .section__mountain.section__mountain--3-2.section__mountain--l-n
      icon(glyph="mountain-group-3-2")
    .section__mountain.section__mountain--3-3.section__mountain--d-n
      icon(glyph="mountain-group-3-3")
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
  position: relative;
  z-index: 3;

  &__title,
  &__pagination,
  &__slider {
    padding-left: $base * 2;
    padding-right: $base * 2;
    z-index: 5;
    position: relative;
  }
  &__slider {
    z-index: 4;
  }
  &__prev {
    position: absolute;
    bottom: 108px;
    left: 0;
    z-index: 1;
  }
  &__next {
    position: absolute;
    bottom: 108px;
    right: 0;
    z-index: 1;
  }
}

.principle {
  padding: $base * 2 0;
  &__details {
    position: relative;
  }
  &__icon {
    text-align: center;
    line-height: 0;
    margin-top: $base * -1.5;
  }
}
</style>
