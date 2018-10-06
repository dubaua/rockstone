
<template lang="pug">
  .menu
    nav.menu__section-list
      a(href="#" v-scroll-to="'#whoWeAre'" @click.stop="closeMenu").menu__link {{content.common.who_we_are_title}}
      a(href="#" v-scroll-to="'#howWeWork'" @click.stop="closeMenu").menu__link {{content.common.how_we_work_title}}
      a(href="#" v-scroll-to="'#ourProjects'" @click.stop="closeMenu").menu__link {{content.common.our_projects_title}}
      a(href="#" v-scroll-to="'#howToWorkWithUs'" @click.stop="closeMenu").menu__link {{content.common.how_to_work_with_us_title}}
      a(href="#" v-scroll-to="'#careers'" @click.stop="closeMenu").menu__link {{content.common.careers_title}}
      a(href="#" v-scroll-to="'#contact'" @click.stop="closeMenu").menu__link {{content.common.contact_title}}
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
    closeMenu() {
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
