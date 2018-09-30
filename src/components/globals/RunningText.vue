<template lang="pug">
  .rt
    .rt__l(
      v-for="(e, i) in withoutSpaces",
      :class="{'rt__l--s': e.s}",
      :style="getStyle(i)"
      ) {{e.l}}
</template>

<script>
export default {
  name: 'RunningText',
  props: {
    text: String,
    reverse: Boolean,
  },
  computed: {
    withoutSpaces() {
      return this.text.split("")
        .map((l, i, a) => ({ l, s: a[i+1] === " "}))
        .filter(e => e.l !== " ");
    },
  },
  methods: {
    getStyle(i) {
      const delay = this.reverse ? this.withoutSpaces.length - i * 0.1 : i * 0.1;
      return `animation-delay: ${delay}s`;
    }
  },
};
</script>

<style lang="scss">
.rt {
  white-space: nowrap;
  &__l {
    display: inline-block;
    animation-name: rt_blink;
    animation-iteration-count: infinite;
    animation-duration: 2s;
    &--s {
      margin-right: 0.4em;
    }
  }
}
@keyframes rt_blink {
  0%,
  5% {
    opacity: 0.3;
  }
}
</style>
