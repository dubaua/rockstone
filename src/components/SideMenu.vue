
<template lang="pug">
  .menu
    nav.menu__section-list
      a(v-for="(link, index) in menu", :href="link.anchor", @click.stop="closeMenu").menu__link {{link.text}}
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
  data() {
    return {
      menu: [
        {
          anchor: "#who_we_are",
          text: this.content.common.who_we_are_title,
          isReady: false,
        },
        {
          anchor: "#how_we_work",
          text: this.content.common.how_we_work_title,
          isReady: false,
        },
        {
          anchor: "#our_projects",
          text: this.content.common.our_projects_title,
          isReady: false,
        },
        {
          anchor: "#how_to_work_with_us",
          text: this.content.common.how_to_work_with_us_title,
          isReady: false,
        },
        {
          anchor: "#careers",
          text: this.content.common.careers_title,
          isReady: false,
        },
        {
          anchor: "#contact",
          text: this.content.common.contact_title,
          isReady: false,
        },
      ]
    }
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
    font-weight: 700;

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
    font-size: $base * 1.2;
    font-weight: 700;
    padding: 5px 3px;
    border: 1px solid transparent;
    background: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 1em;

    &:focus {
      outline: none;
    }

    &--active {
      border-color: white;
    }
  }
}
</style>
