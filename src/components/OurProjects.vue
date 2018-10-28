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
          :style="getCover(currentSlideIndex).style",
          :class="getCover(currentSlideIndex).className").our-projects__cover
      .our-projects__slider(v-if="content.our_projects")
        transition-sequence(v-bind="getTransitionConfig(1, 4, 'ourProjects')" @transitionAnimated="showNext('ourProjects')") 
          mq-layout(mq="lg+").our-projects__dotted
            .dots
        transition-sequence(v-bind="getTransitionConfig(2, 4, 'ourProjects')" @transitionAnimated="showNext('ourProjects')") 
          swiper(
            :options="ourProjectsSwiperOptions"
            ref="ourProjectsSwiper"
            @ready="onSwiperInit"
            @slideChangeTransitionEnd="onSlideChangeEnd")
            swiper-slide(
              v-for="(project, index) in content.our_projects"
              :key="project._id"
              )
              our-projects-item(:project="project", :readmore="content.common.readmore", :id="index")
        button(:class="{'our-projects__prev--active': isPrevButtonVisible}").js-our-projects-swiper-prev.slider-button.slider-button--round.slider-button--light.our-projects__prev
          icon(glyph="arrow-left--square", :width="24", :height="24").slider-button__glyph
        button(:class="{'our-projects__next--active': isNextButtonVisible}").js-our-projects-swiper-next.slider-button.slider-button--round.slider-button--light.our-projects__next
          icon(glyph="arrow-right--square", :width="24", :height="24").slider-button__glyph
    parallax-scene(offset-y="-20%").section__mountain.section__mountain--4-1.section__mountain--d-n
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
          disabledClass: 'slider-button--disabled',
        },
        breakpointsInverse: true,
        breakpoints: {
          992: {
            allowTouchMove: false,
          }
        },
        loop: true,
      },
      isPrevButtonVisible: false,
      isNextButtonVisible: false,
    }
  },
  computed: {
    ...mapGetters(['getTransitionConfig']),
    paginationConfig() {
      return {
        current: this.currentSlideIndex + 1,
        divider: this.content.common.fraction_divider,
        total: this.content.our_projects.length,
      }
    },
    currentSlideIndex() {
      return this.$store.state.sections.ourProjects.currentSlideIndex;
    },
    fromLg() {
      return this.$mq === 'lg' || this.$mq === 'xl' || this.$mq === 'xxl';
    },
    isSwiperReady() {
      return this.$store.state.sections.ourProjects.isSwiperReady;
    },
  },
  methods: {
    onSwiperInit() {
      this.$store.commit('setSwiperState', { key: 'ourProjects', value: true });
      const self = this;
      setTimeout(() => {
        self.isPrevButtonVisible = true;
        setTimeout(() => {
          self.isNextButtonVisible = true;
        }, 666);
      }, 1000);
    },
    onSlideChangeEnd() {
      const index = this.$refs.ourProjectsSwiper.swiper.realIndex;
      this.$store.commit('setCurrentSlideIndex', { key: 'ourProjects', index })
    },
    showNext(key) {
      this.$store.commit('nextStep', { key })
    },
    getCover(index) {
      console.log(index);
      
      const url = this.content.our_projects[index].cover ? this.content.our_projects[index].cover.path : null;
      const align = this.content.our_projects[index].cover_align;
      return {
        style: `background-image: url(${url})`,
        className: `our-projects__cover--${align}`,
      };
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";
@import "~@/styles/easings";

.our-projects {
  @include breakpoint("lg-height") {
    &.section {
      padding-bottom: 0;
    }
  }
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
    top: 0;
    bottom: 0;
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
      background: linear-gradient(transparent, $color-background);
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
  &__prev,
  &__next {
    top: 125px;
    opacity: 0;
    transition: all $timing * 2.5 !important;
    transition-timing-function: $easeInCubic;
    transform: translate(0, $base * 2);
    @include breakpoint("lg") {
      top: 16px;
    }
  }
  &__prev {
    @include global-arrow-prev;
    &--active {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  &__next {
    @include global-arrow-next;
    &--active {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  &__cover-placeholder {
    width: 0;
    height: 0;
  }
}
</style>
