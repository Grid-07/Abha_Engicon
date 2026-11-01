<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { contact, live } from '../data/company'
import { enquiry } from '../data/enquiry'
import AppIcon from './AppIcon.vue'

const route = useRoute()

const form = reactive({ name: '', phone: '', interest: '', message: '' })
const errors = reactive({ name: '', phone: '' })
const sent = ref(false)

const options = computed(() => ['A general enquiry', ...live.map((p) => p.name)])

onMounted(() => {
  // A deep link can still name the project: /?project=shri-ganesh-arpan#contact
  const q = String(route.query.project || '')
  const match = live.find((p) => p.slug === q || p.name.toLowerCase() === q.toLowerCase())
  if (match) form.interest = match.name
  if (enquiry.interest) form.interest = enquiry.interest
})

// The project cards on this page hand their name over here.
watch(
  () => enquiry.interest,
  (v) => {
    if (v) form.interest = v
  }
)

function validate() {
  errors.name = form.name.trim().length < 2 ? 'Please enter your name.' : ''
  const digits = form.phone.replace(/\D/g, '')
  errors.phone = digits.length < 10 ? 'Enter a 10-digit mobile number.' : ''
  return !errors.name && !errors.phone
}

function submit() {
  if (!validate()) return
  const lines = [
    'Hello Abha Engicon,',
    '',
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    form.interest ? `Interested in: ${form.interest}` : '',
    form.message.trim() ? `Message: ${form.message.trim()}` : '',
  ].filter(Boolean)

  const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
  window.open(url, '_blank', 'noopener')
  sent.value = true
}

function reset() {
  form.name = ''
  form.phone = ''
  form.message = ''
  form.interest = ''
  enquiry.interest = ''
  sent.value = false
}
</script>

<template>
  <section id="contact" class="enq section">
    <div class="shell enq__grid">
      <!-- ------------------------------------------------------- details --- -->
      <div class="enq__side">
        <span class="eyebrow" v-reveal>Get in touch</span>
        <h2 class="enq__title" v-reveal="60">Come and see the site.</h2>
        <p class="enq__lede" v-reveal="100">
          The sales desk is open every day at the Shri Ganesh Arpan site office on the Ekangarsarai
          Main Road. Call ahead and we will walk you through every open address.
        </p>

        <div class="offices" v-reveal="140">
          <div v-for="o in [contact.regOffice, contact.siteOffice]" :key="o.label" class="office">
            <span class="office__label">{{ o.label }}</span>
            <address class="office__lines">
              <span v-for="(l, i) in o.lines" :key="i">{{ l }}</span>
            </address>
          </div>
        </div>

        <div class="direct" v-reveal="180">
          <a :href="`tel:${contact.phones[0].value}`" class="direct__item">
            <AppIcon name="phone" :size="15" />
            <span>{{ contact.phones[0].label }}</span>
          </a>
          <a :href="`mailto:${contact.email}`" class="direct__item">
            <AppIcon name="mail" :size="15" />
            <span>{{ contact.email }}</span>
          </a>
          <a :href="contact.mapsUrl" target="_blank" rel="noopener" class="direct__item">
            <AppIcon name="pin" :size="15" />
            <span>Open in Maps</span>
          </a>
        </div>
      </div>

      <!-- ---------------------------------------------------------- form --- -->
      <div class="enq__card" v-reveal="80">
        <transition name="swap" mode="out-in">
          <form v-if="!sent" key="form" class="form" novalidate @submit.prevent="submit">
            <p class="form__head">Send an enquiry</p>

            <div class="field">
              <label for="f-name">Your name</label>
              <input
                id="f-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="Full name"
                :aria-invalid="!!errors.name"
                @input="errors.name = ''"
              />
              <span v-if="errors.name" class="err">{{ errors.name }}</span>
            </div>

            <div class="field">
              <label for="f-phone">Mobile number</label>
              <input
                id="f-phone"
                v-model="form.phone"
                type="tel"
                inputmode="numeric"
                autocomplete="tel"
                placeholder="10-digit number"
                :aria-invalid="!!errors.phone"
                @input="errors.phone = ''"
              />
              <span v-if="errors.phone" class="err">{{ errors.phone }}</span>
            </div>

            <div class="field">
              <label for="f-int">Interested in</label>
              <div class="select">
                <select id="f-int" v-model="form.interest">
                  <option value="">Select a project</option>
                  <option v-for="o in options" :key="o" :value="o">{{ o }}</option>
                </select>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div class="field">
              <label for="f-msg">Anything else <span class="opt">(optional)</span></label>
              <textarea id="f-msg" v-model="form.message" rows="3" placeholder="Preferred floor, budget, site visit date…"></textarea>
            </div>

            <button type="submit" class="btn form__submit">
              Send on WhatsApp
              <AppIcon name="arrow-right" />
            </button>

            <p class="form__note">
              Opens WhatsApp with your details filled in. Nothing is stored on this site.
            </p>
          </form>

          <div v-else key="done" class="done">
            <span class="done__tick"><AppIcon name="check" :size="22" /></span>
            <h3 class="done__title">Off you go.</h3>
            <p class="done__text">
              WhatsApp should have opened with your enquiry ready to send. If it didn't, call us on
              <a :href="`tel:${contact.phones[0].value}`">{{ contact.phones[0].label }}</a>.
            </p>
            <button class="link-arrow" @click="reset">Send another</button>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.enq {
  background: var(--sand-50);
}

