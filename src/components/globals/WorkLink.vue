<script>
export default {
  name: 'WorkLink',
  props: {
    link: String,
    glyph: String,
    width: Number,
    height: Number,
  },
  functional: true,
  render(h, { props }) {
    switch (props.link) {
      case '':
      case undefined:
        return;
      case '#':
        return h( 'span', {
            class: {
              "work-link": true,
            }
          },
          [
            h('icon', {
                class: {
                  'work-link__icon': true, 
                },
                props,
              }
            )
          ]
        );
      default:
        return h( 'a', {
            class: {
              "work-link": true,
            },
            attrs: {
              href: props.link,
            }
          },
          [
            h('icon', {
                class: {
                  'work-link__icon': true, 
                },
                props,
              }
            )
          ]
        );
    }
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";
.work-link {
  display: block;
  margin-right: $base * 2;

  &__icon {
    fill: $color-text;
  }
}
</style>
