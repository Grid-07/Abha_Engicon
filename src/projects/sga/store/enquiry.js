import { reactive } from 'vue'

// Tiny shared state so "Enquire about this home" can pre-fill the contact form.
export const enquiry = reactive({
  tower: '',
  unit: '',
  message: '',
})

export function setEnquiry({ tower, unit, message }) {
  enquiry.tower = tower || ''
  enquiry.unit = unit || ''
  enquiry.message = message || ''
}
