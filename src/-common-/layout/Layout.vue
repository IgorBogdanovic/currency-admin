<template>
  <div class="layout">
    <div class="sidebar">
      <header class="header">
        <div class="header__title">
          <h1>Search currencies:</h1>
        </div>
        <input type="text" @input="searchText" />
      </header>
      <div class="sidebar__list">
        <ul>
          <h3>Currency List</h3>
          <li v-for="currency in currencies"
            :key="`currency_${currency.id}`"
            :ref="`currency_${currency.id}`"
            class="currency-item"
            @click="currencyClicked(currency)">
            {{ currency.iso }}
            <span @click="deleteCurrency($event, currency.id)">Delete</span>
          </li>
          <li @click="$router.push({ name: 'Add' })">+ Add currency</li>
        </ul>
      </div>
    </div>
    <div class="content">
      <header class="header">
        <div class="header__title">
          <h1>Currencies</h1>
        </div>
      </header>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      searchedCurrencies: []
    }
  },
  computed: {
    currencies () {
      if (this.searchedCurrencies.length) return this.searchedCurrencies
      else return this.$store.state.currencies
    }
  },
  methods: {
    currencyClicked (currency) {
      this.$router.push({ name: 'Edit', params: { id: currency.id, currency } })
    },
    searchText (e) {
      this.searchedCurrencies = []
      mainLoop:
      for (let currency of this.currencies) {
        for (let prop in currency) {
          if (currency[prop].toString() === e.target.value.toUpperCase()) {
            this.searchedCurrencies.push(currency)
            break mainLoop
          }
        }
      }
    },
    deleteCurrency (e, id) {
      e.stopPropagation()
      this.$store.dispatch('deleteCurrency', { id })
      this.$router.push({ name: 'Index' })
    }
  },
  created () {
    this.$store.dispatch('getCurrencies')
  },
  updated () {
    const currencyItems = document.getElementsByClassName('currency-item')
    for (let item of currencyItems) {
      item.classList.remove('is-active')
    }
    if (this.$route.params.id) {
      if (this.$refs[`currency_${this.$route.params.id}`]) this.$refs[`currency_${this.$route.params.id}`][0].classList.add('is-active')
      else this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/settings/_module-settings';

.layout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  @include breakpoint(desktop) {
    flex-direction: row;
    height: 100vh;
  }
}
.header {
  padding: 0 2rem;
  @include breakpoint(desktop) {
    padding: 0 3rem;
  }
}
.sidebar {
  width: 100%;
  height: 100%;
  background-color: lighten($darkgrey, 20%);
  @include breakpoint(desktop) {
    width: 25%;
  }
  .header {
    background-color: darken($orange, 10%);
    display: flex;
    justify-content: center;
    .header__title {
      margin-right: 2rem;
    }
    input {
      color: $white;
      @include fontSizeRem(14, 20);
      border: 1px solid $white;
      background-color: transparent;
      width: 30%;
      padding: .8rem 1rem;
    }
  }
  &__list {
    padding: 2rem;
    @include breakpoint(desktop) {
      padding: 3rem;
    }
    h3 {
      color: $orange;
      @include fontSizeRem(18, 24);
      font-weight: 400;
      border-bottom: 1px solid $orange;
      padding-bottom: 1rem;
      @include breakpoint(desktop) {
        padding-bottom: 2rem;
      }
    }
    li {
      @include fontSizeRem(14, 20);
      text-transform: uppercase;
      border-bottom: 1px solid $darkgrey;
      padding: 2rem 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include breakpoint(desktop) {
        padding: 3rem 0;
      }
      &.is-active {
        color: $orange;
      }
      &:last-child {
        color: $orange;
        @include fontSizeRem(10, 16);
      }
      span {
        color: $darkgrey;
        @include fontSizeRem(10, 16);
        text-transform: none;
        cursor: pointer;
        @include breakpoint(desktop) {
          &:hover {
            color: $red;
          }
        }
      }
    }
  }
}
.content {
  width: 100%;
  height: 100%;
  @include breakpoint(desktop) {
    width: 75%;
  }
}
.header {
  color: $white;
  display: flex;
  align-items: center;
  width: 100%;
  height: 6rem;
  background-color: $orange;
  @include breakpoint(desktop) {
    height: 8rem;
  }
  &__title {
    h1 {
      @include fontSizeRem(18, 24);
    }
  }
}
</style>
