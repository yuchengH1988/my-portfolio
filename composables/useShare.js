export const useShare = () => {
  const route = useRoute()

  // 獲取完整的URL
  const getFullURL = () => {
    return `${window.location.origin}${route.fullPath}`
  }

  // 分享到 Facebook
  const shareToFB = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getFullURL())}`

    window.open(url, '_blank', 'width=600,height=400')
  }

  // 分享到 LINE
  const shareToLine = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(getFullURL())}`

    window.open(url, '_blank', 'width=600,height=400')
  }

  // 複製連結
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getFullURL())
    } catch (err) {
      console.error('複製失敗:', err)
    }
  }

  return {
    shareToFB,
    shareToLine,
    copyLink
  }
}
