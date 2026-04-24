<script setup lang="ts">
import type { CurrentFood, RecipeResponse } from '~/types'
import { useStorage } from '@vueuse/core'
import { emojiMap } from '~/constants'

const isPlaying = ref(false)
const currentFood = ref<CurrentFood>()
const shakeTitle = ref(false)
const { data } = await useFetch<RecipeResponse>('/api/recipes')
const categories = computed(() => (data.value?.categories || []) as string[])
const selectedCategories = useStorage<string[]>('selected-categories', [...categories.value])
const isAllSelected = computed(() => selectedCategories.value.length === categories.value.length)
const selectedCount = computed(() => selectedCategories.value.length)
const heroHint = computed(() => isPlaying.value ? '灵感生成中，停下来就能锁定今晚的答案。' : '点一下开始，让今天的菜单自己冒出来。')
const { playAnimation } = useEmojiAnimation()

const tagPalettes = [
  { soft: 'rgba(57, 197, 187, 0.14)', border: 'rgba(57, 197, 187, 0.24)', strong: '#39c5bb', text: '#1c7e78' },
  { soft: 'rgba(102, 126, 234, 0.14)', border: 'rgba(102, 126, 234, 0.24)', strong: '#667eea', text: '#4658b5' },
  { soft: 'rgba(75, 192, 152, 0.14)', border: 'rgba(75, 192, 152, 0.24)', strong: '#4bc098', text: '#2d8b6d' },
  { soft: 'rgba(255, 183, 77, 0.16)', border: 'rgba(255, 183, 77, 0.28)', strong: '#ffb74d', text: '#b87921' },
  { soft: 'rgba(255, 138, 128, 0.16)', border: 'rgba(255, 138, 128, 0.28)', strong: '#ff8a80', text: '#c96057' },
  { soft: 'rgba(129, 140, 248, 0.16)', border: 'rgba(129, 140, 248, 0.26)', strong: '#818cf8', text: '#5761ca' },
  { soft: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.22)', strong: '#ec4899', text: '#b93372' },
]

const stopWatchCategories = watch(categories, (newVal) => {
  if (newVal && newVal.length) {
    selectedCategories.value = [...newVal]
    stopWatchCategories()
  }
})

function getEmoji(tag: string) {
  return emojiMap[tag] || ''
}

function getTagPalette(index: number) {
  if (index < 0)
    return tagPalettes[0]!
  return tagPalettes[index % tagPalettes.length]!
}

function getTagStyle(index: number) {
  const palette = getTagPalette(index)
  return {
    '--tag-soft': palette.soft,
    '--tag-border': palette.border,
    '--tag-strong': palette.strong,
    '--tag-text': palette.text,
  }
}

let randomTimer: ReturnType<typeof setTimeout> | null = null
let autoStopTimer: ReturnType<typeof setTimeout> | null = null
const MAX_RANDOM_DURATION = 30_000

function togglePlay() {
  if (isPlaying.value)
    stopRandom()
  else
    startRandom()
}

function startRandom() {
  if (!import.meta.client)
    return

  isPlaying.value = true
  currentFood.value = undefined
  shakeTitle.value = true

  if (autoStopTimer)
    clearTimeout(autoStopTimer)

  autoStopTimer = setTimeout(() => {
    stopRandom()
  }, MAX_RANDOM_DURATION)

  const loop = () => {
    const allFoods = data.value?.recipes || []
    const foods = selectedCategories.value.length > 0
      ? allFoods.filter(recipe => selectedCategories.value.includes(recipe.category))
      : allFoods
    const list = foods.length ? foods : allFoods
    const randomFood = list[Math.floor(Math.random() * list.length)]
    currentFood.value = randomFood
    createFloatingText(replaceText(randomFood?.name))

    randomTimer = setTimeout(loop, 100)
  }

  loop()
}

function stopRandom() {
  isPlaying.value = false
  shakeTitle.value = false

  if (randomTimer)
    clearTimeout(randomTimer)
  randomTimer = null

  if (autoStopTimer)
    clearTimeout(autoStopTimer)
  autoStopTimer = null
}

function toggleTag(tag: string) {
  if (tag === 'all') {
    if (!isAllSelected.value)
      selectedCategories.value = [...categories.value]
    else
      selectedCategories.value = [categories.value[1]!]
    return
  }

  const set = selectedCategories.value
  const idx = set.indexOf(tag)

  if (idx === -1) {
    playAnimation(getEmoji(tag))
    set.push(tag)
  }
  else {
    set.splice(idx, 1)
  }

  if (set.length === 0 && categories.value.length)
    selectedCategories.value = [categories.value[1]!]
}

