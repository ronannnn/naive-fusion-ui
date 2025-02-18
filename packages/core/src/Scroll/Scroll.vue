<script setup lang="ts">
import type { ScrollProps } from './types'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import { useElementBounding, useElementSize } from '@vueuse/core'
import defu from 'defu'
import { computed, onMounted, ref, watch } from 'vue'

// copy from soybean admin
const props = defineProps<ScrollProps>()

// bs scroll enable plugin
BScroll.use(MouseWheel)

const scrollProps = computed(() => defu(props.options, {
  scrollX: props.horizontal,
  scrollY: props.vertical,
  swipeBounceTime: 100,
  mouseWheel: {
    easeTime: 100,
  },
}))

const bsWrapper = ref<HTMLElement>()
const bsContent = ref<HTMLElement>()
const { width: wrapperWidth, height: wrapperHeight, left: wrapperLeft, top: wrapperTop } = useElementBounding(bsWrapper)
const { width, height } = useElementSize(bsContent)

const instance = ref<BScroll>()

function initBetterScroll() {
  if (!bsWrapper.value)
    return
  instance.value = new BScroll(bsWrapper.value, scrollProps.value)
}

// refresh BS when scroll element size changed
watch([() => wrapperWidth.value, () => width.value, () => height.value], () => {
  instance.value?.refresh()
})

onMounted(() => {
  initBetterScroll()
})

function scrollByClientX(clientX: number) {
  const currentX = clientX - wrapperLeft.value
  const deltaX = currentX - wrapperWidth.value / 2

  if (instance.value) {
    const { maxScrollX, x: leftX, scrollBy } = instance.value

    const rightX = maxScrollX - leftX
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)

    scrollBy(update, 0, 640)
  }
}

function scrollByClientY(clientY: number) {
  const currentY = clientY - wrapperTop.value
  const deltaY = currentY - wrapperHeight.value / 2

  if (instance.value) {
    const { maxScrollY, y: topY, scrollBy } = instance.value

    const bottomY = maxScrollY - topY
    const update = deltaY > 0 ? Math.max(-deltaY, bottomY) : Math.min(-deltaY, -topY)

    scrollBy(update, 0, 640)
  }
}

defineExpose({ instance, scrollByClientX, scrollByClientY })
</script>

<template>
  <div ref="bsWrapper" class="overflow-hidden">
    <div ref="bsContent" class="inline-block" :class="`${horizontal && 'h-full'} ${vertical && 'w-full'}`">
      <slot />
    </div>
  </div>
</template>
