<script setup>
import P5 from 'p5'

/**
 * 各區塊主題參數（index 對應 Background activeIndex）
 * 0 home / 1 intro / 2 work / 3 exp
 *
 * 顏色格式：[H, S, B, A]
 * - H: 0–360 / S,B: 0–100 / A: 0–1
 * - fill: null  → 使用 home 原本 HSB 層疊填色
 * - angle: null → 跟隨滑鼠
 */
const SCENE_THEMES = [
  {
    id: 'home',
    bg: [0, 0, 0, 1],
    fill: null,
    stroke: [0, 0, 0, 0],
    strokeWeight: 0,
    angle: null,
    angleEase: 0.01,
    layers: 66
  },
  {
    id: 'intro',
    bg: [0, 0, 100, 0.8],
    fill: [0, 0, 53, 1], // ≈ #888
    stroke: [0, 0, 40, 1], // ≈ #666
    strokeWeight: 0.5,
    angle: 0.4,
    angleEase: 0.03,
    layers: 22
  },
  {
    id: 'work',
    bg: [0, 0, 100, 0.8],
    fill: [0, 0, 0, 1], // #000
    stroke: [0, 0, 20, 1], // ≈ #333
    strokeWeight: 0.5,
    angle: 0.6,
    angleEase: 0.03,
    layers: 33
  },
  {
    id: 'exp',
    bg: [0, 0, 0, 1],
    fill: null,
    stroke: [0, 0, 0, 0],
    strokeWeight: 0,
    angle: null,
    angleEase: 0.01,
    layers: 66
  }
]

const THEME_LERP = 0.04

const { $gsap } = useNuxtApp()
const canvasContainer = ref(null)
const coverEl = ref(null)
let sketchInstance = null

const props = defineProps({
  active: {
    type: Boolean,
    default: true
  },
  // 0 home / 1 intro / 2 work / 3 exp
  sceneIndex: {
    type: Number,
    default: 0
  }
})

const state = {
  targetIndex: props.sceneIndex
}

watch(() => props.active, (isActive) => {
  if (!sketchInstance) { return }
  isActive ? sketchInstance.loop() : sketchInstance.noLoop()
})

watch(() => props.sceneIndex, (index) => {
  const next = Math.max(0, Math.min(index, SCENE_THEMES.length - 1))
  state.targetIndex = next
}, { immediate: true })

