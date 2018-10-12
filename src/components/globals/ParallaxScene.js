const COMPONENT_NAME = "ParallaxScene";
const NUMBER_AND_OPTIONAL_REST_REGEX = /^(\d+\.?\d*)(.*)?$/;
const ALLOWED_UNITS = ["px", "%", "vh", "vw", "em", "rem"];

// parse given string to offset and css units
const getConfig = cssString => {
  try {
    // match returns initial string as first element
    const [, offset, units] = cssString.match(NUMBER_AND_OPTIONAL_REST_REGEX);
    return {
      offset: parseFloat(offset, 10),
      units: units ? units : "px" // fallback to pixels if no units given
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    return {
      error: true,
      message: error
    };
  }
};

// check if string and it contains positive number and optional valid css unit
const containsNumberAndMaybeCssUnits = value => {
  // prop is not required
  if (!value) return true;

  const config = getConfig(value);

  if (config.error) {
    // eslint-disable-next-line no-console
    console.warn(
      `${COMPONENT_NAME} validation warning: failed cast config ${value} to number.`
    );
    return false;
  }

  if (isNaN(config.offset)) {
    // eslint-disable-next-line no-console
    console.warn(
      `${COMPONENT_NAME} validation warning: failed to cast offset ${
        config.offset
      }, to number. Value given: ${value}.`
    );
    return false;
  }

  if (ALLOWED_UNITS.indexOf(config.units) === -1) {
    // eslint-disable-next-line no-console
    console.warn(
      `${COMPONENT_NAME} validation warning: Only [${ALLOWED_UNITS.join(
        ", "
      )}] are allowed. Given units ${config.units} doesn't match.`
    );
    return false;
  }

  return true;
};

export default {
  name: COMPONENT_NAME,

  props: {
    offsetX: {
      type: String,
      validator: containsNumberAndMaybeCssUnits
    },
    offsetY: {
      type: String,
      validator: containsNumberAndMaybeCssUnits
    }
  },

  data() {
    return {
      element: null,
      clientWidth: 0,
      clientHeight: 0,
      modifierX: 0,
      modifierY: 0,
      lastMouseX: 0,
      lastScrollY: 0,
    };
  },

  computed: {
    getTranslateX() {
      if (!this.offsetX) return 0;
      const { offset, units } = getConfig(this.offsetX);
      return `${this.modifierX * offset}${units}`;
    },

    getTranslateY() {
      if (!this.offsetY) return 0;
      const { offset, units } = getConfig(this.offsetY);
      return `${this.modifierY * offset}${units}`;
    },

    getStyle() {
      return `translate(${this.getTranslateX}, ${this.getTranslateY})`;
    }
  },

  methods: {
    onMousemove(e) {
      if (this.offsetX)
        this.lastMouseX = e.pageX;
        this.$options._translateXRequest = window.requestAnimationFrame(() =>
          this.translateX()
        );
    },

    onScroll() {
      if (this.offsetY)
        this.lastScrollY = window.scrollY;
        this.$options._translateYRequest = window.requestAnimationFrame(() =>
          this.translateY()
        );
    },

    translateX() { // TODO clarify naming
      const screenCenterX = this.clientWidth / 2;
      this.modifierX = (this.lastMouseX - screenCenterX) / screenCenterX;
    },

    translateY() {
      const elementAppear = this.element.offsetTop + this.element.offsetHeight / 2;
      const screenCenterY = this.clientHeight / 2;
      this.modifierY = (this.lastScrollY - elementAppear + screenCenterY) / screenCenterY;
    },

    update() {
      this.clientWidth =
        window.innerWidth || document.documentElement.clientWidth;

      this.clientHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (this.offsetX) this.translateX();

      if (this.offsetY) this.translateY();
    },

    destroy() {
      if (this.offsetX)
        window.removeEventListener("mousemove", this.onMousemove);

      if (this.offsetY)
        window.removeEventListener("scroll", this.onScroll);

      if (this.offsetX || this.offsetY)
        window.removeEventListener("resize", this.onResize);

      window.cancelAnimationFrame(this.$options._translateXRequest);
      window.cancelAnimationFrame(this.$options._translateYRequest);
    },

    init() {
      if (this.offsetX || this.offsetY)
        this.element = this.$el;
        window.addEventListener("resize", this.update);
        this.update();

      if (this.offsetX)
        window.addEventListener("mousemove", this.onMousemove);

      if (this.offsetY)
        window.addEventListener("scroll", this.onScroll);
    },
  },

  created() {
    this.$nextTick(this.init);
  },

  beforeDestroy() {
    this.destroy();
  },

  render(h) {
    return h(
      "div",
      {
        style: {
          transform: this.getStyle
        }
      },
      [this.$slots.default]
    );
  }
};
