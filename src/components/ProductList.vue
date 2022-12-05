<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <ul>
    <ProductItem :products="products" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>
