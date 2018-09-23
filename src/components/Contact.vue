
<template lang="pug">
  section.section.contact
    .section__container
      h1.title.contact__title {{  content.common.contact_title }}
      .spread-block
        .spread-block__col.spread-block__col--left.overview__content
          .typographic(v-html="content.common.contact_content")
        .spread-block__col.spread-block__col--middle.overview__content
          .typographic(v-html="content.common.contact_chlb")
          .section__mountain.section__mountain--2-2.section__mountain--l-n
            icon(glyph="mountain-group-2-2")
        .spread-block__col.spread-block__col--right.overview__content
          .typographic(v-html="content.common.contact_spb")
          .section__mountain.section__mountain--2-3.section__mountain--l-n
            icon(glyph="mountain-group-2-3")
    .section__mountain.section__mountain--6-2.section__mountain--d-n
      icon(glyph="mountain-group-6-2")
    .section__mountain.section__mountain--6-1.section__mountain--l-n
      icon(glyph="mountain-group-6-1")
</template>

<script>
export default {
  name: 'Contact',
  props: {
    content: Object,
  },
}
</script>

<style lang="scss">
@import "~@/styles/_globals";
.contact {
  &__title {
    @include global-padding;
  }
}
</style>
