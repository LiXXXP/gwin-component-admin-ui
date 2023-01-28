import { defineComponent, PropType } from 'vue'
import { ButtonItem } from '../interface'
import useUtils from '../useUtils'

const AdDropdownButton = defineComponent({
  name: 'AdDropdownButton',
  props: {
    data: {
      type: Object as PropType<ButtonItem>,
      default: () => ({})
    }
  },
  emits: ['onClick'],
  setup() {
    const { execStringOrFunction } = useUtils()
    return { execStringOrFunction }
  },
  render() {
    const { execStringOrFunction } = this
    return (
      <div class='ad-dropdown-button'>
        <el-button type='primary' size={this.$props.data.size}>
          {this.$props.data.label}
        </el-button>
        <div class='ad-dropdown-button__hide'>
          {this.$props.data.list &&
            this.$props.data.list.map((item: any) => (
              <el-button
                onClick={() => execStringOrFunction(item.onClick, this, this.$props.data)}
                size={this.$props.data.size}
                {...item}
              >
                {item.label}
              </el-button>
            ))}
        </div>
      </div>
    )
  }
})

export default AdDropdownButton
