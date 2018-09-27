<template lang="pug">
  aside.page-state
    button(@click="setLanguage('ru')", :class="{'page-state__lang--active': $store.state.page.currentLanguageCode === 'ru'}").page-state__lang RU
    button(@click="setLanguage('en')", :class="{'page-state__lang--active': $store.state.page.currentLanguageCode === 'en'}").page-state__lang EN
    .page-state__stage 01
    .page-state__stage 02
    .page-state__stage 03
    .page-state__stage 04
    .page-state__stage 05
    .page-state__stage 06
    .page-state__stage 07
    .page-state__music
      player
</template>

<script>
import Player from '@/components/Player';

export default {
  name: 'PageState',
  components: {
    Player,
  },
  props: {
    content: Object,
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
  }
  &__music {
    fill: white;
  }
}
</style>