onMounted(async () => {
  await nextTick()
  if (coverEl.value) {
    $gsap.fromTo(coverEl.value, {
      opacity: 1,
      backdropFilter: 'blur(20px)'
    }, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 3
    })
  }

  const sketch = (p) => {
    let canvasSize, r
    let speed = 2
    let rotateAngle = 0.5
    let colorPhase = 0

    // 目前插值中的主題狀態（HSB + alpha）
    const cur = {
      bg: [...SCENE_THEMES[0].bg],
      fill: [0, 0, 0, 1],
      stroke: [...SCENE_THEMES[0].stroke],
      strokeWeight: 0,
      angleEase: 0.01,
      layers: 66,
      homeFillMix: 1 // 1 = home 層疊填色，0 = 主題 fill
    }

    p.setup = () => {
      p.colorMode(p.HSB, 360, 100, 100, 1)
      rotateAngle = p.PI / 180 * 15
      p.noStroke()

      canvasSize = p.windowWidth > p.windowHeight
        ? p.windowHeight
        : p.windowWidth

      const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent(canvasContainer.value)
      p.background(0)
      p.frameRate(60)
    }

    p.draw = () => {
      p.colorMode(p.HSB, 360, 100, 100, 1)

      const target = SCENE_THEMES[state.targetIndex] || SCENE_THEMES[0]
      const mouseAngle = p.map(p.mouseX, 0, canvasSize - 50, 0.1, 0.65, true)
      const targetAngle = target.angle == null ? mouseAngle : target.angle
      const targetHomeMix = target.fill == null ? 1 : 0
      const targetFill = target.fill ? [...target.fill] : cur.fill
      const targetStroke = [...target.stroke]
      const targetBg = [...target.bg]

      // 參數 lerp 到目標主題
      for (let i = 0; i < 4; i++) {
        cur.bg[i] = p.lerp(cur.bg[i], targetBg[i], THEME_LERP)
        cur.fill[i] = p.lerp(cur.fill[i], targetFill[i], THEME_LERP)
        cur.stroke[i] = p.lerp(cur.stroke[i], targetStroke[i], THEME_LERP)
      }
      cur.strokeWeight = p.lerp(cur.strokeWeight, target.strokeWeight, THEME_LERP)
      cur.angleEase = p.lerp(cur.angleEase, target.angleEase, THEME_LERP)
      cur.layers = p.lerp(cur.layers, target.layers, THEME_LERP)
      cur.homeFillMix = p.lerp(cur.homeFillMix, targetHomeMix, THEME_LERP)

      rotateAngle = p.lerp(rotateAngle, targetAngle, cur.angleEase)

      // 底色
      p.push()
      p.fill(cur.bg[0], cur.bg[1], cur.bg[2], cur.bg[3])
      p.noStroke()
      p.rect(0, 0, p.windowWidth, p.windowHeight)
      p.pop()

      const shadowSpeed = p.map(Math.abs(canvasSize / 2 - p.mouseY), 0, canvasSize / 2, 1, 3, true)
      speed = p.lerp(speed, shadowSpeed, 0.015)
      colorPhase = (colorPhase + speed * Math.min(p.deltaTime, 32) / 16.6667) % 140

      r = p.createVector(canvasSize * 1.1, 0)
      r.rotate(p.PI / 8)

      p.translate(p.windowWidth / 2, p.windowHeight / 2)

      p.push()
      p.stroke(cur.stroke[0], cur.stroke[1], cur.stroke[2], cur.stroke[3])
      p.strokeWeight(cur.strokeWeight)

      const layerCount = Math.max(1, Math.round(cur.layers))
      for (let x = 0; x < layerCount; x++) {
        // home 層疊填色
        const paintColor = x % 2 === 0 ? p.color(0, 0, 20) : p.color(0, 0, 30) // #333 / #4C4C4C
        const homeFill = p.color(
          0,
          p.saturation(paintColor),
          colorCircle(p.brightness(paintColor) + x * 7 + colorPhase),
          0.03
        )

        // 主題實色填色
        const themeFill = p.color(cur.fill[0], cur.fill[1], cur.fill[2], cur.fill[3])
        const fillNow = p.lerpColor(themeFill, homeFill, cur.homeFillMix)
        p.fill(fillNow)
        paintOctagon(r)

        const newAngle = p.createVector(1, 0).angleBetween(r) + rotateAngle
        const d = p.createVector(0, 0).dist(r)
        r = p.createVector(
          d * p.sin(p.PI * 3 / 8) / p.sin(p.PI * 5 / 8 - rotateAngle),
          0
        ).rotate(newAngle)
      }
      p.pop()
    }

    function paintOctagon (startVector) {
      const d = startVector.copy()
      p.beginShape()
      for (let i = 0; i < 8; i++) {
        p.vertex(d.x, d.y)
        d.rotate(p.PI / 4)
      }
      p.endShape(p.CLOSE)
    }

    function colorCircle (number) {
      number = number % 140
      return number > 70 ? 140 - number + 30 : number + 30
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      canvasSize = p.windowWidth > p.windowHeight
        ? p.windowHeight * 0.9
        : p.windowWidth * 0.9
    }
  }

  sketchInstance = new P5(sketch)
  if (props.active) {
    sketchInstance.loop()
  } else {
    sketchInstance.noLoop()
  }
})

onBeforeUnmount(() => {
  if (sketchInstance) { sketchInstance.remove() }
})
</script>

<template>
  <div class="absolute inset-0">
    <div ref="canvasContainer" class="absolute inset-0"></div>
    <div ref="coverEl" class="absolute inset-0 bg-black"></div>
  </div>
</template>

<style scoped>
canvas {
  display: block;
}
</style>
