<template>
  <section id="enquire" class="section section--ink contact texture">
    <div class="shell">
      <div class="contact__grid">
        <div class="contact__intro" v-reveal>
          <span class="eyebrow eyebrow--light">Enquire</span>
          <h2 class="h2">Book a site visit</h2>
          <p class="lead">
            The site office sits inside the project itself — Flat 101, Shri Ganesh
            Arpan. Walk in any day, or send a message and we'll call you back.
          </p>

          <div class="contact__phones">
            <a v-for="p in contact.phones" :key="p.value" :href="`tel:${p.value}`" class="phone">
              <span class="phone__icon"><AppIcon name="phone" :size="16" /></span>
              <span class="phone__num">{{ p.label }}</span>
              <AppIcon name="arrow" :size="14" class="phone__arrow" />
            </a>
          </div>

          <a :href="`mailto:${contact.email}`" class="contact__mail">
            <AppIcon name="mail" :size="15" />
            {{ contact.email }}
          </a>

          <div class="offices">
            <div class="office">
              <span class="office__label">Corporate Office</span>
              <p>{{ contact.regOffice }}</p>
            </div>
            <div class="office">
              <span class="office__label">Site Office</span>
              <p>{{ contact.siteOffice }}</p>
            </div>
          </div>
        </div>

        <div class="form-card" v-reveal:right>
          <transition name="swap" mode="out-in">
            <form v-if="!sent" key="form" class="form" novalidate @submit.prevent="submit">
              <div class="form__head">
                <h3>Send an enquiry</h3>
                <span class="form__tag">{{ brand.parent }}</span>
              </div>

              <div class="field" :class="{ 'has-error': errors.name }">
                <label for="c-name">Your name</label>
                <input id="c-name" v-model.trim="form.name" type="text" autocomplete="name" placeholder="Full name" @input="errors.name = ''" />
                <span v-if="errors.name" class="field__err">{{ errors.name }}</span>
              </div>

              <div class="field" :class="{ 'has-error': errors.phone }">
                <label for="c-phone">Phone</label>
                <input id="c-phone" v-model.trim="form.phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="10-digit mobile number" @input="errors.phone = ''" />
                <span v-if="errors.phone" class="field__err">{{ errors.phone }}</span>
              </div>

              <div class="field">
                <label for="c-interest">Interested in</label>
                <div class="select">
                  <select id="c-interest" v-model="form.interest">
                    <option value="">Any home</option>
                    <option v-for="o in interests" :key="o" :value="o">{{ o }}</option>
                  </select>
                  <AppIcon name="chevron" :size="15" />
                </div>
              </div>

              <div class="field">
                <label for="c-msg">Message <span>(optional)</span></label>
                <textarea id="c-msg" v-model.trim="form.message" rows="3" placeholder="Anything we should know — floor preference, visit date…"></textarea>
              </div>

              <button type="submit" class="btn btn--gold btn--block form__submit">
                <span>Send on WhatsApp</span>
                <AppIcon name="whatsapp" :size="17" />
              </button>

              <p class="form__fine">
                Opens WhatsApp with your details filled in. We reply within one
                working day.
              </p>
            </form>

            <div v-else key="done" class="done">
              <span class="done__icon"><AppIcon name="check" :size="26" /></span>
              <h3>Thank you, {{ form.name.split(' ')[0] }}</h3>
              <p>
                Your message is ready in WhatsApp — send it and we'll get back to
                you shortly. If the window didn't open,
                <a :href="waLink" target="_blank" rel="noopener">tap here</a>.
              </p>
              <button class="btn btn--ghost btn--sm" @click="reset">
                <span>Send another</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import AppIcon from './AppIcon.vue'
import { brand, contact, towers } from '../data/project'
import { enquiry } from '../store/enquiry'

const sent = ref(false)
const form = reactive({ name: '', phone: '', interest: '', message: '' })
const errors = reactive({ name: '', phone: '' })

const interests = computed(() => [
  ...towers.flatMap((t) => t.units.map((u) => `${t.name} · ${u.no} — ${u.type}`)),
  'Not sure yet',
])

