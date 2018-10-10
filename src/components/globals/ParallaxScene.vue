<script>
const NUMBER_AND_OPTIONAL_REST_REGEX = /^(\d+\.?\d*)(.*)?$/;
const NON_DIGITS_REGEX = /(\D+)/; // TODO get rid of this
const ALLOWED_UNITS = ["px", "%", "em", undefined];

const validator = value => {
  if (!value) return true;

  const config = value.match(NUMBER_AND_OPTIONAL_REST_REGEX);
  if (!config) return false;

  // match returns initial string as first element
  // TODO extract config
  const [, offset, units] = config;

  if (isNaN(parseFloat(offset, 10))) {
      // eslint-disable-next-line no-console
      console.warn("Failed to cast offset", offset, "to number in", value);
      return false;
  }

  // TODO rewrite to match undefined
  if (ALLOWED_UNITS.indexOf(units) === -1) {
      // eslint-disable-next-line no-console
      console.warn("Only", ALLOWED_UNITS.join(","), "allowed. Given units", units, "doen't match");
      return false;
  }

  return true;
}

export default {
  name: 'ParallaxScene',
  props: {
    offsetX: {
      type: String,
      // check its string and it contains positive number and optional valid css unit
      validator,
    },
    offsetY: {
      type: String,
      validator,
    },
  },
  data() {
    return {
      element: null,
      clientWidth: 0,
      clientHeight: 0,
      modifierX: 0,
      modifierY: 0,
    }
  },
  computed: {
    getTranslateX() {
      if (!this.offsetX) return 0;
      const [ offset, units ] = this.offsetX.split(NON_DIGITS_REGEX);
      return `${this.modifierX * parseFloat(offset)}${units ? units : "px"}`;
    },
    getTranslateY() {
      if (!this.offsetY) return 0;
      const [ offset, units ] = this.offsetY.split(NON_DIGITS_REGEX);
      return `${this.modifierY * parseFloat(offset)}${units ? units : "px"}`;
    },
    getStyle() {
      return `translate(${this.getTranslateX}, ${this.getTranslateY})`
    }
  },
  methods: {
    onMousemove(e) {
      this.$options._translateXRequest = window.requestAnimationFrame(() => this.translateX(e.pageX));
    },
    onScroll() {
      this.$options._translateYRequest = window.requestAnimationFrame(() => this.translateY(window.scrollY));
    },
    translateX(offset) {
      const center = this.clientWidth / 2;
      this.modifierX = (offset - center) / center;
    },
    translateY(offset) {
      const elCenter = this.element.offsetTop + this.element.offsetHeight / 2;
      const scrollCenter = offset + this.clientHeight / 2;
      const modifierY = (elCenter - scrollCenter) / scrollCenter;
      this.modifierY = modifierY;
    },
    updateWidthHeight() {
      this.clientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth
        || document.body.offsetWidth;

      this.clientHeight = document.body.clientHeight
        || document.body.offsetHeight;
    },
  },
  created () {
    this.$nextTick(() => {
      this.element = this.$el;
      window.addEventListener('mousemove', this.onMousemove);
      window.addEventListener('scroll', this.onScroll);
      window.addEventListener('resize', this.updateWidthHeight);
      this.updateWidthHeight();
    })
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.onMousemove);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    window.cancelAnimationFrame(this.$options._translateXRequest);
    window.cancelAnimationFrame(this.$options._translateYRequest);
  },
  render(h) {
    return h(
      'div', 
      {style: {
        transform: this.getStyle,
      }},
      [this.$slots.default]
    )
  }
}
</script>