function createFloatingText(text = '') {
  const container = document.getElementById('temp_container')
  if (!container)
    return

  const temp = document.createElement('div')
  const colors = [
    'rgba(57, 197, 187, 0.62)',
    'rgba(102, 126, 234, 0.58)',
    'rgba(75, 192, 152, 0.6)',
    'rgba(255, 183, 77, 0.58)',
  ]
  const sizes = ['0.86rem', '1rem', '1.18rem']
  const rotate = (Math.random() - 0.5) * 18

  temp.textContent = text
  temp.className = 'floating-word'
  temp.style.color = colors[Math.floor(Math.random() * colors.length)]!
  temp.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)]!
  temp.style.left = `${Math.random() * 76 + 12}%`
  temp.style.top = `${Math.random() * 68 + 14}%`
  temp.style.transform = `rotate(${rotate}deg)`

  container.appendChild(temp)
  setTimeout(() => temp.remove(), 1600)
}

onUnmounted(() => {
  if (randomTimer)
    clearTimeout(randomTimer)

  if (autoStopTimer)
    clearTimeout(autoStopTimer)
})
</script>

<template>
  <div class="eat-page site-shell">
    <div class="page-orb orb-left" />
    <div class="page-orb orb-right" />
    <div class="page-grid" />

    <main class="eat-main">
      <div class="page-brand">
        <img src="/logo.png" alt="Ayaka Eat logo" class="brand-avatar">
        <span class="page-brand-text">Ayaka Eat</span>
      </div>

      <section class="category-panel glass-panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Category Filter</p>
            <h2>先圈定今天的胃口范围</h2>
          </div>
          <p class="panel-note">
            {{ isAllSelected ? '当前已开启全部分类，可以直接随机。' : `已选择 ${selectedCount} 个分类，结果会更聚焦。` }}
          </p>
        </div>

        <div class="tag-list">
          <button
            type="button"
            class="filter-pill"
            :class="{ active: isAllSelected }"
            :style="getTagStyle(-1)"
            @click="toggleTag('all')"
          >
            <span class="pill-dot" />
            <span>全部</span>
          </button>
          <button
            v-for="(category, index) in categories"
            :key="category"
            type="button"
            class="filter-pill"
            :class="{ active: selectedCategories.includes(category) }"
            :style="getTagStyle(index)"
            @click="toggleTag(category)"
          >
            <span v-if="getEmoji(category)" class="pill-emoji">{{ getEmoji(category) }}</span>
            <span>{{ category }}</span>
          </button>
        </div>
      </section>

      <section class="result-panel glass-panel">
        <div id="temp_container" class="floating-layer" />

        <div class="result-shell">
          <p class="result-kicker">Tonight's Pick</p>
          <h2 class="result-title" :class="{ 'animate-shake': shakeTitle }">
            <span class="title-muted">今天</span>
            <span class="title-accent accent-gradient-text">吃</span>
            <FoodItem :current-food="currentFood" />
            <span class="title-muted">？</span>
          </h2>
          <p class="result-tip">
            {{ heroHint }}
          </p>

          <button id="start" type="button" class="start-button" @click="togglePlay">
            <FancyButton :text="isPlaying ? '停止抽取' : '开始选择'" />
          </button>
        </div>
      </section>

      <footer class="page-footer" aria-label="版权信息">
        <span class="footer-copy">© 2026 AyakaのBlog. 保留所有权利。</span>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.eat-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.page-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(12px);
  pointer-events: none;
  opacity: 0.65;
}

.orb-left {
  top: 118px;
  left: -120px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(57, 197, 187, 0.22) 0%, rgba(57, 197, 187, 0) 72%);
}

.orb-right {
  right: -80px;
  bottom: 30px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.18) 0%, rgba(102, 126, 234, 0) 74%);
}

.page-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.28) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.28) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), transparent 78%);
  pointer-events: none;
  opacity: 0.35;
}

.eat-main {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  padding: 108px 0 48px;
}

.category-panel,
.result-panel {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
}

.result-panel::after {
  content: '';
  position: absolute;
  inset: auto auto 0 0;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(57, 197, 187, 0.14) 0%, transparent 70%);
  pointer-events: none;
}

.page-brand {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  align-self: center;
  margin: 6px auto -4px;
}

.brand-avatar {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 16px 34px rgba(57, 197, 187, 0.16);
  border: 1px solid color-mix(in srgb, var(--border-color) 86%, transparent);
}

