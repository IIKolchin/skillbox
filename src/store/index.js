import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => el.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductamount(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => el.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((el) => el.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,

      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        // eslint-disable-next-line prefer-destructuring
        const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0,
      );
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item.amount + acc, 0);
    },

  },
  actions: {
    loadCart(context) {
      axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey);
            context.commit('updateUserAccessKey', res.data.user.accessKey);
          }
          context.commit('updateCartProductsData', res.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
