
<template lang="pug">
  section.section.contact
    h1.title.contact__title {{  content.common.contact_title }}
    .spread-block
      .spread-block__col.spread-block__col--left.typographic(v-html="content.common.contact_content")
      .spread-block__col.spread-block__col--middle.typographic(v-html="content.common.contact_chlb")
      .spread-block__col.spread-block__col--right.typographic(v-html="content.common.contact_spb")
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
</style>