.enq__grid {
  display: grid;
  grid-template-columns: 1fr 0.92fr;
  gap: clamp(2.4rem, 6vw, 5rem);
  align-items: start;
}

.enq__title {
  margin-top: 1.1rem;
  max-width: 13ch;
}

.enq__lede {
  margin-top: 1.1rem;
  font-size: 0.97rem;
  line-height: 1.75;
  color: var(--ink-500);
  max-width: 42ch;
}

/* ------------------------------------------------------------- offices --- */
.offices {
  display: grid;
  gap: 1.5rem;
  margin-top: 2.2rem;
  padding-top: 1.8rem;
  border-top: 1px solid var(--line);
}

.office__label {
  display: block;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-400);
  margin-bottom: 0.5rem;
}

.office__lines {
  display: grid;
  font-style: normal;
  font-size: 0.94rem;
  line-height: 1.62;
  color: var(--ink-700);
}

.direct {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.6rem;
  margin-top: 1.9rem;
}

.direct__item {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.9rem;
  color: var(--ink-700);
  padding-bottom: 0.25rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.35s var(--ease), color 0.35s var(--ease);
}

.direct__item:hover {
  color: var(--ink-900);
  border-color: var(--ink-900);
}

/* ---------------------------------------------------------------- card --- */
.enq__card {
  background: var(--sand-100);
  border: 1px solid var(--line);
  padding: clamp(1.4rem, 3vw, 2.4rem);
}

.form {
  display: grid;
  gap: 1.05rem;
}

.form__head {
  font-family: var(--display);
  font-size: 1.5rem;
  color: var(--ink-900);
  margin-bottom: 0.2rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field label {
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-500);
}

.opt {
  text-transform: none;
  letter-spacing: 0.04em;
  color: var(--ink-300);
}

.field input,
.field textarea,
.select select {
  width: 100%;
  background: var(--sand-50);
  border: 1px solid var(--line);
  border-radius: 1px;
  padding: 0.8rem 0.9rem;
  font-size: 0.94rem;
  color: var(--ink-900);
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
}

.field textarea {
  resize: vertical;
  min-height: 84px;
  line-height: 1.6;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--ink-300);
}

.field input:focus,
.field textarea:focus,
.select select:focus {
  outline: none;
  border-color: var(--ink-900);
  background: #fff;
}

.field input[aria-invalid='true'] {
  border-color: #a4453a;
}

.err {
  font-size: 0.72rem;
  color: #a4453a;
}

.select {
  position: relative;
}

.select select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 2.4rem;
  cursor: pointer;
}

.select svg {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--ink-400);
}

.form__submit {
  margin-top: 0.4rem;
  width: 100%;
}

.form__note {
  font-size: 0.7rem;
  line-height: 1.6;
  color: var(--ink-400);
  text-align: center;
}

/* ----------------------------------------------------------------- done --- */
.done {
  display: grid;
  gap: 0.8rem;
  justify-items: start;
  padding-block: 1rem;
}

.done__tick {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--ink-900);
}

.done__title {
  font-size: 1.7rem;
}

.done__text {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--ink-500);
  max-width: 34ch;
}

.done__text a {
  border-bottom: 1px solid var(--line);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.28s var(--ease), transform 0.28s var(--ease);
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ------------------------------------------------------------ responsive --- */
@media (max-width: 900px) {
  .enq__grid {
    grid-template-columns: 1fr;
  }

  .enq__title {
    max-width: 18ch;
  }
}
</style>
