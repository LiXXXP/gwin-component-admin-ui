<template>
  <div class="ad-search-button">
    <ad-upload :item-key="data.key.toString()" :data="importData"></ad-upload>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AdImport'
}
</script>
<script setup lang="ts">
import { ButtonItem } from '../interface'
import AdUpload from '../ad-form-item/items/upload.vue'
import { computed } from 'vue'
import clone from 'clone'

export interface Props {
  data: ButtonItem
}

const props = withDefaults(defineProps<Props>(), {})
const importData = computed(() => {
  const buttonItem = clone(props.data)
  delete buttonItem.importData
  return Object.assign({ buttonItem: buttonItem }, props.data.importData)
})
</script>

<style lang="scss" scoped></style>
