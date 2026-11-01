import { reactive } from 'vue'

// Tiny shared state so "Enquire about this home" can pre-fill the contact form.
export const enquiry = reactive({
  block: '',
  unit: '',
  message: '',
})

export function setEnquiry({ block, unit, message }) {
  enquiry.block = block || ''
  enquiry.unit = unit || ''
  enquiry.message = message || ''
}
