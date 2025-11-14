<script setup>
import P5 from 'p5'

const canvasContainer = ref(null)
let sketchInstance = null
let observer = null

onMounted(async () => {
  await nextTick()

  const sketch = (p) => {
    // 將原本的全域變數收斂在 instance 裡
    let circleR
    const olb = 20
    let angle = 0
    let c1, c2, radius, setR, sizeControl, sizeR

    p.setup = () => {
      // 色碼搭配
      c1 = p.color('#FFF')
      c2 = p.color('#555')

      // 建立滿版畫布（WEBGL）
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
      canvas.parent(canvasContainer.value)

      // 依較短邊決定基準半徑
      setR = (p.windowWidth > p.windowHeight ? p.windowHeight : p.windowWidth) * 0.36

      p.background(255)
      p.noStroke()
      p.frameRate(30)
    }

    p.draw = () => {
      p.background('#000')

      p.rotateX(p.HALF_PI)
      p.rotateZ(angle)
      // 自轉軸調整
      p.rotateY(p.sin(p.frameCount / 100) * p.PI / 5)

      sizeControl = 0.7 + 0.3 * p.sin(p.frameCount / 50)
      sizeR = sizeControl * setR

      // 球點大小
      circleR = 6 + 2 * p.sin(p.frameCount / 6)

      for (let y = 0; y < olb; y++) {
        const xAngle = 2 * y * p.PI / olb
        const t = (p.sin((p.frameCount + y * 5) / 6) + 1) / 2
        p.fill(p.lerpColor(c1, c2, t))

        // y 軸半徑縮放
        radius = sizeR + 50 * p.sin((p.frameCount + y) / 10)

        for (let i = 0; i < olb; i++) {
          const yAngle = 2 * i * p.PI / olb
          const x = radius * p.sin(xAngle) * p.cos(yAngle)
          const yy = radius * p.sin(yAngle) * p.sin(xAngle) // 避免覆蓋 y 變數名
          const z = radius * p.cos(xAngle)

          p.push()
          p.translate(x, yy, z)
          p.circle(0, 0, circleR)
          p.pop()
        }
      }

      angle += 0.01
    }

    // 視窗縮放時調整畫布與基準半徑
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      setR = (p.windowWidth > p.windowHeight ? p.windowHeight : p.windowWidth) * 0.36
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
      threshold: 0.05 // 超過 5% 可見時才算顯示
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
  <div ref="canvasContainer" class="absolute inset-0"></div>
</template>

<style scoped>
canvas { display: block; }
</style>
