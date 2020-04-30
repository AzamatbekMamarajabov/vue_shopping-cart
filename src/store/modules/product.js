import shop from "@/api/shop";

export default {

  namespaced: true,
  state: {
    products: []
  },
  getters: {
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0);
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    }
  },

  mutations: {
    setProducts(state, products) {
      //update products
      state.products = products;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise(resole => {
        //make the call
        //run set products
        shop.getProducts(products => {
          commit("setProducts", products);
          resole();
        });
      });
    }
  }
};
