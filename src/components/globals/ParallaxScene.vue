<script>
import { EventBus } from '@/utils';

const PERSPECTIVE = 5; // percent

export default {
  name: 'ParallaxScene',
  props: {
    depth: {
      type: Number,
      default: 0.5,
      validator: function (value) {
        return 0 < value && value <= 1;
      },
    }
  },
  data() {
    return {
      modifier: 0,
    }
  },
  computed: {
    getStyle() {
      const offset = PERSPECTIVE * this.modifier * (1 - this.depth);
      return `translate(${offset}%, 0)`
    }
  },
  mounted() {
    EventBus.$on('changePOV', payload => this.modifier = payload.modifier);
  },
  beforeDestroy() {
    EventBus.$off('changePOV');
  },
  render(h) {
    return h('div', {
      style: {
        transform: this.getStyle,
      }
    }, [
      this.$slots.default
    ])
  }
}
</script>

<style lang="scss">
.parallax-scene {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

