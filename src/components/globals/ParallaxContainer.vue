<script>
import { EventBus } from '@/utils';

export default {
  name: 'ParallaxContainer',
  computed: {
    _isMobile() {
      return this.$mq === 'xs' || this.$mq === 'sm' || this.$mq === 'md';
    },
  },
  methods: {
    changePOV(e) {
      if (!this._isMobile)
        this.$nextTick(() => {
          const pageWidth = window.innerWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth ||
                        document.body.offsetWidth;
          const center = pageWidth / 2;
          const modifier = (e.pageX - center) / center;
          EventBus.$emit('changePOV', { modifier });
        })
    }
  },
  render(h) {
    return h('section', {
      class: {
        'parallax-container': true,
      },
      on: {
        mousemove: this.changePOV
      },
    }, [
      this.$slots.default
    ])
  }
}
</script>
