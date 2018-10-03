<template lang="pug">
  aside.page-state
    button(@click="setLanguage('ru')", :class="{'page-state__lang--active': $store.state.page.currentLanguageCode === 'ru'}").page-state__lang RU
    button(@click="setLanguage('en')", :class="{'page-state__lang--active': $store.state.page.currentLanguageCode === 'en'}").page-state__lang EN
    .page-state__stage(v-if="state.homescreen", :class="{'page-state__stage--active': state.homescreen.isInViewport}") 01
    .page-state__stage(v-if="state.who_we_are", :class="{'page-state__stage--active': state.who_we_are.isInViewport}") 02
    .page-state__stage(v-if="state.how_we_work", :class="{'page-state__stage--active': state.how_we_work.isInViewport}") 03
    .page-state__stage(v-if="state.our_projects", :class="{'page-state__stage--active': state.our_projects.isInViewport}") 04
    .page-state__stage(v-if="state.how_to_work_with_us", :class="{'page-state__stage--active': state.how_to_work_with_us.isInViewport}") 05
    .page-state__stage(v-if="state.careers", :class="{'page-state__stage--active': state.careers.isInViewport}") 06
    .page-state__stage(v-if="state.contact", :class="{'page-state__stage--active': state.contact.isInViewport}") 07
    .page-state__music
      the-player
</template>

<script>
import ThePlayer from '@/components/ThePlayer';

export default {
  name: 'PageState',
  components: {
    ThePlayer,
  },
  props: {
    state: Object,
  },
  methods: {
    setLanguage(languageCode) {
      this.$store.dispatch('setByKey', {key: 'currentLanguageCode', value: languageCode})
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.page-state {
  @include fixed-overlay;
  left: auto;
  right: 27px;
  width: 26px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 28px 0;
  font-size: 12px;

  &__lang {
    color: white;
    padding: 5px 3px;
    border: 1px solid transparent;
    background: none;
    border-radius: 50%;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &--active {
      border-color: white;
    }
  }
  &__stage {
    font-weight: 700;
    letter-spacing: 0.05em;
    position: relative;

    &--active:before {
      content: "";
      background: $color-text;
      height: $base * 0.5;
      width: $base * 0.4;
      position: absolute;
      display: block;
      border-radius: 50%;
      top: $base * 0.15;
      left: $base * 0.05;
    }
  }
  &__music {
    fill: white;
  }
}
</style>
