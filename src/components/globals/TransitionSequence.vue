
<template lang="pug">
  transition(:name="transitionName", @enter="onEnter")
    template(v-if="_isVisible")
      slot
</template>

<script>
export default {
  name: 'TransitionSequence',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
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
    _isVisible() {
      return !this.isBlocked && this.isVisible;
    },
  },
  methods: {
    onEnter() {
      setTimeout(() => {this.$emit('transitionAnimated')}, this.delay);
    }
  },
}
</script>
