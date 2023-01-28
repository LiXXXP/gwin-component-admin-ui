<template>
  <el-dropdown @command="onCommand">
    <el-button type="primary" size="default">
      {{ data.btnText }}
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in data.options" :key="item.label" :command="item.value">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ElDropdown, ElButton, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['blur'])

const formItemOnChange = injectStrict(FormItemOnChangeKey)

function onCommand(value: any) {
  formItemOnChange(props.itemKey, value)
  emit('blur')
}
</script>
