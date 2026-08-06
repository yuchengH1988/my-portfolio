<script setup>
import P5 from 'p5'
const { $gsap } = useNuxtApp()
const canvasContainer = ref(null)
const coverEl = ref(null)
let sketchInstance = null
let observer = null

onMounted(async () => {
  await nextTick()
  const tl = $gsap.timeline()
  tl.fromTo(coverEl.value, {
    opacity: 1,
    backdropFilter: 'blur(20px)'
  },
  {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    duration: 3
  })
  const sketch = (p) => {
    let canvasSize, r
    const bg = 0
    let speed = 2
    let rotateAngle = 0.5
    let colorPhase = 0

    p.setup = () => {
      p.colorMode(p.HSB, 360, 100, 100, 1)

      rotateAngle = p.PI / 180 * 15
      p.noStroke()
      p.background(255)

      canvasSize = p.windowWidth > p.windowHeight
        ? p.windowHeight
        : p.windowWidth

      const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent(canvasContainer.value)

      p.strokeWeight(0)
      p.frameRate(60)
    }

    p.draw = () => {
      const toAngle = p.map(p.mouseX, 0, canvasSize - 50, 0.1, 0.65, true)
      rotateAngle = p.lerp(rotateAngle, toAngle, 0.01)

      p.fill(bg)
      p.rect(0, 0, p.windowWidth, p.windowHeight)

      const shadowSpeed = p.map(Math.abs(canvasSize / 2 - p.mouseY), 0, canvasSize / 2, 1, 3, true)
      speed = p.lerp(speed, shadowSpeed, 0.015)
      colorPhase = (colorPhase + speed * Math.min(p.deltaTime, 32) / 16.6667) % 140

      r = p.createVector(canvasSize * 1.1, 0)
      r.rotate(p.PI / 8)

      p.translate(p.windowWidth / 2, p.windowHeight / 2)

      p.push()
      p.colorMode(p.HSB)

      for (let x = 0; x < 66; x++) {
        const paintColor = x % 2 === 0 ? p.color('#333') : p.color('#4C4C4C')
        p.fill(
          0,
          p.saturation(paintColor),
          colorCircle(p.brightness(paintColor) + x * 7 + colorPhase),
          0.03
        )
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

    // 視窗大小改變時，同步調整畫布與參考尺寸
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      canvasSize = p.windowWidth > p.windowHeight
        ? p.windowHeight * 0.9
        : p.windowWidth * 0.9
    }
  }

  sketchInstance = new P5(sketch)
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!sketchInstance) { return }
        if (entry.isIntersecting) {
          // 可見 → 啟動
          sketchInstance.loop()
        } else {
          // 離開視窗 → 停止 draw()
          sketchInstance.noLoop()
        }
      })
    },
    {
      threshold: 0.01 // 超過 5% 可見時才算顯示
    }
  )

  if (canvasContainer.value) { observer.observe(canvasContainer.value) }
})

onBeforeUnmount(() => {
  if (observer && canvasContainer.value) { observer.unobserve(canvasContainer.value) }
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
