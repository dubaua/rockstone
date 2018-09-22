<template lang="pug">
  section.section.our-projects
    h1.subtitle.title--display.our-projects__title {{ content.common.our_projects_title }}
    .our-projects__pagination(v-if="isReady")
      pagination(:config="paginationConfig")
    swiper(:options="ourProjectsSwiperOptions" ref="ourProjectsSwiper")
      swiper-slide(v-for="work in content.our_projects")
        .work
          h2.title.work__title {{work.title}}
          .work__details.typographic(v-html="work.details")
          .work__gallery
            swiper(:options="workGallerySwiperOptions" ref="workGallerySwiper")
              swiper-slide(v-for="photo in work.gallery")
                img(:src="photo.path").work__shot
              button(slot="button-prev").js-work-gallery-swiper-prev.slider-button
                icon(glyph="arrow-left", :width="24", :height="24").slider-button__glyph
              button(slot="button-next").js-work-gallery-swiper-next.slider-button
                icon(glyph="arrow-right", :width="24", :height="24").slider-button__glyph
          .work__cover
            img(:src="work.gallery[0].path" :alt="work.title")
          .work__social-links
            a.work__link(:href="work.vk_link") VK
            a.work__link(:href="work.fb_link") FB
            a.work__link(:href="work.ok_link") OK
      button(slot="button-prev").js-our-projects-swiper-prev.slider-button.slider-button--round
        icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
      button(slot="button-next").js-our-projects-swiper-next.slider-button.slider-button--round
        icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
</template>

<script>
export default {
  name: 'OurProjects',
  props: {
    content: Object,
  },
  data() {
    return {
      ourProjectsSwiperOptions: {
        navigation: {
          prevEl: '.js-our-projects-swiper-prev',
          nextEl: '.js-our-projects-swiper-next',
        },
      },
      workGallerySwiperOptions: {
        navigation: {
          prevEl: '.js-work-gallery-swiper-prev',
          nextEl: '.js-work-gallery-swiper-next',
        },
      },
      isReady: false,
    }
  },
  computed: {
    ourProjectsSwiperInstance() {
      return this.$refs.ourProjectsSwiper.swiper;
    },
    paginationConfig() {
      return {
        current: this.ourProjectsSwiperInstance.activeIndex + 1,
        divider: this.content.common.fraction_divider,
        total: this.content.our_projects.length,
      }
    }
  },
  mounted() {
    this.isReady = true;
  }
}
</script>

<style lang="scss">
.work {
  &__title {
  }
  &__details {
  }
  &__gallery {
  }
  &__shot {
    max-width: 100%;
    height: auto;
  }
  &__cover {
    & img {
      max-width: 100%;
      height: auto;
    }
  }
  &__social-links {
  }
  &__link {
  }
}
</style>