.page-brand-text {
  color: var(--text-primary);
  font-size: clamp(1.4rem, 2.4vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.panel-kicker,
.result-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.panel-heading h2 {
  margin: 0;
  color: var(--text-primary);
  line-height: 1.2;
}

.category-panel {
  padding: 28px 30px 30px;
}

.panel-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 22px;
}

.panel-heading h2 {
  font-size: clamp(1.45rem, 2vw, 1.9rem);
  font-weight: 700;
}

.panel-note {
  max-width: 360px;
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.94rem;
  line-height: 1.7;
  text-align: right;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 16px;
  border-radius: 999px;
  border: 1px solid var(--tag-border);
  background: var(--tag-soft);
  color: var(--tag-text);
  font: inherit;
  font-size: 0.94rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.24s ease, box-shadow 0.24s ease, background 0.24s ease, color 0.24s ease, border-color 0.24s ease;
}

.filter-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--tag-strong) 18%, transparent);
}

.filter-pill.active {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, var(--tag-strong), color-mix(in srgb, var(--tag-strong) 70%, #ffffff));
  box-shadow: 0 16px 34px color-mix(in srgb, var(--tag-strong) 24%, transparent);
}

.pill-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.75;
}

.pill-emoji {
  font-size: 1rem;
}

.result-panel {
  min-height: 390px;
  padding: 30px;
}

.floating-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.result-shell {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 330px;
  text-align: center;
}

.result-title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  color: var(--text-primary);
  font-size: clamp(2rem, 5.2vw, 4.5rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.title-muted {
  color: var(--text-primary);
}

.title-accent {
  padding: 0 4px;
}

.result-tip {
  max-width: 560px;
  margin: 18px auto 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.8;
}

.start-button {
  margin-top: 28px;
  border: 0;
  background: transparent;
  padding: 0;
}

.page-footer {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 6px;
  padding: 18px 0 4px;
}

.page-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: min(420px, 72vw);
  height: 1px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, rgba(102, 126, 234, 0), rgba(102, 126, 234, 0.22), rgba(57, 197, 187, 0.26), rgba(102, 126, 234, 0.22), rgba(102, 126, 234, 0));
}

.footer-copy {
  color: color-mix(in srgb, var(--text-secondary) 82%, white);
  font-size: 0.95rem;
  line-height: 1.7;
  letter-spacing: 0.01em;
  text-align: center;
}

:deep(.floating-word) {
  position: absolute;
  font-weight: 700;
  letter-spacing: 0.04em;
  opacity: 0;
  text-shadow: 0 8px 20px rgba(255, 255, 255, 0.55);
  filter: blur(0.2px);
  user-select: none;
  white-space: nowrap;
  animation: floatUp 1.6s ease-out forwards;
  will-change: transform, opacity;
}

.animate-shake {
  animation: shake 0.4s;
}

@keyframes shake {
  0% {
    transform: translateX(5px);
  }

  20% {
    transform: translateX(-10px);
  }

  40% {
    transform: translateX(15px);
  }

  60% {
    transform: translateX(-20px);
  }

  80% {
    transform: translateX(15px);
  }

  100% {
    transform: translateX(-10px);
  }
}

@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
  }

  20% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  80% {
    opacity: 1;
    transform: translateY(-10px) scale(1.02);
  }

  100% {
    opacity: 0;
    transform: translateY(-30px) scale(1.1);
  }
}

@media (max-width: 900px) {
  .eat-main {
    padding-top: 94px;
  }

  .panel-heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .panel-note {
    max-width: none;
    text-align: left;
  }
}

@media (max-width: 640px) {
  .eat-main {
    width: min(100% - 20px, 1100px);
    gap: 18px;
    padding-bottom: 28px;
  }

  .category-panel,
  .result-panel {
    border-radius: 26px;
  }

  .category-panel,
  .result-panel {
    padding: 22px 18px;
  }

  .page-brand {
    gap: 12px;
    margin-top: 0;
  }

  .brand-avatar {
    width: 48px;
    height: 48px;
    border-radius: 15px;
  }

  .page-brand-text {
    font-size: 1.5rem;
  }

  .result-shell {
    min-height: 290px;
  }

  .result-title {
    gap: 8px;
  }

  .filter-pill {
    padding: 10px 14px;
    font-size: 0.9rem;
  }

  .page-footer {
    padding-top: 16px;
  }

  .footer-copy {
    font-size: 0.88rem;
  }
}
</style>
