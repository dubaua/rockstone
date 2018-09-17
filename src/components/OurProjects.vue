<template lang="pug">
  section.our-projects
    h1.title.our-projects__title {{ content.common.our_projects_title }}
    .our-projects__pagination
      span(v-if="isReady") {{ourProjectsSwiperInstance.activeIndex + 1}}
      | {{content.common.fraction_divider}}
      span() {{content.our_projects.length}}
    swiper(:options="ourProjectsSwiperOptions" ref="ourProjectsSwiper")
      swiper-slide(v-for="work in content.our_projects")
        .work
          h2.work__title {{work.title}}
          .work__details(v-html="work.details")
          .work__gallery
            swiper(:options="workGallerySwiperOptions" ref="workGallerySwiper")
              swiper-slide(v-for="photo in work.gallery")
                img(:src="photo.path").work__shot
              button(slot="button-prev").js-work-gallery-swiper-prev prev
              button(slot="button-next").js-work-gallery-swiper-next next
          .work__cover
            img(:src="work.gallery[0].path" :alt="work.title")
          .work__social-links
            a.work__link(:href="work.vk_link") VK
            a.work__link(:href="work.fb_link") FB
            a.work__link(:href="work.ok_link") OK
      button(slot="button-prev").js-our-projects-swiper-prev prev
      button(slot="button-next").js-our-projects-swiper-next next

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
