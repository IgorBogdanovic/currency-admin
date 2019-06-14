<template>
  <div class="edit">
    <form-cmp title="Edit Currency" :inputFields="inputFields" />
  </div>
</template>

<script>
import FormCmp from '@/-common-/components/FormCmp'

export default {
  name: 'Edit',
  components: { FormCmp },
  data () {
    return {
      inputFields: { iso: '', symbol: '' }
    }
  },
  watch: {
    '$route.params.id' () {
      this.setInputFields()
    }
  },
  methods: {
    setInputFields () {
      if (this.$route.params.id && this.$route.params.currency) {
        this.inputFields = { iso: this.$route.params.currency.iso, symbol: this.$route.params.currency.symbol }
      } else if (this.$route.params.id) {
        for (let currency of this.$store.state.currencies) {
          if (currency.id === this.$route.params.id) this.inputFields = { iso: currency.iso, symbol: currency.symbol }
        }
      }
    }
  },
  created () {
    this.setInputFields()
  }
}
</script>
