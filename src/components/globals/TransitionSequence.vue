
<template lang="pug">
  transition(:name="transitionName", @enter="onEnter")
    template(v-if="isStepReached")
      slot
</template>

<script>
export default {
  name: 'TransitionSequence',
  props: {
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    section: {
      type: String,
      required: true,
    },
    final: {
      type: Number,
      required: true,
      default: 0,
    },
    delay: {
      type: Number,
      default: 333,
    },
    transitionName: {
      type: String,
      default: "soar",
    },
  },
  computed: {
    isReady() {
      return this.$store.state.sections[this.section].animationStep >= this.final;
    },
    isStepReached() {
      return this.isReady
          || (this.$store.state.sections[this.section].isInViewport
          && this.$store.state.sections[this.section].animationStep >= this.order);
    },
  },
  methods: {
    onEnter() {
      if (!this.isReady)
        setTimeout(() => this.$store.commit('nextStep', {key: this.section}), this.delay);
    }
  },
}
</script>
