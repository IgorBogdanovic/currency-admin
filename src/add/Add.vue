<template>
  <div class="add">
    <form-cmp title="Add Currency" :inputFields="inputFields" />
  </div>
</template>

<script>
import FormCmp from '@/-common-/components/FormCmp'

export default {
  name: 'Add',
  components: { FormCmp },
  data () {
    return {
      inputFields: { iso: '', symbol: '' }
    }
  }
}
</script>
