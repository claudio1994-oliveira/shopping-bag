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
      state.productsInBag.push(product)
    },

    removeFromBag(state, product) {
      state.productsInBag = state.productsInBag.filter(item => item.id !== product.id)
    }
  },
  actions: {

    loadProducts({commit}) {
      axios.get('https://fakestoreapi.com/products').then(response => {
        commit('loadProducts', response.data);
        console.log(response.data)
      })
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
