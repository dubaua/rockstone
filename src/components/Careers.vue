<template lang="pug">
  section.section.careers
    h1.title.careers__title {{ content.common.careers_title }}
    .careers__backdrop
    .careers__list
      .position(v-for="position in content.careers")
        h2.position__title {{position.title}}
        .position__city {{position.city}}
    button {{ content.common.apply_button_text }}
</template>

<script>
export default {
  name: 'Careers',
  props: {
    content: Object,
  },
}
</script>

<style lang="scss">
</style>
