
<template lang="pug">
  section.section.homescreen
    .homescreen__logo
      icon(glyph="logo")
    .section__mountain.section__mountain--1-1.section__mountain--l-n
      icon(glyph="mountain-group-1-1")
    .section__mountain.section__mountain--1-2.section__mountain--d-n
      icon(glyph="mountain-group-1-2")
    .section__mountain.section__mountain--1-3.section__mountain--d-n
      icon(glyph="mountain-group-1-3")
</template>

<script>
export default {
  name: 'Homescreen',
}
</script>

<style lang="scss">
@import "~@/styles/_globals";

.homescreen {
  position: relative;
  z-index: 0;
  &__logo {
    position: absolute;
    top: 38%;
    left: 10%;
    right: 10%;
    fill: white;
    padding-bottom: 11.267605633802818%;

    svg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
