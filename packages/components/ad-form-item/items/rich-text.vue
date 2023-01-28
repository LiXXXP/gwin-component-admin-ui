<template>
  <div class="ad-el-item ad-rich-text">
    <Editor id="tinymce" v-model="bindData" :init="state.init"></Editor>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/icons/default/icons.js' // 引入图标包 icons.js
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

import contentUiSkinCss from 'tinymce/skins/ui/oxide/content.css'
import contentCss from 'tinymce/skins/content/default/content.css'
import skinCss from 'tinymce/skins/ui/oxide/skin.css'

import { FormItemOnChangeKey } from '../../symbols'
import { injectStrict } from '../../utils'
import { fa } from 'element-plus/es/locale'

export interface Props {
  itemKey: string
  data: Record<string, any>
  isError?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const bindData = ref('')

const emit = defineEmits(['blur'])

const formItemOnChange = injectStrict(FormItemOnChangeKey)

onMounted(() => {
  if (props.data.value) {
    bindData.value = props.data.value
  }
  tinymce.init({})
})

const state = reactive({
  init: {
    // 中文
    selector: '#tinymce',
    language_url: 'https://admin.cdgwin.com/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    min_height: 380,
    max_height: 380,
    width: props.data.style && props.data.style.width ? props.data.style.width : 500,
    plugins: 'image',
    toolbar:
      'undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat',
    toolbar_drawer: 'sliding',
    deprecation_warnings: false,
    branding: false,
    resize: false,
    skin: false,
    skin_style: skinCss.toString(),
    content_css: false,
    content_style: contentUiSkinCss.toString() + '\n' + contentCss.toString(),
    setup: (editor: any) => {
      editor.on('blur', () => {
        emit('blur')
      })
      editor.on('change', (event: Record<string, any>) => {
        onInput(event.level.content)
      })
    },
    images_upload_handler(blobInfo: any, success: any, failure: any) {
      const xhr = new XMLHttpRequest()
      const file = blobInfo.blob()
      xhr.withCredentials = false
      xhr.open('POST', '/api/cos/v1/FileUpload', true)
      xhr.onload = function () {
        var json
        if (xhr.status === 403) {
          failure('HTTP Error: ' + xhr.status, { remove: true })
          return
        }
        if (xhr.status < 200 || xhr.status >= 300) {
          failure('HTTP Error: ' + xhr.status)
          return
        }
        json = JSON.parse(xhr.responseText)
        json.location = json.body.fileUrl
        if (!json || typeof json.location !== 'string') {
          failure('Invalid JSON: ' + xhr.responseText)
          console.log(xhr)
          return
        }
        success(json.location)
      }
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileName', file.name)
      formData.append('channel', 'gwin-cloud')
      xhr.send(formData)
    }
  }
})

function onInput(value: string) {
  formItemOnChange(props.itemKey, value)
}

function resetInstanceVariable() {
  bindData.value = ''
}

defineExpose({
  resetInstanceVariable
})
</script>
