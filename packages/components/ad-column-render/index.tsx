import { ComponentInternalInstance, defineComponent, PropType } from 'vue-demi'
import { ColumnItems } from '../interface'

const AdColumnRender = defineComponent({
  name: 'AdColumnRender',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    column: {
      type: Object as PropType<ColumnItems>,
      default: () => ({})
    },
    tablePage: {
      type: Object as PropType<ComponentInternalInstance | null>,
      default: () => ({})
    }
  },
  setup() {
    return {}
  },
  render() {
    return this.$props.column.tsx ? (
      this.$props.column.tsx.call(this, this.$props.tablePage, this.$props.data)
    ) : (
      <div></div>
    )
  }
})

export default AdColumnRender
