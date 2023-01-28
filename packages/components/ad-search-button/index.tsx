import { defineComponent, PropType } from 'vue'
import { ButtonItem } from '../interface'
import AdImport from './import.vue'

const AdSearchButton = defineComponent({
  name: 'AdSearchButton',
  component: [AdImport],
  props: {
    data: {
      type: Object as PropType<ButtonItem>,
      default: () => ({})
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  emits: ['onClick'],
  setup() {
    return {}
  },
  render() {
    if (this.$props.data.isImport) {
      return <AdImport data={this.$props.data}></AdImport>
    }
    return this.$props.data.render ? (
      this.$props.data.render.call(this, this.$props.data)
    ) : (
      <el-button
        size={this.$props.size}
        class='ad-search-button'
        style={this.$props.data.style}
        onClick={() => this.$emit('onClick', this.$props.data.onClick)}
        type={this.$props.data.type}
        text={this.$props.data.text}
        icon={this.$props.data.icon}
      >
        {this.$props.data.label}
      </el-button>
    )
  }
})

export default AdSearchButton
