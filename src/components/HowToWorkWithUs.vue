<template lang="pug">
  section.section.how-to-work-with-us
    h1.title.how-to-work-with-us__title {{ content.common.how_to_work_with_us_title }}
    .how-to-work-with-us__pagination(v-if="isReady")
      pagination(:config="paginationConfig")
    .how-to-work-with-us__details(v-html="content.common.how_to_work_with_us_content")
    swiper(:options="HowToWorkWithUsSwiperOptions" ref="HowToWorkWithUsSwiper")
      swiper-slide(v-for="way in content.how_to_work_with_us")
        .way
          h2.subtitle.way__title {{way.title}}
          div(v-html="way.details").way__details
      button(slot="button-prev").js-how-to-work-with-us-swiper-prev.slider-button.slider-button--round.slider-button--contrast
        icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
      button(slot="button-next").js-how-to-work-with-us-swiper-next.slider-button.slider-button--round.slider-button--contrast
        icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    
</template>

<script>
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
        slidesPerView: 3,
        breakpoints: {
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
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
    paginationConfig() {
      return {
        current: this.HowToWorkWithUsSwiperInstance.activeIndex + 1,
        divider: this.content.common.fraction_divider,
        total: this.content.how_to_work_with_us.length,
      }
    }
  },
  mounted() {
    this.isReady = true;
  }
}
</script>

<style lang="scss">
</style>
