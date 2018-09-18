<template lang="pug">
  section.how-to-work-with-us
    h1.title.how-to-work-with-us__title {{ content.common.how_to_work_with_us_title }}
    .how-to-work-with-us__details(v-html="content.common.how_to_work_with_us_content")
    swiper(:options="HowToWorkWithUsSwiperOptions" ref="HowToWorkWithUsSwiper")
      swiper-slide(v-for="way in content.how_to_work_with_us")
        .way
          h2.way__title {{way.title}}
          div(v-html="way.details").way__details
      button(slot="button-prev").js-how-to-work-with-us-swiper-prev prev
      button(slot="button-next").js-how-to-work-with-us-swiper-next next
    
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
            spaceBetween: 0
          },
          1024: {
            slidesPerView: 2,
          }
        }
      } 
    }
  }
}
</script>

<style lang="scss">
</style>
