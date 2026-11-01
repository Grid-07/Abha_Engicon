<template>
  <section id="enquire" class="section section--navy enquire texture">
    <div class="shell">
      <div class="enquire__grid">
        <div class="enquire__info">
          <p class="eyebrow" v-reveal>Enquire</p>
          <h2 class="h2 enquire__title" v-reveal="60">Book a site visit</h2>
          <div class="rule" v-reveal="90"></div>
          <p class="lead enquire__lead" v-reveal="120">
            The site office is open daily. Walk the plan, stand on the balcony,
            then decide — we would rather you saw it first.
          </p>

          <ul class="contact-list" v-reveal="150">
            <li>
              <span class="contact-list__icon"><AppIcon name="pin" /></span>
              <div>
                <p class="contact-list__label">Site address</p>
                <p class="contact-list__value">{{ contact.siteAddress }}</p>
              </div>
            </li>
            <li>
              <span class="contact-list__icon"><AppIcon name="shop" /></span>
              <div>
                <p class="contact-list__label">Site office</p>
                <p class="contact-list__value">{{ contact.siteOffice }}</p>
              </div>
            </li>
            <li>
              <span class="contact-list__icon"><AppIcon name="grid" /></span>
              <div>
                <p class="contact-list__label">Registered office</p>
                <p class="contact-list__value">{{ contact.regOffice }}</p>
              </div>
            </li>
          </ul>

          <div class="enquire__quick" v-reveal="180">
            <a :href="`tel:${contact.phones[0].value}`" class="quick">
              <AppIcon name="phone" />
              <span>{{ contact.phones[0].label }}</span>
            </a>
            <a :href="`mailto:${contact.email}`" class="quick">
              <AppIcon name="mail" />
              <span>{{ contact.email }}</span>
            </a>
          </div>
        </div>

        <div class="enquire__card" v-reveal:right>
          <Transition name="fade" mode="out-in">
            <form v-if="!sent" key="form" class="form" novalidate @submit.prevent="submit">
              <p class="form__title">Tell us what you're looking for</p>

              <div class="field" :class="{ 'has-error': errors.name }">
                <label for="f-name">Full name</label>
                <input id="f-name" v-model.trim="form.name" type="text" autocomplete="name" placeholder="Your name" />
                <span v-if="errors.name" class="field__err">{{ errors.name }}</span>
              </div>

              <div class="field-row">
                <div class="field" :class="{ 'has-error': errors.phone }">
                  <label for="f-phone">Phone</label>
                  <input id="f-phone" v-model.trim="form.phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="10-digit mobile" />
                  <span v-if="errors.phone" class="field__err">{{ errors.phone }}</span>
                </div>
                <div class="field" :class="{ 'has-error': errors.email }">
                  <label for="f-email">Email <em>optional</em></label>
                  <input id="f-email" v-model.trim="form.email" type="email" autocomplete="email" placeholder="you@email.com" />
                  <span v-if="errors.email" class="field__err">{{ errors.email }}</span>
                </div>
              </div>

              <div class="field">
                <label for="f-interest">I'm interested in</label>
                <div class="select-wrap">
                  <select id="f-interest" v-model="form.interest">
                    <option value="Block A residence">Block A — residence</option>
                    <option value="Block B residence">Block B — residence</option>
                    <option value="Retail / shop">Retail / shop</option>
                    <option value="General enquiry">General enquiry</option>
                  </select>
                  <AppIcon name="chevron" class="select-caret" />
                </div>
              </div>

              <div class="field">
                <label for="f-msg">Message</label>
                <textarea id="f-msg" v-model.trim="form.message" rows="3" placeholder="Anything we should know — preferred floor, budget, visit date…"></textarea>
              </div>

              <button type="submit" class="btn btn--gold btn--block" :disabled="sending">
                <span>{{ sending ? 'Sending…' : 'Send enquiry' }}</span>
              </button>

              <p class="form__fine">
                Opens WhatsApp with your details so our team can reply straight away.
              </p>
            </form>

            <div v-else key="done" class="done">
              <span class="done__mark"><AppIcon name="check" /></span>
              <h3 class="done__title">Thank you, {{ lastName }}</h3>
              <p class="done__text">
                Your enquiry is on its way. If WhatsApp didn't open, call us directly on
                <a :href="`tel:${contact.phones[0].value}`">{{ contact.phones[0].label }}</a>.
              </p>
              <div class="done__actions">
                <a :href="waLink" target="_blank" rel="noopener" class="btn btn--gold btn--sm">
                  <span>Open WhatsApp</span>
                </a>
                <button class="btn btn--ghost btn--sm" @click="reset">
                  <span>Send another</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import AppIcon from './AppIcon.vue'
import { contact } from '../data/project'
import { enquiry } from '../store/enquiry'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  interest: 'Block A residence',
  message: '',
})

const errors = reactive({ name: '', phone: '', email: '' })
const sending = ref(false)
const sent = ref(false)
const lastName = ref('')
const waLink = ref('#')

const waNumber = computed(() => contact.phones[0].value)

const buildMessage = () => {
  const lines = [
    `Enquiry — Bimla Mangal Gardens`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
  ]
  if (form.email) lines.push(`Email: ${form.email}`)
  lines.push(`Interest: ${form.interest}`)
  if (form.message) lines.push(`Message: ${form.message}`)
  return lines.join('\n')
}

