<template lang="pug">
  .project
    h2.title.project__title {{project.title}}
    .project__details.typographic(v-html="project.details")
    .project__readmore(@click="openProject(id)")
      | {{readmore}}
    .project__social-links
      our-projects-item-link(:link="project.vk_link", glyph="vk", :width="40", :height="40")
      our-projects-item-link(:link="project.fb_link", glyph="fb", :width="40", :height="40")
      our-projects-item-link(:link="project.ok_link", glyph="ok", :width="40", :height="40")
      our-projects-item-link(:link="project.appstore_link", glyph="app-store", :width="140", :height="40")
      our-projects-item-link(:link="project.google_play_link", glyph="google-play", :width="140", :height="40")
    .project__gallery(v-if="project.gallery.length")
      swiper(:options="projectGallerySwiperOptions")
        swiper-slide(
          v-for="(photo, index) in project.gallery"
          :key="project._id+'-photo-'+index")
          img(:src="photo.path").project__shot
      button(:class="'js-project-'+id+'-prev'").slider-button.slider-button--light.project__prev
        icon(glyph="arrow-left", :width="24", :height="24").slider-button__glyph
      button(:class="'js-project-'+id+'-next'").slider-button.slider-button--light.project__next
        icon(glyph="arrow-right", :width="24", :height="24").slider-button__glyph
</template>

<script>
import OurProjectsItemLink from '@/components/OurProjectsItemLink';

export default {
  name: 'OurProjectsItem',
  components: {
    OurProjectsItemLink,
  },
  props: {
    project: Object,
    readmore: String,
    id: Number,
  },
  data() {
    return {
      projectGallerySwiperOptions: {
        navigation: {
          prevEl: `.js-project-${this.id}-prev`,
          nextEl: `.js-project-${this.id}-next`,
        },
        loop: true,
      },
    }
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

.project {
  padding-top: $base;
  overflow: hidden;
  &__title {
    @include global-padding;
    text-shadow: 5px 5px 15px transparentize($color-background--dark, 0.9),
      7px 7px 25px transparentize($color-background--dark, 0.75);
  }
  &__details {
    @include global-padding;
    @include breakpoint("lg") {
      max-width: 380px;
    }
    text-shadow: 1px 1px 3px transparentize($color-background--dark, 0.4),
      3px 3px 5px transparentize($color-background--dark, 0.75);
  }
  &__social-links {
    @include global-padding;
  }
  &__readmore {
    display: inline-block;
    color: $color-primary;
    padding-bottom: $base;
    padding-top: $base;
    @include global-padding;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      color: $color-text;
    }
  }
  &__gallery {
    margin-top: $base;
    position: relative;
    padding-bottom: $base * 1.5;
    @include breakpoint("lg") {
      max-width: 480px;
      margin-left: $base * 4;
    }
    @include breakpoint("lg-height") {
      max-width: 380px;
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
  &__social-links {
    display: flex;
    margin-top: $base;
    @include breakpoint("lg-height") {
      margin: 0;
    }
  }
}
</style>
