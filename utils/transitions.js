/**
 * 預先寫好的 Transition 效果，是使用 Tailwind CSS 的 class
 *
 * 使用方式：
 * <Transition :v-bind="transitionName">
 *
 * 官方詳細文件：
 * @see https://cn.vuejs.org/guide/built-ins/transition.html
 */

export const fadeTransition = {
  enterActiveClass: 'transition ease-out duration-500 absolute',
  leaveActiveClass: 'transition ease-out duration-500 absolute',
  enterFromClass: 'opacity-0',
  leaveFromClass: 'opacity-100',
  enterToClass: 'opacity-100',
  leaveToClass: 'opacity-0'
}

export const leftFadeTransition = {
  enterActiveClass: 'transition ease-out duration-500 absolute',
  leaveActiveClass: 'transition ease-out duration-500 absolute',
  enterFromClass: 'opacity-0 translate-x-6',
  leaveFromClass: 'opacity-100 translate-x-0',
  enterToClass: 'opacity-100 translate-x-0',
  leaveToClass: 'opacity-0 -translate-x-6'
}

export const rightFadeTransition = {
  enterActiveClass: 'transition ease-out duration-500 absolute',
  leaveActiveClass: 'transition ease-out duration-500 absolute',
  enterFromClass: 'opacity-0 -translate-x-6',
  leaveFromClass: 'opacity-100 translate-x-0',
  enterToClass: 'opacity-100 translate-x-0',
  leaveToClass: 'opacity-0 translate-x-6'
}

export const upFadeTransition = {
  enterActiveClass: 'transition ease-out duration-500 absolute',
  leaveActiveClass: 'transition ease-out duration-500 absolute',
  enterFromClass: 'opacity-0 translate-y-6',
  leaveFromClass: 'opacity-100 translate-y-0',
  enterToClass: 'opacity-100 translate-y-0',
  leaveToClass: 'opacity-0 -translate-y-6'
}
export const downFadeTransition = {
  enterActiveClass: 'transition ease-out duration-500 absolute',
  leaveActiveClass: 'transition ease-out duration-500 absolute',
  enterFromClass: 'opacity-0 -translate-y-6',
  leaveFromClass: 'opacity-100 translate-y-0',
  enterToClass: 'opacity-100 translate-y-0',
  leaveToClass: 'opacity-0 translate-y-6'
}

export const slideLeftTransition = {
  enterActiveClass: 'transition ease-out duration-500',
  leaveActiveClass: 'transition ease-in duration-500',
  enterFromClass: 'translate-x-full absolute opacity-0',
  leaveFromClass: 'translate-x-0 absolute opacity-100',
  enterToClass: 'translate-x-0 absolute opacity-100',
  leaveToClass: '-translate-x-full absolute opacity-0'
}

export const slideRightTransition = {
  enterActiveClass: 'transition ease-out duration-500',
  leaveActiveClass: 'transition ease-in duration-500',
  enterFromClass: '-translate-x-full absolute opacity-0',
  leaveFromClass: 'translate-x-0 absolute opacity-100',
  enterToClass: 'translate-x-0 absolute opacity-100',
  leaveToClass: 'translate-x-full absolute opacity-0'
}

export const blurTransition = {
  enterActiveClass: 'transition ease-out duration-500',
  leaveActiveClass: 'transition ease-in duration-500',
  enterFromClass: 'opacity-0 blur',
  leaveFromClass: 'opacity-100 blur-0',
  enterToClass: 'opacity-100 blur-0',
  leaveToClass: 'opacity-0 blur'
}

/**
 * 收合效果
 */
export const expandTransition = {
  onBeforeEnter: (el) => {
    el.style.height = '0'
  },
  onEnter: (el) => {
    el.style.height = `${el.scrollHeight}px`
  },
  onBeforeLeave: (el) => {
    el.style.height = `${el.scrollHeight}px`
  },
  onLeave: (el) => {
    el.style.height = '0'
  }
}
