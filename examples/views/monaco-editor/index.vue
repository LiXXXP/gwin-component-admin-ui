<template>
  <div ref="container" class="monaco-editor"></div>
  <button class="run" @click="runCode">Run</button>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, onUnmounted, ref } from 'vue'
import '../userWorker'

interface Props {
  // 代码内容
  code?: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: 'typescript'
})

const container = ref<HTMLElement>()
let editor: monaco.editor.IStandaloneCodeEditor
let model: monaco.editor.ITextModel

const emits = defineEmits(['onCodeMounted', 'onCodeChange'])

// 初始化主题
function initTheme() {
  monaco.editor.defineTheme('GwinTheme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {}
  })
}

// 初始化model
function initModel() {
  let memoryModel = monaco.editor.getModel(monaco.Uri.parse('inmemory://model.json'))
  if (!memoryModel) {
    memoryModel = monaco.editor.createModel(props.code, props.language, monaco.Uri.parse('inmemory://model.json'))
  }
  model = memoryModel
}

function setModelValue(v = '') {
  model.setValue(v)
}

function setModelLanguage(language = 'typescript') {
  monaco.editor.setModelLanguage(model, language)
}

// 初始化monaco实例
function initMonaco() {
  setModelLanguage(props.language)
  setModelValue(props.code)

  editor = monaco.editor.create(container.value as HTMLElement, {
    // model: model,
    language: props.language,
    theme: 'GwinTheme',
    automaticLayout: true,
    lightbulb: {
      enabled: true
    }
  })
  createMonacoEvent()
  emits('onCodeMounted', editor)
}

// 创建Monaco事件
function createMonacoEvent() {
  // 监听IDE内容
  editor.onDidChangeModelContent(() => {
    emits('onCodeChange', editor)
  })
}

function runCode() {
  const v = editor.getValue()
  debugger
  // eslint-disable-next-line
  // const fun = eval(`(function(){return ${v}})()`)

  // fun.call()
  // eslint-disable-next-line
  eval(v)
}

onMounted(() => {
  initTheme()
  initModel()
  initMonaco()
})

onUnmounted(() => {
  editor.dispose()
})
</script>

<style lang="scss" scoped>
.monaco-editor {
  width: 100vw;
  height: 100vh;
  text-align: left;
}
.run {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
