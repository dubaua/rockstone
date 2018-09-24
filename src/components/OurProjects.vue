<template lang="pug">
  section.section.our-projects
    .section__container
      h1.subtitle.title--display.our-projects__title {{ content.common.our_projects_title }}
      .our-projects__pagination(v-if="isReady")
        pagination(:config="paginationConfig")
      mq-layout(v-if="isReady && coverStyle", mq="lg+", :style="coverStyle").our-projects__cover
      .our-projects__slider(v-if="content.our_projects")
        mq-layout(mq="lg+").our-projects__dotted
          .dots
        swiper(:options="ourProjectsSwiperOptions" ref="ourProjectsSwiper")
          swiper-slide(v-for="(work, index) in content.our_projects")
            .work
              h2.title.work__title {{work.title}}
              .work__details.typographic(v-html="work.details")
              .work__readmore(@click="openProject(index)")
                | {{content.common.readmore}}
              .work__social-links
                work-link(:link="work.vk_link", glyph="vk", :width="40", :height="40")
                work-link(:link="work.fb_link", glyph="fb", :width="40", :height="40")
                work-link(:link="work.ok_link", glyph="ok", :width="40", :height="40")
                work-link(:link="work.appstore_link", glyph="app-store", :width="140", :height="40")
                work-link(:link="work.google_play_link", glyph="google-play", :width="140", :height="40")
              .work__gallery(v-if="work.gallery.length")
                swiper(:options="workGallerySwiperOptions" ref="workGallerySwiper")
                  swiper-slide(v-for="photo in work.gallery")
                    img(:src="photo.path").work__shot
                button(slot="button-prev").js-work-gallery-swiper-prev.slider-button.slider-button--light.work__prev
                  icon(glyph="arrow-left", :width="24", :height="24").slider-button__glyph
                button(slot="button-next").js-work-gallery-swiper-next.slider-button.slider-button--light.work__next
                  icon(glyph="arrow-right", :width="24", :height="24").slider-button__glyph
        button(:class="{'slider-button--dark': fromLg}").js-our-projects-swiper-prev.slider-button.slider-button--round.our-projects__prev
          icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
        button(:class="{'slider-button--dark': fromLg}").js-our-projects-swiper-next.slider-button.slider-button--round.our-projects__next
          icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    .section__mountain.section__mountain--4-1.section__mountain--d-n
      icon(glyph="mountain-group-4-1")
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
    workGallerySwiperInstance() {
      return this.$refs.workGallerySwiper[this.ourProjectsSwiperInstance.activeIndex].swiper;
    },
    paginationConfig() {
      return {
        current: this.ourProjectsSwiperInstance.activeIndex + 1,
        divider: this.content.common.fraction_divider,
        total: this.content.our_projects.length,
      }
    },
    currentProjectIndex() {
      return this.ourProjectsSwiperInstance.activeIndex;
    },
    coverUrl() {
      return this.content.our_projects[this.currentProjectIndex].cover 
        ? this.content.our_projects[this.currentProjectIndex].cover.path
        : null;
    },
    coverStyle() {
      return this.coverUrl ? `background-image: url(${this.coverUrl})` : null;
    },
    fromLg() {
      return this.$mq === 'lg' || this.$mq === 'xl' || this.$mq === 'xxl';
    }
  },
  mounted() {
    this.isReady = true;
    
  },
  methods: {
    openProject(index) {
      this.$store.dispatch('setByKey', {key: 'isProjectOpen', value: true});
      this.$store.dispatch('setByKey', {key: 'currentProject', value: index});
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.our-projects {
  &__title,
  &__pagination {
    @include global-padding;
    margin-bottom: $base;
  }
  &__slider {
    position: relative;
  }
  &__pagination {
    @include breakpoint("lg") {
      position: absolute;
      padding: 0;
      top: 198px;
    }
  }
  &__dotted {
    @include global-padding;
    position: absolute;
    left: 0;
    right: 0;
    top: 39px;
  }
  &__cover {
    position: absolute;
    top: 10vh;
    bottom: -20vh;
    right: 0;
    left: 50%;
    z-index: 0;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    @include breakpoint("xl") {
      left: 42%;
    }
    &:before {
      content: "";
      position: absolute;
      bottom: -1px;
      right: 0;
      left: 0;
      background: linear-gradient(transparent, $color-background--dark);
      height: 38%;
    }
    box-shadow: 0 200px 0 $color-background--dark;
  }
  &__prev {
    @include global-arrow-prev;
    top: 125px;
    @include breakpoint("lg") {
      top: 16px;
    }
  }
  &__next {
    @include global-arrow-next;
    top: 125px;
    @include breakpoint("lg") {
      top: 16px;
    }
  }
}
.work {
  overflow: hidden;
  &__title {
    @include global-padding;
  }
  &__details {
    @include global-padding;
    @include breakpoint("lg") {
      max-width: 360px;
    }
  }
  &__social-links {
    @include global-padding;
  }
  &__readmore {
    color: $color-primary;
    padding-bottom: $base;
    padding-top: $base;
    @include global-padding;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    font-weight: 700;
  }
  &__gallery {
    margin-top: $base;
    position: relative;
    padding-bottom: $base * 1.5;
    @include breakpoint("lg") {
      max-width: 480px;
      margin-left: $base * 4;
    }
  }
  &__prev {
    position: absolute;
    z-index: 6;
    bottom: 0;
    left: $base * 2;
    transform: translate(0, 0);
  }
  &__next {
    position: absolute;
    z-index: 6;
    bottom: 0;
    left: $base * 2;
    transform: translate(120%, 0);
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
    display: flex;
    margin-top: $base;
  }
}
</style>
