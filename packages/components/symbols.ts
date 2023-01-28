import { InjectionKey } from 'vue'
import { FormItemOnChangeFunc } from './interface'

export const FormItemOnChangeKey: InjectionKey<FormItemOnChangeFunc> = Symbol('formItemOnChange')
