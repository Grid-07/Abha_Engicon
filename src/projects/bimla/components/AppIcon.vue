<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="paths[name] || paths.dot"
  />
</template>

<script setup>
defineProps({
  name: { type: String, default: 'dot' },
})

const paths = {
  dot: '<circle cx="12" cy="12" r="3" />',
  pool: '<path d="M2 17c2 0 2-1.4 4-1.4S8 17 10 17s2-1.4 4-1.4S16 17 18 17s2-1.4 4-1.4" /><path d="M2 21c2 0 2-1.4 4-1.4S8 21 10 21s2-1.4 4-1.4S16 21 18 21s2-1.4 4-1.4" /><path d="M7 13V5a2 2 0 0 1 4 0v8M13 13V5a2 2 0 0 1 4 0v8" />',
  gym: '<path d="M4 9v6M7 6v12M17 6v12M20 9v6M7 12h10" />',
  play: '<circle cx="8" cy="7" r="2.2" /><path d="M8 9.5V15l-2 4M8 15l2 4M4 20h8" /><path d="M15 6l4 8M19 6l-4 8" />',
  shop: '<path d="M4 9h16l-1-4H5z" /><path d="M5 9v10h14V9" /><path d="M9.5 19v-5h5v5" />',
  school: '<path d="M3 10l9-5 9 5-9 5z" /><path d="M7 12v5c0 1.1 2.2 2 5 2s5-.9 5-2v-5" /><path d="M21 10v5" />',
  hospital: '<rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 8v8M8 12h8" />',
  plane: '<path d="M10.5 3.5 12 9l8 4v2l-8-2-1 5 3 2v1l-4-1-4 1v-1l3-2-1-5-8 2v-2l8-4z" />',
  bag: '<path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />',
  temple: '<path d="M12 3l6 4v2H6V7z" /><path d="M6 9v11h12V9" /><path d="M10 20v-5h4v5" />',
  phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" />',
  clock: '<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />',
  check: '<path d="M4 12.5l5 5L20 6.5" />',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6" />',
  chevron: '<path d="M6 9l6 6 6-6" />',
  plus: '<path d="M12 5v14M5 12h14" />',
  minus: '<path d="M5 12h14" />',
  whatsapp:
    '<path d="M12.04 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.3A9 9 0 1 0 12.04 3z" /><path d="M8.8 8.4c.2-.5.5-.5.8-.5h.6c.2 0 .5 0 .7.5l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.2.2-.2.4-.1.6.5.9 1.3 1.7 2.2 2.2.2.1.4.1.6-.1l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.2.4.4.4.6v.6c0 .4-.2.7-.6.9-.5.3-1.2.4-1.9.2-1.2-.4-2.6-1.1-3.8-2.3s-1.9-2.6-2.3-3.8c-.2-.7-.1-1.4.2-1.9z" />',
  sun: '<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />',
  leaf: '<path d="M4 20c0-8 5-13 16-13 0 9-5 13-11 13H4z" /><path d="M4 20c3-5 6-8 11-10" />',
  shield: '<path d="M12 3l7 3v6c0 4.2-3 7.5-7 9-4-1.5-7-4.8-7-9V6z" /><path d="M9 12l2 2 4-4" />',
  car: '<path d="M5 16h14M6 16l1.5-5h9L18 16" /><rect x="4" y="16" width="16" height="3" rx="1" /><circle cx="7.5" cy="19" r="1.2" /><circle cx="16.5" cy="19" r="1.2" />',
  wifi: '<path d="M3 9a15 15 0 0 1 18 0M6.5 12.5a10 10 0 0 1 11 0M10 16a5 5 0 0 1 4 0" /><circle cx="12" cy="19" r="1" />',
  fire: '<path d="M12 3s5 4.2 5 9a5 5 0 0 1-10 0c0-2 1-3.6 2-5" /><path d="M12 20a2.5 2.5 0 0 1-2.5-2.5c0-1.6 1.5-2.7 2.5-4 1 1.3 2.5 2.4 2.5 4A2.5 2.5 0 0 1 12 20z" />',
  water: '<path d="M12 3s6 6.4 6 10a6 6 0 0 1-12 0c0-3.6 6-10 6-10z" />',
  lift: '<rect x="6" y="3" width="12" height="18" rx="1.5" /><path d="M12 3v18M9 8l1.5-2L12 8M15 16l-1.5 2L12 16" />',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" />',
}

// exported so other components can list valid names if needed
defineExpose({ paths })
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  display: block;
  flex-shrink: 0;
}
</style>
