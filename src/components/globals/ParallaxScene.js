const COMPONENT_NAME = "ParallaxScene";
const NUMBER_AND_OPTIONAL_REST_REGEX = /^(\d+\.?\d*)(.*)?$/;
const ALLOWED_UNITS = ["px", "%", "vh", "vw", "em", "rem"];

// parse given string to offset and css units
const getConfig = cssString => {
  try {
    // check for negative number
    const inversed = cssString.charAt(0) === "-";

    const _cssString = inversed ? cssString.slice(1) : cssString;

    // match returns initial string as first element
    const [, offset, units] = _cssString.match(NUMBER_AND_OPTIONAL_REST_REGEX);
    return {
      offset: parseFloat(offset, 10),
      units: units ? units : "px", // fallback to pixels if no units given
      sign: inversed ? -1 : 1
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

// get offset relative to document root not taking css transforms
const getDocumentOffsetTop = element => {
  let _top = 0;
  let _element = element;

  // Loop through the DOM tree
  // and add it's parent's offset to get page offset
  do {
    _top += _element.offsetTop || 0;
    _element = _element.offsetParent;
  } while (_element);

  return _top;
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
      elementAppearY: 0,
      screenCenterX: 0,
      screenCenterY: 0,
      modifierX: 0,
      modifierY: 0,
      lastMouseX: 0,
      lastScrollY: 0
    };
  },

  computed: {
    getTranslateX() {
      if (!this.offsetX) {
        return 0;
      }
      const { offset, units, sign } = getConfig(this.offsetX);
      return `${sign * this.modifierX * offset}${units}`;
    },

    getTranslateY() {
      if (!this.offsetY) {
        return 0;
      }
      const { offset, units, sign } = getConfig(this.offsetY);
      return `${sign * this.modifierY * offset}${units}`;
    },

    getStyle() {
      return `translate(${this.getTranslateX}, ${this.getTranslateY})`;
    }
  },

  methods: {
    onMousemove(e) {
      this.lastMouseX = e.pageX;
      this.$options._translateXRequest = window.requestAnimationFrame(
        this.updateModifierX
      );
    },

    onScroll() {
      this.lastScrollY = window.scrollY;
      this.$options._translateYRequest = window.requestAnimationFrame(
        this.updateModifierY
      );
    },

    updateModifierX() {
      this.modifierX =
        (this.lastMouseX - this.screenCenterX) / this.screenCenterX;
    },

    updateModifierY() {
      this.modifierY =
        (this.lastScrollY - this.elementAppearY + this.screenCenterY) /
        this.screenCenterY;
    },

    update() {
      const element = this.$el;

      this.elementAppearY =
        getDocumentOffsetTop(element) + element.offsetHeight / 2;

      this.screenCenterX =
        window.innerWidth / 2 || document.documentElement.clientWidth / 2;

      this.screenCenterY =
        window.innerHeight / 2 || document.documentElement.clientHeight / 2;

      this.updateModifierX();

      this.updateModifierY();
    },

    destroy() {
      if (this.offsetX || this.offsetY) {
        window.removeEventListener("resize", this.onResize);
      }

      if (this.offsetX) {
        window.removeEventListener("mousemove", this.onMousemove);
      }

      if (this.offsetY) {
        window.removeEventListener("scroll", this.onScroll);
      }

      window.cancelAnimationFrame(this.$options._translateXRequest);
      window.cancelAnimationFrame(this.$options._translateYRequest);
    },

    init() {
      if (this.offsetX || this.offsetY) {
        this.update();
        window.addEventListener("resize", this.update);
      }

      if (this.offsetX) {
        window.addEventListener("mousemove", this.onMousemove);
      }

      if (this.offsetY) {
        window.addEventListener("scroll", this.onScroll);
      }
    }
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
