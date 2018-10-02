
<template lang="pug">
  section.section.contact
    a(name="contact")
    .section__container
      h1.title.contact__title {{  content.common.contact_title }}
      .spread-block
        .spread-block__col.spread-block__col--left.contact__content
          .typographic(v-html="content.common.contact_content")
        .spread-block__col.spread-block__col--middle.contact__content
          .typographic(v-html="content.common.contact_chlb")
          .section__mountain.section__mountain--7-1.section__mountain--l-n
            icon(glyph="mountain-group-7-1")
        .spread-block__col.spread-block__col--right.contact__content
          .typographic(v-html="content.common.contact_spb")
          .section__mountain.section__mountain--7-2.section__mountain--l-n
            icon(glyph="mountain-group-7-2")
    mq-layout(mq="lg+").section__mountain.section__mountain--6-3.section__mountain--l-n-n
      icon(glyph="mountain-group-6-3")
    mq-layout(mq="lg+").section__mountain.section__mountain--6-2.section__mountain--l-n
      icon(glyph="mountain-group-6-2")
    mq-layout(mq="lg+").section__mountain.section__mountain--6-1.section__mountain--l-n-n
      icon(glyph="mountain-group-6-1")
    mq-layout(:mq="['xs', 'sm', 'md']").section__mountain.section__mountain--6-5.section__mountain--d-n
      icon(glyph="mountain-group-6-5")
    mq-layout(:mq="['xs', 'sm', 'md']").section__mountain.section__mountain--6-4.section__mountain--l-n
      icon(glyph="mountain-group-6-4")
    mq-layout(mq="lg+").scrolldown.scrolldown--above.scrolldown--accent
      .scrolldown__text
        running-text(text="go back", reverse)
      .scrolldown__arrow
        icon(glyph="double-arrow--top", :width="16", :height="16")
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
  &__content {
    position: relative;
    @include global-padding;
  }
}
</style>
