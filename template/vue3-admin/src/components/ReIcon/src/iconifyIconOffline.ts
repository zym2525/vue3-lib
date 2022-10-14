import { h, defineComponent } from 'vue'
import { Icon as IconifyIcon, addIcon } from '@iconify/vue/dist/offline'

// element-plus icon
import Tickets from '@iconify-icons/ep/tickets'
import RefreshRight from '@iconify-icons/ep/refresh-right'
import ArrowDown from '@iconify-icons/ep/arrow-down'
import CloseBold from '@iconify-icons/ep/close-bold'
import Delete from '@iconify-icons/ep/delete'
addIcon('tickets', Tickets)
addIcon('refresh-right', RefreshRight)
addIcon('arrow-down', ArrowDown)
addIcon('close-bold', CloseBold)
addIcon('delete', Delete)

// remixicon
import arrowRightSLine from '@iconify-icons/ri/arrow-right-s-line'
import arrowLeftSLine from '@iconify-icons/ri/arrow-left-s-line'
import logoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line'

addIcon('arrow-right-s-line', arrowRightSLine)
addIcon('arrow-left-s-line', arrowLeftSLine)
addIcon('logout-circle-r-line', logoutCircleRLine)

// Iconify Icon在Vue里离线使用（用于内网环境）https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
  name: 'IconifyIcon',
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  render() {
    const attrs = this.$attrs
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        ...attrs,
      },
      {
        default: () => [],
      }
    )
  },
})
