<template lang="pug">
  aside.page-state
    button(@click="setLanguage('ru')", :class="{'page-state__lang--active': $store.state.page.currentLanguageCode === 'ru'}").page-state__lang RU
    button(@click="setLanguage('en')", :class="{'page-state__lang--active': $store.state.page.currentLanguageCode === 'en'}").page-state__lang.page-state__lang--en EN
    a.page-state__stage(
      v-for="(section, key, index) in sections"
      :key="key"
      :class="{'page-state__stage--active': section.isInViewport}"
      :href="'#'+key"
      @click.stop="scrollTo(key)"
    ) {{ '0' + (index + 1 )}}
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
  computed: {
    sections() {
      return this.$store.state.sections;
    }
  },
  methods: {
    setLanguage(languageCode) {
      this.$store.dispatch('setByKey', {key: 'currentLanguageCode', value: languageCode})
    },
    scrollTo(anchor) {
      this.$scrollTo('#'+anchor);
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
    &--en {
      margin-top: -50px;
    }
  }
  &__stage {
    font-weight: 700;
    letter-spacing: 0.05em;
    position: relative;
    cursor: pointer;
    text-decoration: none;
    color: $color-text;

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
