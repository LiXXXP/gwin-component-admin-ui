import { AdUIFunction, Api, FormItem } from './interface'
import { Request } from '@gwin/networking'
import { getCurrentInstance, reactive } from 'vue-demi'

const extra = reactive({})

export default function useUtils() {
  const ctx = getCurrentInstance()

  function getTargetFormItem(formItems: FormItem[][], key?: string): FormItem | undefined {
    let targetItem
    for (let i = 0; i < formItems.length; i++) {
      const items = formItems[i]
      targetItem = items.find((i) => i.key === key)
      if (targetItem) {
        break
      }
    }
    return targetItem
  }

  function getFormItemsCount(formItems: FormItem[][]) {
    let count = 0
    formItems.forEach((items) => {
      count += items.length
    })
    return count
  }

  // 对path二次处理，使用data中的数据替换path中的变量
  function handleApiPath(path: string | undefined, data: Record<string, any> = {}) {
    if (!path) return ''
    return path.replace(/\$\{(.*?)\}/g, function (all, key) {
      return data[key]
    })
  }

  // 非字符串型函数 "(() => {})()" 和 "(function fn(){})()"
  function isNotStringFunction(func: AdUIFunction) {
    return typeof func === 'string' && func.indexOf('=>') < 0 && func.indexOf('function') < 0
  }

  function execStringOrFunction(func: any, ctx: any, params: any, actions?: Record<string, any>, ...r: any[]) {
    try {
      if (typeof func === 'function') {
        return func.call(ctx, params, ...r)
      } else if (isNotStringFunction(func) && actions) {
        return actions[func].call(ctx, params, ...r)
      } else if (Array.isArray(func)) {
        func.forEach((item) => {
          execStringOrFunction(item, ctx, params, actions, ...r)
        })
        return
      }
      // eslint-disable-next-line no-eval
      return eval(func)
    } catch (error) {
      console.error(`执行函数${func}失败`, error)
    }
  }

  async function sendApi(api: Api, params: any = {}, isLoading = false, isMessage = false) {
    if (!api.path) return
    if (api.mock) {
      return new Promise((resolve) => {
        resolve(api.mock)
      })
    }
    let targetParams = params
    if (api.handleParams) {
      targetParams = execStringOrFunction(api.handleParams, ctx, params)
    }
    const request = new Request<any>({
      url: handleApiPath(api.path, targetParams),
      params: targetParams,
      isLoading: isLoading,
      isMessage: isMessage,
      isError: true,
      config: api.config
    })
    return request
      .start()
      .then((result) => {
        let body = result.body
        if (api.handleResult) {
          body = execStringOrFunction(api.handleResult, ctx, body)
        }
        if (api.success) {
          execStringOrFunction(api.success, ctx, body)
        }
        return body
      })
      .catch((err) => {
        console.error(`接口请求错误 --> sendApi`, err)
        if (api.error) {
          execStringOrFunction(api.error, ctx, err)
        }
        throw err
      })
  }
  return {
    getFormItemsCount,
    getTargetFormItem,
    handleApiPath,
    isNotStringFunction,
    execStringOrFunction,
    sendApi,
    extra
  }
}
