import Vue from 'vue'
import Vuex from 'vuex'
import ResourceClass from '@/-common-/resources/ResourceClass'

Vue.use(Vuex)

const resource = new ResourceClass()

/************
*   STATE   *
************/
const state = {
  currencies: []
}

/****************
*   MUTATIONS   *
****************/
const mutations = {
  setCurrencies: (state, currencies) => {
    Vue.set(state, 'currencies', currencies)
  }
}

/**************
*   ACTIONS   *
**************/
const actions = {
  getCurrencies: ctx => {
    resource.get()
      .then(res => {
        ctx.commit('setCurrencies', res)
      })
  },
  postCurrency: (ctx, payload) => {
    resource.post(payload)
      .then(() => {
        ctx.dispatch('getCurrencies')
      })
  },
  editCurrency: (ctx, payload) => {
    resource.put(payload)
      .then(() => {
        ctx.dispatch('getCurrencies')
      })
  },
  deleteCurrency: (ctx, payload) => {
    resource.delete(payload)
      .then(() => {
        ctx.dispatch('getCurrencies')
      })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
