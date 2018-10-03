<template lang="pug">
.running-text
  .running-text__letter(
    v-for="(element, index) in withoutSpaces"
    :key="_uid+'-'+index"
    :class="{'running-text__letter--shift': element.shift}"
    :style="getStyle(index)"
    ) {{element.letter}}
</template>

<script>
export default {
  name: 'RunningText',
  props: {
    text: {
      type: String,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    delayMultiplier: {
      type: Number,
      default: 0.1,
    },
  },
  computed: {
    withoutSpaces() {
      return this.text.split("")
        .map((letter, index, word) => ({ letter, shift: word[index+1] === " "}))
        .filter(element => element.letter !== " ");
    },
  },
  methods: {
    getStyle(index) {
      const delay = this.reverse ? this.withoutSpaces.length - index * this.delayMultiplier : index * this.delayMultiplier;
      return `animation-delay: ${delay}s`;
    }
  },
};
</script>

<style lang="scss">
.running-text {
  white-space: nowrap;
  &__letter {
    display: inline-block;
    animation-name: running-text_blink;
    animation-iteration-count: infinite;
    animation-duration: 2s;
    &--shift {
      margin-right: 0.4em;
    }
  }
}
@keyframes running-text_blink {
  0%,
  5% {
    opacity: 0.3;
  }
}
</style>
