<template lang="pug">
  .pagination
    .pagination__fraction {{config.current}}
    .pagination__divider {{config.divider}}
    .pagination__fraction {{config.total}}
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    config: Object,
  },
};
</script>

<style lang="scss">
@import "~@/styles/_globals";

.pagination {
  color: $color-primary;
  display: flex;
  align-items: center;

  &__fraction {
    font-weight: 700;
    font-size: $base * 1.125;
  }
  &__divider {
    font-size: $base * 0.625;
    font-weight: 500;
    margin: 0 $base * 0.2;
  }
}
</style>
