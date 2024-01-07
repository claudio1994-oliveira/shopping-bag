import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },

    loadBag(state, products) {
      state.productsInBag = products;
    },

    removeFromBag(state, product) {
      state.productsInBag = state.productsInBag.filter(item => item.id !== product.id);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    }
  },
  actions: {

    loadProducts({commit}) {
      axios.get('https://fakestoreapi.com/products').then(response => {
        commit('loadProducts', response.data);
      
      })
    },

    loadBag({commit}) {
      if (localStorage.getItem('productsInBag')){
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')));
      }
      
    },

    addToBag({commit}, product) {
      commit('addToBag', product)
    },

    removeFromBag({commit}, product) {
      if (confirm('Você tem certeza que deseja remover este produto?')){
        commit('removeFromBag', product)
      }
      
    }


  },
  modules: {
  }
})
