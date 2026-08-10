import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

export const fadeIn = { // 全域註冊 GSAP Effect
  name: 'fadeIn', // 註冊效果名稱
  effect: (targets, config) => {
    gsap.set(targets, { opacity: 0, y: '20%' })

    return gsap.to(targets, { duration: config.duration, opacity: 1, y: '0%' }) // 實際執行的效果
  },
  defaults: { duration: 0.5 },
  extendTimeline: true
}

export const fadeOut = {
  name: 'fadeOut',
  effect: (targets, config) => {
    return gsap.to(targets, { duration: config.duration, opacity: 0 })
  },
  defaults: { duration: 0.5 },
  extendTimeline: true
}

// 註冊類似 AOS 效果，自訂一個 data-*
// 手機注意：勿用 end: 'bottom 10%' + onLeave，長區塊會在畫面中間被淡出；
// 網址列縮放會改 viewport，須搭配 ScrollTrigger.refresh。
export const aosFadeIn = {
  name: 'aosFadeIn',
  effect: (_, config = {}) => {
    const {
      duration = 0.6,
      delay = 0,
      markers = false,
      once = false
    } = config

    const tweenDefaults = {
      duration,
      delay,
      ease: 'power2.out',
      overwrite: 'auto'
    }

    // 用 px，避免 % 位移在寬元素 / overflow 下被裁切成「消失」
    const directions = {
      up: { from: { y: 32 }, to: { y: 0 } },
      left: { from: { x: -24 }, to: { x: 0 } },
      right: { from: { x: 24 }, to: { x: 0 } }
    }

    ScrollTrigger.getAll().forEach((trigger) => {
      if (String(trigger.vars.id || '').startsWith('aosFadeIn:')) {
        trigger.kill()
      }
    })

    Object.entries(directions).forEach(([dir, { from, to }]) => {
      const targets = gsap.utils.toArray(`[data-fade="${dir}"]`)
      if (!targets.length) {
        return
      }

      targets.forEach((target, index) => {
        gsap.killTweensOf(target)

        gsap.fromTo(target, {
          autoAlpha: 0,
          ...from,
          force3D: true
        }, {
          autoAlpha: 1,
          ...to,
          ...tweenDefaults,
          scrollTrigger: {
            id: `aosFadeIn:${dir}:${index}`,
            trigger: target,
            start: 'top 90%',
            once,
            markers,
            invalidateOnRefresh: true,
            toggleActions: once ? 'play none none none' : 'play none none reverse'
          }
        })
      })
    })

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }
}

export const aosParallaxZoom = {
  name: 'aosParallaxZoom',
  effect: (_, config) => {
    gsap.set('[data-parallax="zoom"]', { clipPath: 'inset(100% 0 0 0)' })
    gsap.set('[data-parallax="zoom"] > div', { scale: 1.5, yPercent: 20 })

    return ScrollTrigger.batch('[data-parallax="zoom"]', {
      start: 'top 60%',
      onEnter: (elements, triggers) => {
        gsap.timeline({
          defaults: {
            duration: 1.2,
            ease: 'power3.easeOut'
          }
        })
          .add('start')
          .to(elements[0], { clipPath: 'inset(0% 0 0 0)' }, 'start')
          .to(elements[0].querySelector('div'), { scale: 1, yPercent: 0 }, 'start')
      },
      onEnterBack: (elements, triggers) => {
        gsap.timeline({
          defaults: {
            duration: 1.2,
            ease: 'power3.easeOut'
          }
        })
          .add('start')
          .to(elements[0], { clipPath: 'inset(0% 0 0 0)' }, 'start')
          .to(elements[0].querySelector('div'), { scale: 1, yPercent: 0 }, 'start')
      }
    })
  }
}

export const counter = {
  name: 'counter',
  extendTimeline: true,
  defaults: {
    end: 0,
    duration: 0.5,
    increment: 1
  },
  effect: (targets, config) => {
    const tl = gsap.timeline()
    const num = targets[0].innerText

    targets[0].innerText = Number(num)
    tl.from(
      targets,
      {
        duration: config.duration,
        innerText: config.end,
        snap: { innerText: config.increment },
        modifiers: {
          innerText (innerText) {
            return gsap.utils
              .snap(config.increment, innerText)
              .toString().padStart(2, '0')
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
        },
        ease: config.ease
      },
      0
    )

    return tl
  }
}

export const rollingCounter = {
  // 只適用 0~100
  name: 'rollingCounter',
  extendTimeline: true,
  defaults: {
    progress: 1, // 代表數字 100
    duration: 5,
    ease: 'power3.inOut'
  },
  effect: (targets, config) => {
    gsap.set(targets, { y: '0%' })

    const DURATION = 5
    const tl = () => {
      const self = gsap.timeline({
        defaults: {
          ease: 'none',
          duration: DURATION
        },
        paused: true
      }).add('start')
        .to(targets[0], { y: '-=100%', duration: DURATION }, 'start') // 百位數
        .to(targets[1], { y: '-=1000%', duration: DURATION }, 'start') // 十位數
        .to(targets[2], { y: '-=1000%', repeat: 9, duration: DURATION / 10 }, 'start') // 個位數

      return self
    }

    return gsap.to(tl(), {
      progress: config.progress,
      duration: config.duration,
      ease: config.ease
    })
  }
}

export const marquee = {
  name: 'marquee',
  extendTimeline: true,
  defaults: {
    duration: 10,
    repeat: -1,
    ease: 'none',
    direction: 'left'
  },
  effect: (targets, config) => {
    gsap.set(targets, { x: '0%' })

    const tl = gsap.timeline({
      defaults: {
        duration: config.duration,
        ease: config.ease
      },
      repeat: config.repeat,
      onReverseComplete () { tl.progress(1) }
    }).to(targets, {
      x: () => {
        return config.direction === 'left' ? '-100%' : '100%'
      }
    }, 'start')

    const timeScaleClamp = gsap.utils.clamp(1, 6)

    if (!config.withoutScroll) {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === 1) {
            tl.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)))
          } else if (self.direction === -1) {
            tl.timeScale(-timeScaleClamp(Math.abs(self.getVelocity() / 200)))
          }
        }
      })
    }

    return tl
  }
}
