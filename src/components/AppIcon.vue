<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 16 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'arrow-right'">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </template>
    <template v-else-if="name === 'arrow-up-right'">
      <path d="M7 17 17 7M8 7h9v9" />
    </template>
    <template v-else-if="name === 'arrow-down'">
      <path d="M12 4v15M6 13l6 6 6-6" />
    </template>
    <template v-else-if="name === 'phone'">
      <path
        d="M6.6 3.5h2.2l1.4 3.6-1.7 1.3a12.4 12.4 0 0 0 5.6 5.6l1.3-1.7 3.6 1.4v2.2a2.4 2.4 0 0 1-2.6 2.4A16.8 16.8 0 0 1 4.2 6.1 2.4 2.4 0 0 1 6.6 3.5Z"
      />
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="3" y="5.5" width="18" height="13" rx="1.6" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </template>
    <template v-else-if="name === 'whatsapp'">
      <path
        d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3.8 20.2l1.4-4.1A8.2 8.2 0 1 1 20.2 11.7Z"
      />
      <path
        d="M8.9 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.3 0 .5-.1.6l-.5.6c-.1.2-.2.3 0 .6a6.4 6.4 0 0 0 2.9 2.5c.3.1.4 0 .6-.1l.6-.7c.2-.2.3-.2.5-.1l1.5.7c.2.1.4.2.4.4a2 2 0 0 1-1.5 1.7 5 5 0 0 1-2.4-.4 8.6 8.6 0 0 1-4.2-3.9 4.6 4.6 0 0 1-.7-2.3c0-.5.2-1 .5-1.2Z"
      />
    </template>
    <template v-else-if="name === 'menu'">
      <path d="M4 8h16M4 16h16" />
    </template>
    <template v-else-if="name === 'close'">
      <path d="M6 6l12 12M18 6 6 18" />
    </template>
    <template v-else-if="name === 'plus'">
      <path d="M12 5v14M5 12h14" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="m4.5 12.5 5 5 10-11" />
    </template>
  </svg>
</template>
