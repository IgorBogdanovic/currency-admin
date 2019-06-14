/*********************
*   Currency model   *
*********************/

export default class Currency {
  constructor (data) {
    this.id = data.id
    this.iso = data.iso
    this.symbol = data.symbol
  }
}
