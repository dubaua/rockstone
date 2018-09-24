<template lang="pug">
  aside.progress
    button(@click="setLanguage('ru')", :class="{'progress__lang--active': $store.state.page.currentLanguageCode === 'ru'}").progress__lang RU
    button(@click="setLanguage('en')", :class="{'progress__lang--active': $store.state.page.currentLanguageCode === 'en'}").progress__lang EN
    .progress__stage 01
    .progress__stage 02
    .progress__stage 03
    .progress__stage 04
    .progress__stage 05
    .progress__stage 06
    .progress__stage 07
    .progress__music
      icon(glyph="sound", :width="23", :height="12")
</template>

<script>
export default {
  name: 'PageState',
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

.progress {
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
