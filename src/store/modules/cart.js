import shop from "@/api/shop";

export default {
  namespaced: true,
  state: {
    // [id, quantity]
    cart: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.cart.map(cartItem => {
        const product = rootState.products.products.find(
          product => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },
    cartTotal(state, getters) {
      // let total = 0;
      // getters.cartProducts.forEach(product => {
      //   total += product.quantity * product.price;
      // });
      // return total;
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    }
  },
  mutations: {
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addProductToCart(context, product) {
      if (context.rootGetters['products/productIsInStock'](product)) {
        const cartItem = context.state.cart.find(
          item => item.id === product.id
        );
        // find  cartItem
        if (!cartItem) {
          // pushProductToCart
          context.commit("pushProductToCart", product.id);
        } else {
          //incerementItemQuantity
          context.commit("incrementItemQuantity", cartItem);
        }
        context.commit("products/decrementProductInventory", product, {
          root: true
        });
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        () => {
          commit("setCheckoutStatus", "fail");
        }
      );
    }
  }
};
