// 複製文字
import { useModalStore } from '@/store/modal'

export function copyText (text) {
  const { openAlertModal } = toRefs(useModalStore())

  const el = document.createElement('textarea')

  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  openAlertModal.value({
    isOpen: true,
    message: '已複製到剪貼簿',
    position: 'center',
    autoClose: true,
    actionIcon: 'check'
  })
}


export const changeStatus = (target) => {
  useRouter().push({
    query: {
      ...useRoute().query,
      status: target
    }
  })
}
