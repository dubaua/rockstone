<template lang="pug">
  section.section.our-projects
    .our-projects__cover-placeholder(
      v-for="(project, index) in content.our_projects"
      :key="project._id"
      :style="getCover(index).style",
    )
    .section__container
      transition-sequence(v-bind="getTransitionConfig(0, 4, 'ourProjects')" @transitionAnimated="showNext('ourProjects')") 
        h1.subtitle.title--display.our-projects__title {{ content.common.our_projects_title }}
      transition-sequence(v-bind="getTransitionConfig(3, 4, 'ourProjects')" @transitionAnimated="showNext('ourProjects')" :isBlocking="!isSwiperReady") 
        .our-projects__pagination(v-if="isSwiperReady")
          pagination(:config="paginationConfig")
      transition-sequence(v-bind="getTransitionConfig(4, 4, 'ourProjects')" @transitionAnimated="showNext('ourProjects')")
        mq-layout(
          v-if="isSwiperReady",
          mq="lg+",
          :style="getCover(currentProjectIndex).style",
          :class="getCover(currentProjectIndex).className").our-projects__cover
      .our-projects__slider(v-if="content.our_projects")
        transition-sequence(v-bind="getTransitionConfig(1, 4, 'ourProjects')" @transitionAnimated="showNext('ourProjects')") 
          mq-layout(mq="lg+").our-projects__dotted
            .dots
        transition-sequence(v-bind="getTransitionConfig(2, 4, 'ourProjects')" @transitionAnimated="showNext('ourProjects')") 
          swiper(:options="ourProjectsSwiperOptions", ref="ourProjectsSwiper", @ready="onSwiperInit('ourProjects')" @slideChangeTransitionEnd="onSlideChangeEnd")
            swiper-slide(
              v-for="(project, index) in content.our_projects"
              :key="project._id"
              )
              our-projects-item(:project="project", :readmore="content.common.readmore", :id="index")
        button.js-our-projects-swiper-prev.slider-button.slider-button--round.slider-button--light.our-projects__prev
          icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
        button.js-our-projects-swiper-next.slider-button.slider-button--round.slider-button--light.our-projects__next
          icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    .section__mountain.section__mountain--4-1.section__mountain--d-n
      transition-sequence(v-bind="getTransitionConfig(0, 4, 'ourProjects')" @transitionAnimated="showNext('ourProjects')") 
        icon(glyph="mountain-group-4-1")
    mq-layout(mq="lg+").scrolldown.scrolldown--above.scrolldown--accent
      .scrolldown__text
        running-text(text="scroll down")
      .scrolldown__arrow
        icon(glyph="double-arrow--bottom", :width="16", :height="16")
</template>
<script>
import OurProjectsItem from '@/components/OurProjectsItem';
import { mapGetters } from 'vuex';

export default {
  name: 'OurProjects',
  components: {
    OurProjectsItem,
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
        breakpointsInverse: true,
        breakpoints: {
          992: {
            allowTouchMove: false,
          }
        }
      },
    }
  },
  computed: {
    ...mapGetters(['getTransitionConfig']),
    ourProjectsSwiperInstance() {
      return this.$refs.ourProjectsSwiper.swiper;
    },
    paginationConfig() {
      return {
        current: this.currentProjectIndex + 1,
        divider: this.content.common.fraction_divider,
        total: this.content.our_projects.length,
      }
    },
    currentProjectIndex() {
      return this.$store.state.sections.ourProjects.currentProjectIndex;
    },
    fromLg() {
      return this.$mq === 'lg' || this.$mq === 'xl' || this.$mq === 'xxl';
    },
    isSwiperReady() {
      return this.$store.state.sections.ourProjects.isSwiperReady;
    },
  },
  methods: {
    getCover(index) {
      const url = this.content.our_projects[index].cover ? this.content.our_projects[index].cover.path : null;
      const align = this.content.our_projects[index].cover_align;
      return {
        style: `background-image: url(${url})`,
        className: `our-projects__cover--${align}`,
      };
    },
    showNext(key) {
      this.$store.commit('nextStep', { key })
    },
    onSwiperInit(key) {
      this.$store.commit('swiperReady', { key })
    },
    onSlideChangeEnd() {
      const index = this.ourProjectsSwiperInstance.activeIndex;
      this.$store.commit('setCurrentProject', { index })
    }
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
  &__cover-placeholder {
    width: 0;
    height: 0;
  }
}
</style>
