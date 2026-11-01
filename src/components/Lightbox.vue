<script setup>
import { watch, onUnmounted } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  src: { type: String, default: '' },
  caption: { type: String, default: '' },
  sub: { type: String, default: '' },
})
const emit = defineEmits(['close'])

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  (v) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = v ? 'hidden' : ''
    if (v) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  }
)

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <teleport to="body">
    <transition name="lb">
      <div v-if="open" class="lb" role="dialog" aria-modal="true" :aria-label="caption" @click.self="emit('close')">
        <button class="lb__close" aria-label="Close" @click="emit('close')">
          <AppIcon name="close" :size="20" />
        </button>
        <figure class="lb__fig">
          <img :src="src" :alt="caption" />
          <figcaption v-if="caption" class="lb__cap">
            <span class="lb__name">{{ caption }}</span>
            <span v-if="sub" class="lb__sub">{{ sub }}</span>
          </figcaption>
        </figure>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 3rem);
  background: rgba(12, 12, 15, 0.93);
  backdrop-filter: blur(6px);
}

.lb__close {
  position: absolute;
  top: clamp(0.8rem, 2.5vw, 1.6rem);
  right: clamp(0.8rem, 2.5vw, 1.6rem);
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(243, 235, 221, 0.28);
  border-radius: 50%;
  color: var(--sand-100);
  transition: background 0.35s var(--ease), border-color 0.35s var(--ease);
}

.lb__close:hover {
  background: rgba(243, 235, 221, 0.12);
  border-color: var(--sand-200);
}

.lb__fig {
  display: grid;
  gap: 1rem;
  max-width: min(1180px, 100%);
  max-height: 100%;
}

.lb__fig img {
  width: 100%;
  max-height: 78vh;
  object-fit: contain;
  border-radius: 2px;
}

.lb__cap {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.lb__name {
  font-family: var(--display);
  font-size: 1.35rem;
  color: var(--sand-100);
}

.lb__sub {
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(243, 235, 221, 0.55);
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.32s var(--ease);
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

.lb-enter-active .lb__fig,
.lb-leave-active .lb__fig {
  transition: transform 0.4s var(--ease-out);
}

.lb-enter-from .lb__fig,
.lb-leave-to .lb__fig {
  transform: scale(0.97);
}
</style>
