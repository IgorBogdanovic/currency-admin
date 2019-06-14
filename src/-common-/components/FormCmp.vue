<template>
  <div class="form">
    <form @submit.prevent="submitForm">
      <ul>
        <h3>{{ title }}</h3>
        <li>
          Currency Code
          <div class="form__input"
            :class="{ 'form__input--invalid': $v.inputFields.iso.$error }">
            <input type="text"
              v-model="inputFields.iso"
              @blur="$v.inputFields.iso.$touch()" />
              <p v-if="$v.inputFields.iso.$error && !$v.inputFields.iso.required">Required</p>
              <p v-else-if="$v.inputFields.iso.$error && !$v.inputFields.iso.length">Characters length should be 3</p>
              <p v-else-if="$v.inputFields.iso.$error && !$v.inputFields.iso.unique">Already exists</p>
          </div>
        </li>
        <li>
          Currency Symbol
          <div class="form__input"
            :class="{ 'form__input--invalid': $v.inputFields.symbol.$error }">
            <input type="text"
              v-model="inputFields.symbol"
              @blur="$v.inputFields.symbol.$touch()" />
              <p v-if="$v.inputFields.symbol.$error && !$v.inputFields.symbol.required">Required</p>
          </div>
        </li>
        <li><b-button type="submit" :disabled="$v.$invalid">Submit</b-button></li>
      </ul>
    </form>
  </div>
</template>

<script>
import store from '@/-common-/store/store'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

// validation functions
const length = value => value.length === 3
const unique = value => {
  const currencies = store.state.currencies
  let isUnique = true
  if (!currencies.length) return isUnique
  for (let currency of currencies) {
    if (currency.iso !== value.toUpperCase()) isUnique = true
    else {
      isUnique = false
      break
    }
  }
  return isUnique
}

export default {
  name: 'FormCmp',
  mixins: [ validationMixin ],
  props: {
    title: { type: String },
    inputFields: {
      type: Object,
      required: true,
      validator: value => {
        let isValid = false
        for (let input in value) {
          if (typeof value[input] === 'string') isValid = true
          else {
            isValid = false
            break
          }
        }
        return isValid
      }
    }
  },
  validations: {
    inputFields: {
      iso: {
        required,
        length,
        unique
      },
      symbol: {
        required
      }
    }
  },
  methods: {
    submitForm () {
      switch (this.$route.name) {
        case 'Add':
          this.$store.dispatch('postCurrency', this.inputFields)
          break
        case 'Edit':
          this.$store.dispatch('editCurrency', { id: parseInt(this.$route.params.id), inputFields: this.inputFields })
          break
        default: return false
      }
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/settings/_module-settings';

.form {
  width: 100%;
  padding: 2rem;
  @include breakpoint(desktop) {
    width: 65%;
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
    border-bottom: 1px solid $darkgrey;
    padding: .652rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include breakpoint(desktop) {
      padding: 1.652rem 0;
    }
    &:last-child {
      padding: .565rem 0;
      border-bottom: none;
      justify-content: flex-end;
      @include breakpoint(desktop) {
        padding: 1.565rem 0;
      }
      /deep/ .btn {
        @include fontSizeRem(16, 22);
        text-transform: uppercase;
        padding: 1rem 6rem;
        background-color: $orange;
        border: none;
        cursor: pointer;
        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
  &__input {
    width: 50%;
    input {
      @include fontSizeRem(14, 20);
      text-transform: uppercase;
      width: 100%;
      padding: .8rem;
      border: 1px solid lighten($darkgrey, 20%);
      @include breakpoint(desktop) {
        padding: 1rem;
      }
    }
    p {
      color: $orange;
      margin-left: 1rem;
    }
    &--invalid {
      input {
        border: 1px solid $orange;
        padding: calc(1rem + 1px);
      }
    }
  }
}
</style>
