import { defineComponent } from 'vue'
import { Option } from '~/components/interface'

const AdRender = defineComponent({
  name: 'AdRender',
  props: {
    itemKey: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    },
    isError: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return {}
  },
  render() {
    let value = this.$props.data.value
    if (this.$props.data.options) {
      const options = this.$props.data.options as Option[]
      options.some((item: Option) => {
        if (item.value === value) {
          value = item.label
          return true
        }
      })
    }
    const defaultStyle = {
      'line-height': '32px',
      'font-size': '14px',
      color: '#606a78'
    }
    const style = Object.assign(defaultStyle, this.$props.data.style)
    return this.$props.data.render ? (
      this.$props.data.render.call(this, this.$props)
    ) : (
      <div style={style} class='ad-el-item'>
        {value}
      </div>
    )
  }
})

export default AdRender
