<template lang="pug">
  section.section.our-projects
    .section__container
      h1.subtitle.title--display.our-projects__title {{ content.common.our_projects_title }}
      .our-projects__pagination(v-if="isReady")
        pagination(:config="paginationConfig")
      mq-layout(v-if="isReady && coverStyle", mq="lg+", :style="coverStyle", :class="coverClass").our-projects__cover
      .our-projects__slider(v-if="content.our_projects")
        mq-layout(mq="lg+").our-projects__dotted
          .dots
        swiper(:options="ourProjectsSwiperOptions" ref="ourProjectsSwiper")
          swiper-slide(v-for="(project, index) in content.our_projects")
            project(:project="project", :readmore="content.common.readmore", :id="index")
        button.js-our-projects-swiper-prev.slider-button.slider-button--round.slider-button--dark.our-projects__prev
          icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
        button.js-our-projects-swiper-next.slider-button.slider-button--round.slider-button--dark.our-projects__next
          icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    .section__mountain.section__mountain--4-1.section__mountain--d-n
      icon(glyph="mountain-group-4-1")
</template>
<script>
import Project from './Project';

export default {
  name: 'OurProjects',
  components: {
    Project,
  },
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
        allowTouchMove: false,
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
    },
    currentProject() {
      return this.content.our_projects[this.ourProjectsSwiperInstance.activeIndex];
    },
    coverUrl() {
      return this.currentProject.cover 
        ? this.currentProject.cover.path
        : null;
    },
    coverStyle() {
      return this.coverUrl ? `background-image: url(${this.coverUrl})` : null;
    },
    coverClass() {
      return this.currentProject.cover_align ? `our-projects__cover--${this.currentProject.cover_align}` : null
    },
    fromLg() {
      return this.$mq === 'lg' || this.$mq === 'xl' || this.$mq === 'xxl';
    }
  },
  mounted() {
    this.isReady = true;
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.our-projects {
  &__title {
    @include global-padding;
    margin-bottom: 0 !important;
  }
  &__slider {
    position: relative;
  }
  &__pagination {
    @include global-padding;
    margin-bottom: $base;
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
    box-shadow: 0 200px 0 $color-background--dark;
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
    &--left {
      background-position: left center;
    }
    &--center {
      background-position: center center;
    }
    &--right {
      background-position: right center;
    }
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
</style>
