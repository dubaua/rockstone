
<template lang="pug">
  nav.menu
    a(v-for="(link, index) in menu" :href="link.anchor").title.menu__link {{link.text}}
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
          anchor: "#who-we-are",
          text: this.content.common.who_we_are_title,
          isReady: false,
        },
        {
          anchor: "#how-we-work",
          text: this.content.common.how_we_work_title,
          isReady: false,
        },
        {
          anchor: "#our-projects",
          text: this.content.common.our_projects_title,
          isReady: false,
        },
        {
          anchor: "#how-to-work-with-us",
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
}
</script>

<style lang="scss">
@import "~@/styles/_globals";
@import "~@/styles/_easings";

.menu {
  padding-left: 10vw;
  &__link {
    color: $color-background--light;
    display: block;
    text-decoration: none;
    transition: all $easeInOutCirc $timing;

    &:hover {
      color: $color-text;
      transform: translate($base * 2, 0);
    }
  }
}
</style>