const validate = () => {
  errors.name = form.name.length < 2 ? 'Please enter your name' : ''
  const digits = form.phone.replace(/\D/g, '')
  errors.phone = digits.length < 10 ? 'Enter a 10-digit mobile number' : ''
  errors.email =
    form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)
      ? 'That email looks incomplete'
      : ''
  return !errors.name && !errors.phone && !errors.email
}

const submit = () => {
  if (!validate()) return
  sending.value = true
  lastName.value = form.name.split(' ')[0]
  waLink.value = `https://wa.me/${waNumber.value}?text=${encodeURIComponent(buildMessage())}`

  setTimeout(() => {
    sending.value = false
    sent.value = true
    window.open(waLink.value, '_blank', 'noopener')
  }, 550)
}

const reset = () => {
  sent.value = false
  form.message = ''
}

// Pre-fill when a home is chosen in the residences explorer
const applyEnquiry = () => {
  if (!enquiry.unit && !enquiry.message) return
  if (enquiry.block) {
    form.interest = enquiry.block === 'Block B' ? 'Block B residence' : 'Block A residence'
  }
  if (enquiry.message) form.message = enquiry.message
}

watch(() => [enquiry.block, enquiry.unit, enquiry.message], applyEnquiry)
onMounted(applyEnquiry)

// Clear a field error as soon as the visitor starts fixing it
watch(() => form.name, (v) => { if (errors.name && v.length >= 2) errors.name = '' })
watch(() => form.phone, (v) => { if (errors.phone && v.replace(/\D/g, '').length >= 10) errors.phone = '' })
watch(() => form.email, (v) => { if (errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) errors.email = '' })
</script>

<style scoped>
.enquire__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.enquire__title {
  color: #fff;
  margin-top: 0.9rem;
}

.enquire__lead {
  margin-top: 1.3rem;
  color: var(--on-dark-soft);
  max-width: 40ch;
}

/* Contact list */
.contact-list {
  margin-top: 2rem;
  display: grid;
  gap: 1.25rem;
}

.contact-list li {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.contact-list__icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(210, 175, 94, 0.35);
  color: var(--gold-400);
  font-size: 15px;
  margin-top: 2px;
}

.contact-list__label {
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold-500);
  margin-bottom: 0.2rem;
}

.contact-list__value {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--on-dark-soft);
  max-width: 42ch;
}

.enquire__quick {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.8rem;
}

.quick {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(243, 236, 223, 0.2);
  font-size: 0.76rem;
  color: var(--on-dark);
  transition: border-color 0.35s var(--ease), background 0.35s var(--ease), color 0.35s var(--ease);
}

.quick svg {
  width: 14px;
  height: 14px;
  color: var(--gold-400);
}

.quick:hover {
  border-color: var(--gold-500);
  background: rgba(210, 175, 94, 0.1);
  color: var(--gold-200);
}

/* Form card */
.enquire__card {
  background: var(--cream-50);
  border-radius: var(--radius-lg);
  padding: clamp(1.4rem, 3vw, 2.2rem);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(210, 175, 94, 0.35);
}

.form__title {
  font-family: var(--font-display);
  font-size: 1.28rem;
  color: var(--ink);
  margin-bottom: 1.2rem;
  line-height: 1.3;
}

.field {
  margin-bottom: 0.9rem;
}

.field label {
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 0.35rem;
}

.field label em {
  font-style: normal;
  text-transform: none;
  letter-spacing: 0;
  opacity: 0.7;
}

.field input,
.field textarea,
.field select {
  width: 100%;
  padding: 0.8rem 0.9rem;
  font-size: 0.92rem;
  font-family: var(--font-sans);
  color: var(--ink);
  background: #fff;
  border: 1px solid rgba(11, 21, 38, 0.16);
  border-radius: 10px;
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
  -webkit-appearance: none;
  appearance: none;
}

.field textarea {
  resize: vertical;
  min-height: 84px;
  line-height: 1.6;
}

.field input::placeholder,
.field textarea::placeholder {
  color: rgba(11, 21, 38, 0.34);
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  outline: none;
  border-color: var(--gold-600);
  box-shadow: 0 0 0 3px rgba(210, 175, 94, 0.18);
}

.field.has-error input {
  border-color: #b4453a;
}

.field__err {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.68rem;
  color: #b4453a;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.select-wrap {
  position: relative;
}

.select-caret {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: var(--ink-muted);
  pointer-events: none;
}

.form .btn {
  margin-top: 0.4rem;
}

.form__fine {
  margin-top: 0.7rem;
  font-size: 0.66rem;
  line-height: 1.6;
  color: var(--ink-muted);
  text-align: center;
}

/* Success */
.done {
  text-align: center;
  padding: clamp(1rem, 4vw, 2.4rem) 0.4rem;
}

.done__mark {
  width: 56px;
  height: 56px;
  margin: 0 auto 1.2rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(184, 145, 63, 0.14);
  border: 1px solid var(--gold-line);
  color: var(--gold-700);
  font-size: 22px;
}

.done__title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--ink);
}

.done__text {
  margin-top: 0.7rem;
  font-size: 0.86rem;
  line-height: 1.7;
  color: var(--text-soft);
}

.done__text a {
  color: var(--gold-700);
  border-bottom: 1px solid currentColor;
}

.done__actions {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.done__actions .btn--ghost {
  --btn-fg: var(--ink);
  --btn-bd: var(--line-strong);
}

@media (max-width: 900px) {
  .enquire__grid {
    grid-template-columns: 1fr;
  }

  .enquire__lead {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .field-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
