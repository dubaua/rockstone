
<template lang="pug">
  .menu
    nav.menu__section-list
      a(href="#whoWeAre" @click.stop="scrollTo('#whoWeAre')").menu__link {{content.common.who_we_are_title}}
      a(href="#howWeWork" @click.stop="scrollTo('#howWeWork')").menu__link {{content.common.how_we_work_title}}
      a(href="#ourProjects" @click.stop="scrollTo('#ourProjects')").menu__link {{content.common.ourProjects_title}}
      a(href="#howToWorkWithUs" @click.stop="scrollTo('#howToWorkWithUs')").menu__link {{content.common.how_to_work_with_us_title}}
      a(href="#careers" @click.stop="scrollTo('#careers')").menu__link {{content.common.careers_title}}
      a(href="#contact" @click.stop="scrollTo('#contact')").menu__link {{content.common.contact_title}}
    mq-layout(:mq="['xs', 'sm', 'md']").menu__mobule
      .menu__phone
        a(:href="'tel:'+content.common.phone")
          | {{content.common.phone_label}}
      .menu__languages
        button(@click="setLanguage('ru')",
          :class="{'menu__language--active': $store.state.page.currentLanguageCode === 'ru'}").menu__language RU
        button(@click="setLanguage('en')",
          :class="{'menu__language--active': $store.state.page.currentLanguageCode === 'en'}").menu__language EN
</template>

<script>

export default {
  name: 'SideMenu',
  props: {
    content: Object,
  },
  methods: {
    scrollTo(anchor) {
      this.$scrollTo(anchor);
      this.$store.dispatch('setByKey', {key: 'isMenuOpen', value: false});
    },
    setLanguage(languageCode) {
      this.$store.dispatch('setByKey', {key: 'currentLanguageCode', value: languageCode})
    },
  }
}
</script>

<style lang="scss">
@import "~@/styles/_globals";
@import "~@/styles/_easings";

.menu {
  @include breakpoint("lg") {
    padding-left: 10vh;
  }
  &__link {
    display: block;
    margin: 0 0 $base * 1.5;
    text-decoration: none;
    color: $color-text;
    font-size: $base * 1.5;
    font-weight: 800;
    letter-spacing: 0.01em;
    line-height: 1;
    transition: all $easeInOutCirc $timing;

    @include breakpoint("lg") {
      color: $color-background--light;
      font-size: $base * 4;
    }

    &:hover {
      color: $color-text;
      transform: translate($base * 2, 0);
    }
  }

  &__phone {
    margin-top: $base * 3;
    font-size: $base * 1.2;

    a {
      text-decoration: none;
    }
  }

  &__languages {
    margin-top: $base * 3;
    display: flex;
  }

  &__language {
    color: white;
    padding: 8px 0;
    text-align: center;
    width: $base * 2;
    border: none;
    background: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 1em;

    &:focus {
      outline: none;
    }

    &--active {
      color: $color-background;
      background: $color-text;
      font-weight: 700;
    }
  }
}
</style>