const waLink = computed(() => {
  const lines = [
    `Enquiry — ${brand.name}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    form.interest ? `Interest: ${form.interest}` : '',
    form.message ? `Message: ${form.message}` : '',
  ].filter(Boolean)
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
})

const applyEnquiry = () => {
  if (!enquiry.unit) return
  // Option strings look like "B Tower · 01 — 3BHK + 2T"
  const match = interests.value.find(
    (o) => o.startsWith(enquiry.tower) && o.includes(` · ${enquiry.unit} `)
  )
  if (match) form.interest = match
  if (enquiry.message) form.message = enquiry.message
}

watch(() => [enquiry.tower, enquiry.unit, enquiry.message], applyEnquiry)
onMounted(applyEnquiry)

const submit = () => {
  errors.name = form.name.length < 2 ? 'Please tell us your name' : ''
  const digits = form.phone.replace(/\D/g, '')
  errors.phone = digits.length < 10 ? 'Enter a 10-digit mobile number' : ''
  if (errors.name || errors.phone) return

  window.open(waLink.value, '_blank', 'noopener')
  sent.value = true
}

const reset = () => {
  sent.value = false
  form.message = ''
}
</script>

<style scoped>
.contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
  gap: clamp(2rem, 4.5vw, 4rem);
  align-items: start;
}

.contact__intro .lead {
  margin-top: 1.1rem;
  max-width: 46ch;
}

/* --- Phones ------------------------------------------------------------- */
.contact__phones {
  margin-top: 2rem;
  border-top: 1px solid rgba(241, 233, 219, 0.14);
}

.phone {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.85rem 0.2rem;
  border-bottom: 1px solid rgba(241, 233, 219, 0.14);
  color: rgba(241, 233, 219, 0.9);
  transition: padding-left 0.4s var(--ease), color 0.35s var(--ease);
}

.phone:hover {
  padding-left: 0.7rem;
  color: var(--gold-200);
}

.phone__icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(193, 160, 116, 0.35);
  color: var(--gold-400);
  flex: none;
}

.phone__num {
  font-family: var(--font-display);
  font-size: clamp(0.92rem, 1.8vw, 1.05rem);
  letter-spacing: 0.06em;
}

.phone__arrow {
  margin-left: auto;
  color: var(--gold-600);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}

.phone:hover .phone__arrow {
  opacity: 1;
  transform: none;
}

.contact__mail {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.2rem;
  font-size: 0.88rem;
  color: rgba(241, 233, 219, 0.7);
  transition: color 0.35s var(--ease);
}

.contact__mail:hover {
  color: var(--gold-300);
}

/* --- Offices ------------------------------------------------------------ */
.offices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.4rem;
  margin-top: 2rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(241, 233, 219, 0.14);
}

.office__label {
  font-size: 0.56rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold-500);
}

.office p {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  line-height: 1.65;
  color: rgba(241, 233, 219, 0.55);
}

/* --- Form --------------------------------------------------------------- */
.form-card {
  position: relative;
  padding: clamp(1.4rem, 3vw, 2.2rem);
  background: rgba(241, 233, 219, 0.045);
  border: 1px solid rgba(241, 233, 219, 0.14);
  backdrop-filter: blur(6px);
}

.form__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid rgba(241, 233, 219, 0.12);
}

.form__head h3 {
  font-size: 1.15rem;
  letter-spacing: 0.08em;
  color: var(--gold-100);
}

.form__tag {
  font-size: 0.5rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.35);
}

.field + .field {
  margin-top: 0.95rem;
}

.field label {
  display: block;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.5);
  margin-bottom: 0.4rem;
}

.field label span {
  text-transform: none;
  letter-spacing: 0.04em;
  opacity: 0.6;
}

.field input,
.field textarea,
.field select {
  width: 100%;
  padding: 0.75rem 0.85rem;
  background: rgba(10, 10, 12, 0.5);
  border: 1px solid rgba(241, 233, 219, 0.16);
  border-radius: 2px;
  color: var(--gold-100);
  font-size: 0.9rem;
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
  appearance: none;
}

.field textarea {
  resize: vertical;
  min-height: 82px;
  line-height: 1.6;
}

.field input::placeholder,
.field textarea::placeholder {
  color: rgba(241, 233, 219, 0.28);
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  outline: none;
  border-color: var(--gold-500);
  background: rgba(10, 10, 12, 0.7);
}

.field.has-error input {
  border-color: #c46a5a;
}

.field__err {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  color: #d98a7b;
}

.select {
  position: relative;
}

.select svg {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gold-500);
  pointer-events: none;
}

.select select {
  padding-right: 2.2rem;
  cursor: pointer;
}

.select select option {
  background: var(--ink-900);
  color: var(--gold-100);
}

.form__submit {
  margin-top: 1.4rem;
}

.form__fine {
  margin-top: 0.7rem;
  font-size: 0.62rem;
  line-height: 1.6;
  color: rgba(241, 233, 219, 0.35);
  text-align: center;
}

/* --- Success ------------------------------------------------------------ */
.done {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.9rem;
  min-height: 330px;
  padding: 1.5rem 0.4rem;
}

.done__icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid var(--gold-line);
  color: var(--gold-300);
}

.done h3 {
  font-size: 1.3rem;
  letter-spacing: 0.06em;
  color: var(--gold-100);
}

.done p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(241, 233, 219, 0.6);
}

.done p a {
  color: var(--gold-300);
  text-decoration: underline;
}

/* --- Transitions -------------------------------------------------------- */
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 940px) {
  .contact__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  .offices {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.1rem;
  }

  .form-card {
    padding: 1.2rem;
  }
}
</style>
