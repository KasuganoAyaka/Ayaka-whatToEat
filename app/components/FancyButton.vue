<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <span class="fancy-button">
    <span class="button-glow" />
    <span class="button-content">
      <span class="button-text">{{ props.text }}</span>
      <span class="button-icon" aria-hidden="true">→</span>
    </span>
  </span>
</template>

<style scoped>
.fancy-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: min(250px, 72vw);
  padding: 6px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(57, 197, 187, 0.46), rgba(102, 126, 234, 0.34));
  box-shadow: 0 18px 40px rgba(57, 197, 187, 0.18);
  overflow: hidden;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.fancy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 55px rgba(57, 197, 187, 0.22);
}

.button-glow {
  position: absolute;
  inset: -30%;
  background:
    radial-gradient(circle at 25% 50%, rgba(255, 255, 255, 0.85), transparent 24%),
    radial-gradient(circle at 80% 45%, rgba(57, 197, 187, 0.28), transparent 22%);
  opacity: 0.72;
  transition: transform 0.35s ease;
}

.fancy-button:hover .button-glow {
  transform: translateX(8px);
}

.button-content {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 16px 28px;
  border-radius: 999px;
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-glass) 94%, transparent);
  border: 1px solid rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
}

.button-text {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  color: #fff;
  background: var(--gradient-primary);
  font-size: 0.92rem;
  box-shadow: 0 8px 18px rgba(57, 197, 187, 0.26);
  transition: transform 0.24s ease;
}

.fancy-button:hover .button-icon {
  transform: translateX(3px);
}
</style>
