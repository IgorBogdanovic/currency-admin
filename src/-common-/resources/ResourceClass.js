/**********************************
*   API Currencies CRUD wrapper   *
**********************************/
import api from '@/api'
import Currency from '@/-common-/models/CurrencyModel'

export default class Resource {
  get () {
    return api.get('currencies')
      .then(res => {
        const currencies = []
        for (const currency of res.data) {
          currencies.push(new Currency(currency))
        }
        return Promise.resolve(currencies)
      })
      .catch(err => {
        // eslint-disable-next-line
        console.error(err)
        return Promise.reject(err)
      })
  }

  post (payload) {
    payload.iso = payload.iso.toUpperCase()
    return api.post('currencies', payload)
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(err => {
        // eslint-disable-next-line
        console.error(err)
        return Promise.reject(err)
      })
  }

  put (payload) {
    payload.inputFields.iso = payload.inputFields.iso.toUpperCase()
    return api.put('currencies/' + payload.id, payload.inputFields)
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(err => {
        // eslint-disable-next-line
        console.error(err)
        return Promise.reject(err)
      })
  }

  delete (payload) {
    return api.delete('currencies/' + payload.id)
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(err => {
        // eslint-disable-next-line
        console.error(err)
        return Promise.reject(err)
      })
  }
}
