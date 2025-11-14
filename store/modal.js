// eslint-disable-next-line node/no-extraneous-import
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const infoModal = ref({
    isOpen: false,
    title: '',
    message: '',
    icon: '',
    confirmText: '確定',
    confirm: null
  })

  function openInfoModal ({ title, message, icon, confirmText, confirm }) {
    /**
     * Fire 資訊類型的 Modal
     * @param {string} title 標題
     * @param {string} message 訊息
     * @param {string} icon 圖片路徑
     * @param {string} confirmText 確認按鈕文字
     * @param {function} confirm 確認按鈕的 callback
     */
    infoModal.value = {
      isOpen: true,
      icon,
      title,
      message,
      confirmText,
      confirm
    }
  }

  const alertModal = ref({
    isOpen: false,
    message: 'Warning：message',
    size: 'md',
    position: 'center',
    autoClose: false
  })

  function openAlertModal ({ message, size, position }) {
    /**
     * Fire 資訊類型的 Modal
     * @param {boolean} isOpen 是否開啟
     * @param {string} message 訊息
     * @param {string} position 位置
     * @param {boolean} autoClose 是否自動關閉
     */
    alertModal.value = {
      isOpen: true,
      message,
      size,
      position
    }
  }

  const timeAlertModal = ref({
    isOpen: false,
    message: 'Warning：message',
    alertIcon: 'alert',
    type: 'success',
    time: 3000,
    confirm: null
  })

  function openTimeAlertModal ({ isOpen, message, type, alertIcon, time, confirm }) {
    /**
     * Fire 資訊類型的 Modal
     * @param {boolean} isOpen 是否開啟
     * @param {string} message 訊息
     * @param {string} type 類型代表顏色
     * @values 'success' | 'warning'
     * @param {string} alertIcon 警告 icon
     * @param {function} confirm 確認按鈕的 callback
     */
    // 如果有更新，就替換原本的值
    timeAlertModal.value = {
      isOpen,
      message,
      type,
      alertIcon,
      time,
      confirm
    }
  }

  return {
    infoModal,
    openInfoModal,
    alertModal,
    openAlertModal,
    timeAlertModal,
    openTimeAlertModal
  }
})
