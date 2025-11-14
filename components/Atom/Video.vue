<script setup>
const props = defineProps({
  /**
   * 影片元件 ID
   * @type {String}
   */
  id: {
    type: String,
    default: ''
  },
  /**
   * 原生 video 播放器是影片路徑，如果是 Youtube 影片，則是影片 ID
   * @type {String}
   */
  videoSrc: {
    type: String,
    default: ''
  },
  /**
   * 比例是否要使用影片比例
   * @type {Boolean}
   */
  videoAspect: {
    type: Boolean,
    default: true
  },
  /**
   * 是否自動播放
   * @type {Boolean}
   */
  autoplay: {
    type: Boolean,
    default: false
  },
  /**
   * 是否靜音播放
   * @type {Boolean}
   */
  muted: {
    type: Boolean,
    default: false
  },
  /**
   * 是否循環播放
   * @type {Boolean}
   */
  loop: {
    type: Boolean,
    default: false
  },
  /**
   * 是否內聯播放
   * @type {Boolean}
   */
  playsinline: {
    type: Boolean,
    default: false
  },
  /**
   * 影片封面
   * @type {String}
   */
  coverImage: {
    type: String,
    default: ''
  },
  /**
   * 是否為 Youtube 影片
   * @type {Boolean}
   */
  isYtVideo: {
    type: Boolean,
    default: false
  },
  /**
   * 是否有預設圓角
   * @type {Boolean}
   */
  isRounded: {
    type: Boolean,
    default: false
  },
  /**
   * 外部控制播放
   */
  pause: {
    type: Boolean,
    default: false
  },
  /**
   * 是否顯示控制列
   * @type {Boolean}
   */
  controls: {
    type: Boolean,
    default: false
  }
})
const { id, videoSrc, videoAspect, autoplay, muted, loop, playsinline, coverImage, isYtVideo, isRounded, pause, controls } = toRefs(props)

// 如果有封面圖片，自動播放關閉
const isAutoPlay = ref(autoplay.value)

if (coverImage.value) {
  isAutoPlay.value = false
}

/**
 * 影片對應到的 DOM ref=video
 * @type {Object}
 */
const video = ref(null)
/**
 * Youtube 影片對應到的 DOM ref=ytVideo
 * @type {Object}
 */
const ytVideo = ref(null)
/**
 * Youtube 影片播放器
 * @type {Object}
 */
const player = ref(null)

const isPlay = ref(false)

/**
 * 播放影片
 * @type {Function}
 */
function playVideo () {
  isPlay.value = true

  if (isYtVideo.value) {
    player.value.playVideo()
  } else {
    video.value.play()
  }
}

/*
 * 暫停影片
 */
function pauseVideo () {
  isPlay.value = false

  if (isYtVideo.value) {
    player.value.pauseVideo()
  } else {
    video.value.pause()
  }
}

watch(pause, (value) => {
  if (value) {
    pauseVideo()
  } else if (!value) {
    if (autoplay.value) {
      playVideo()
    }
  }
})

const onYouTubeIframeAPIReady = (target, videoId) => {
  window.YT.ready(() => {
    player.value = new window.YT.Player(target, {
      fitToBackground: true,
      height: '100%',
      width: '100%',
      src: `https://www.youtube-nocookie.com/embed/${videoId}`,
      videoId: videoId || '', // Youtu ID
      playerVars: {
        referer: window.location.href,
        // origin: config.public.APP_URL,
        autoplay: autoplay.value ? 1 : 0, // 不自動播放影片
        showinfo: 0, // 隱藏影片標題
        controls: controls.value ? 1 : 0, // 控制列，0:隱藏，1:顯示(默認)
        fs: 1, // 全屏按鈕，0:隱藏，1:顯示(默認)
        iv_load_policy: 0, // 影片註釋，1:顯示(默認)，3:不顯示
        rel: 0, // 顯示相關影片，0:不顯示，1:顯示(默認)
        modestbranding: 0, // YouTube標籤，0:顯示(默認)，1:不顯示
        playsinline: 1, // 在iOS的播放器中全屏播放，0:全屏(默認)，1:內嵌
        cc_load_policty: 0, // 隱藏字幕
        autohide: 0 // 影片播放時，隱藏影片控制列
      }
    })
  })
}

onMounted(() => {
  if (isYtVideo.value) {
    onYouTubeIframeAPIReady(ytVideo.value, videoSrc.value)
  }
})

const isMute = ref(false)

if (muted.value) {
  isMute.value = true
}

function muteVideo () {
  isMute.value = !isMute.value

  if (isMute.value) {
    video.value.muted = 'muted'
  } else {
    video.value.muted = ''
  }
}

</script>

<template>
  <div
    class="relative w-full overflow-hidden "
    :class="{'aspect-video':videoAspect,
             'rounded-3xl':isRounded
    }"
  >
    <div
      class="group/cover absolute inset-0 z-1 flex cursor-pointer items-center justify-center duration-300"
      :class="{'pointer-events-none opacity-0':isPlay}"
      :style="`background-image: url('${coverImage}'); background-size: cover;`"
    >
      <div class="absolute inset-0 z-1 bg-black/20 duration-300 group-hover/cover:bg-black/40"></div>
      <img class="relative z-2 h-10 w-10 object-contain lg:h-20 lg:w-20" src="@/assets/images/control/play.svg" alt="play-video" @click="playVideo" />
    </div>
    <div
      v-if="isYtVideo"
      :id="id"
      ref="ytVideo"
      class="h-full w-full"
    ></div>
    <video
      v-else
      :id="id"
      ref="video"
      class="h-full w-full object-cover"
      :src="videoSrc"
      :autoplay="isAutoPlay"
      :muted="muted"
      :loop="loop"
      :playsinline="playsinline"
      :controls="controls"
    ></video>
  </div>
</template>
