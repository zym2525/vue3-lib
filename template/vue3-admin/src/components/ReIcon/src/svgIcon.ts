import { h, defineComponent } from 'vue'
import { isExternal } from '@/utils'

export default defineComponent({
  name: 'svgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#fff',
    },
    size: {
      type: String,
      default: '14px',
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
      }
    },
  },
  render() {
    return this.isExternal
      ? h(
        'div',
        {
          style: this.styleExternalIcon,
          class: 'svg-external-icon svg-icon"',
        },
        this.icon
      )
      : h(
        'svg',
        {
          class: this.svgClass,
          'aria-hidden': true,
          width: this.size,
          height: this.size,
        },
        [
          h(
            'use',
            {
              'xlink:href': this.iconName,
              fill: this.color,
            },
            null
          ),
        ]
      )
  },
})
