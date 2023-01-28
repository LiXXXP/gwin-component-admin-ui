<template>
  <draggable
    v-model="state.fileList"
    group="people"
    item-key="uid"
    :class="{ 'el-upload-list el-upload-list--picture-card': data.type !== 'text' }"
    @start="drag = true"
    @end="drag = false"
    @update="updateChange"
  >
    <template #item="{ element, index }">
      <div v-if="data.type !== 'text'" class="el-upload-list__item" :class="['is-' + element.status]">
        <img v-if="element.status !== 'uploading'" :src="element.url" class="el-upload-list__item-thumbnail" />
        <el-progress
          v-if="element.status === 'uploading'"
          type="circle"
          :stroke-width="6"
          :percentage="Number(element.percentage)"
        />
        <label class="el-upload-list__item-status-label">
          <el-icon class="el-icon el-icon--upload-success el-icon--check">
            <Check />
          </el-icon>
        </label>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="onPreview(element)">
            <el-icon><ZoomIn /></el-icon>
          </span>
          <span class="el-upload-list__item-delete" @click="onDeleteClick(element, index)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
    <template #footer>
      <el-upload
        ref="uploadRef"
        action="/api/cos/v1/FileUpload"
        class="ad-upload"
        :class="{ 'is-error': isError, hide: hideUpload }"
        :data="extraData"
        list-type="picture"
        :limit="1"
        :file-list="state.fileList"
        :show-file-list="false"
        v-bind="data"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :on-change="onChange"
        :on-preview="onPreview"
        :on-remove="onRemove"
        :on-error="onError"
      >
        <template #trigger>
          <el-button v-if="props.data.type == 'text'" v-bind="data.buttonItem">
            {{ data.buttonItem && data.buttonItem.label ? data.buttonItem.label : '点击上传' }}
          </el-button>
          <div v-else class="el-upload el-upload--picture-card">
            <el-icon><Plus class="el-icon" /></el-icon>
          </div>
        </template>
      </el-upload>
    </template>
  </draggable>

  <!-- 预览 -->
  <el-dialog v-model="dialogVisible" :append-to-body="true">
    <img style="width: 100%" :src="dialogImageUrl" alt="" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ElUpload, ElDialog, ElMessage, ElButton, ElIcon, UploadInstance } from 'element-plus'
import draggable from 'vuedraggable'
import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'
import { computed, onMounted, reactive, ref } from 'vue'
import { UploadFile, UploadRawFile } from 'element-plus/es/components/upload/src/upload'
import { Response } from '@gwin/networking'
import dayjs from 'dayjs'
import clone from 'clone'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const drag = ref(false)

const state = reactive({
  fileList: <any>[]
})

const uploadRef = ref<UploadInstance>()
const emit = defineEmits(['blur'])

const formItemOnChange = injectStrict(FormItemOnChangeKey)

const extraData = reactive({
  channel: 'gwin-cloud',
  fileName: 'licenseUri' + dayjs().valueOf() + '.' + (props.data.fileType ? props.data.fileType : 'jpge')
})

const hideUpload = computed(() => {
  return state.fileList.length >= (props.data.limit ? props.data.limit : 1)
})

// 文件数量限制
function onExceed() {
  ElMessage.error(`最多只能上传${props.data.limit ? props.data.limit : 1}个！`)
}

function beforeUpload(file: UploadRawFile) {
  // list-type 为text, picture, picture-card
  // 默认按图片上传
  const isImage = true
  if (props.data.listType === undefined || props.data.listType.indexOf('picture') >= 0) {
    const isImage = file.type.indexOf('image') >= 0
    if (!isImage) {
      ElMessage.error('上传图片只能是图片格式！')
    }
  }
  // 非图片暂时只判断大小，默认是5MB
  const sizeLimit = props.data.sizeLimit ? props.data.sizeLimit : 5
  const isLtSize = file.size / 1024 / 1024 < sizeLimit
  if (!isLtSize) {
    ElMessage.error(`上传文件大小不能超过${sizeLimit}MB!`)
  }
  extraData.fileName = 'licenseUri' + dayjs().valueOf() + file.name
  return isImage && isLtSize
}

function onSuccess(response: any, file: UploadFile, fileList: UploadFile[]) {
  state.fileList = fileList
}

function onError(error: Error, file: UploadFile, fileList: UploadFile[]) {
  console.error(error.message)
  ElMessage.error('上传失败，请重试！')
  state.fileList = fileList
}

function onChange(file: UploadFile, fileList: UploadFile[]) {
  state.fileList = fileList
  updateChange()
}

function onPreview(file: UploadFile) {
  dialogImageUrl.value = file.url ? file.url : ''
  dialogVisible.value = true
}

function onDeleteClick(file: UploadFile, index: number) {
  uploadRef.value?.abort(file)
  state.fileList.splice(index, 1)
  updateChange()
}

function onRemove(file: UploadFile, fileList: UploadFile[]) {
  state.fileList = fileList
  updateChange()
}

function updateChange() {
  const list: Record<string, any>[] = []
  state.fileList.forEach((item: UploadFile) => {
    if (props.data.autoUpload === false) {
      // 手动上传
      const target = {
        uid: item.uid,
        raw: item.raw
      }
      list.push(target)
    } else {
      // 自动上传
      if (item.status === 'success') {
        const response = item.response as Response
        if (response) {
          // 代表本次上传
          if (props.data.isDownload) {
            // 上传后需要下载
            const fileName = item.raw?.name ? item.raw.name : item.raw?.uid.toString()
            downloadBlob(response, fileName || dayjs(new Date()).valueOf().toString())
            state.fileList = []
          } else if (response.status.success) {
            // 上传后返回的为JSON
            const url = response.body.fileUrl as string
            const target = {
              uid: item.uid,
              url: url
            }
            list.push(target)
          }
        } else {
          // 代表以前上传
          const target = {
            uid: item.uid,
            url: item.url
          }
          list.push(target)
        }
      }
    }
  })
  formItemOnChange(props.itemKey, list)
  emit('blur')
}

function downloadBlob(response: any, fileName: string) {
  const blob = new Blob([response])
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = (e) => {
    const a = document.createElement('a')
    a.download = fileName
    a.href = (e.target && e.target.result) as string
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

function handleFileList() {
  if (props.data.value) {
    state.fileList = clone(props.data.value)
  }
  // props.data.value?.forEach((item: any) => {
  //   state.fileList.push({
  //     url: item.url
  //   })
  // })
}

function resetInstanceVariable() {
  state.fileList = []
}

defineExpose({
  resetInstanceVariable
})

onMounted(() => {
  handleFileList()
})
</script>
