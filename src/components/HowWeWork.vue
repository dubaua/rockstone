<template lang="pug">
  section.how-we-work
    h1.title.how-we-work__title {{  content.common.how_we_work_title }}
    swiper(:options="howWeWorkSwiperOptions" ref="howWeWorkSwiper")
      swiper-slide(v-for="principle in content.how_we_work")
        .principle
          h2.principle__title {{principle.title}}
          div(v-html="principle.details").principle__details
      button(slot="button-prev").js-how-we-work-swiper-prev prev
      button(slot="button-next").js-how-we-work-swiper-next next
    
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
      } 
    }
  }
}
</script>

<style lang="scss">
</style>
