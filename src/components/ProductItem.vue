<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
    @click.prevent="gotoPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽</span>

    <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label" for='#73B6EA'>
          <input
            class="colors__radio sr-only"
            type="radio"
            value="#73B6EA"
            v-model="color"
          />
          <span class="colors__value" style="background-color: #73b6ea"> </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label" for='#8BE000'>
          <input
            class="colors__radio sr-only"
            type="radio"
            value="#8BE000"
            v-model="color"
          />
          <span class="colors__value" style="background-color: #8be000"> </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label" for='#222'>
          <input
            class="colors__radio sr-only"
            type="radio"
            value="#222"
            v-model="color"
          />
          <span class="colors__value" style="background-color: #222"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '../helpers/gotoPage';
import numberFormat from '../helpers/numberFormat';

export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  methods: {
    gotoPage,
  },
  filters: {
    numberFormat,
  },
  props: ['product'],
};
</script>
