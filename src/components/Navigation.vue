<template lang="pug">
  //- button(@click="setLanguage('ru')") RU
  //- button(@click="setLanguage('en')") EN
  nav.navigation
    mq-layout(mq="lg+").navigation__logo
      icon(glyph="logo", :width="142", :height="16")
    button.navigation__hamburger(@click="toggleMenu")
      .hamburger.hamburger--squeeze(:class="{'is-active':page.isMenuOpen}")
        .hamburger-box
          .hamburger-inner
    mq-layout(mq="lg+").navigation__phone
      a(:href="'tel:'+content.common.phone")
        | {{content.common.phone_label}}
    mq-layout(mq="lg+").navigation__email
      a(:href="'mailto:'+content.common.email")
        icon(glyph="envelope", :width="24", :height="14")
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Navigation',
  props: {
    content: Object,
  },
  computed: {
    ...mapState(['page']),
    currentLanguage() {
      return this.content[this.currentLanguageCode];
    },
  },
  methods: {
    ...mapActions(['toggleByKey']),
    toggleMenu() {
      this.toggleByKey('isMenuOpen')
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.navigation {
  @include fixed-overlay;
  right: auto;
  width: 78px;
  z-index: 11;

  &__logo {
    position: absolute;
    top: 28px;
    left: 28px;
    fill: white;
    width: 142px;
  }

  &__hamburger {
    border: 0;
    padding: 0;
    margin: 0;
    background: none;
    position: absolute;
    top: 28px;
    transform: translate(0, -50%);

    &:focus {
      outline: none;
    }
    @include breakpoint("lg") {
      top: 50%;
    }
  }
  &__phone {
    position: absolute;
    bottom: 70px;
    left: 30px;
    transform-origin: left top;
    transform: rotate(-90deg);
    display: block;
    width: 150px;
    font-weight: 500;
    a {
      text-decoration: none;
    }
  }
  &__email {
    position: absolute;
    bottom: 28px;
    left: 28px;
    a {
      fill: white;
    }
  }
}
</style>
