import { reactive } from 'vue'

/**
 * On a single-page site there is no second page to carry "I want to ask about
 * this project", so the project cards hand that intent to the contact form
 * through this store and then scroll to it.
 */
export const enquiry = reactive({ interest: '' })

export function askAbout(name) {
  enquiry.interest = name
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
