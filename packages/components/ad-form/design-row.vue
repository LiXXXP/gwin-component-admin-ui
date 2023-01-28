<template>
  <draggable
    :list="items"
    :group="{ name: 'people', pull: 'clone', put: false }"
    item-key="key"
    class="ad-form-design__contents-wrapper"
    @end="$emit('onEnd')"
  >
    <template #item="{ element, index }">
      <div
        class="ad-form-design__contents"
        :class="{ active: contentState.currentRow === row && contentState.currentIndex === index }"
        @click.stop="$emit('onItemClick', row, index)"
      >
        <ad-form-item
          :key="element.key"
          :ref="setItemRefs"
          :item="element"
          :size="size"
          :max-label-width="maxLabelWidth"
        ></ad-form-item>
        <div class="ad-icons">
          <div class="ad-icons__action" @click="$emit('onItemCopy', row, element)">
            <svg-icon class="ad-icons__icon" icon-class="gwin-copy"></svg-icon>
            <p>复制</p>
          </div>
          <el-popconfirm title="Are you sure to delete this?" @confirm="$emit('onItemDelete', row, index)">
            <template #reference>
              <div class="ad-icons__action">
                <svg-icon class="ad-icons__icon" icon-class="gwin-delete-1"></svg-icon>
                <p>删除</p>
              </div>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { FormItem } from '../interface'

export interface Props {
  items: FormItem[]
  size?: string
  row: number
  contentState: Record<string, number>
  maxLabelWidth: number
}

withDefaults(defineProps<Props>(), {
  size: 'default'
})

const emit = defineEmits(['onEnd', 'onItemClick', 'setItemRefs', 'onItemCopy', 'onItemDelete'])

function setItemRefs(item: any) {
  emit('setItemRefs', item)
}
</script>

<style lang="scss" scoped></style>
