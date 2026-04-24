<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --bg-primary: #f7fafc;
  --bg-secondary: rgba(255, 255, 255, 0.78);
  --bg-card: rgba(255, 255, 255, 0.72);
  --bg-glass: rgba(255, 255, 255, 0.66);
  --bg-soft: #eef5f7;
  --text-primary: #1e293b;
  --text-secondary: #5f7288;
  --text-tertiary: #8aa0b6;
  --border-color: rgba(148, 163, 184, 0.2);
  --border-strong: rgba(57, 197, 187, 0.22);
  --accent: #39c5bb;
  --accent-strong: #2eb7ae;
  --accent-secondary: #667eea;
  --accent-light: rgba(57, 197, 187, 0.12);
  --shadow-sm: 0 10px 30px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 18px 45px rgba(15, 23, 42, 0.1);
  --shadow-lg: 0 26px 80px rgba(15, 23, 42, 0.14);
  --gradient-primary: linear-gradient(135deg, #39c5bb, #667eea);
  --gradient-bg:
    radial-gradient(circle at top left, rgba(57, 197, 187, 0.15), transparent 28%),
    radial-gradient(circle at top right, rgba(102, 126, 234, 0.12), transparent 24%),
    linear-gradient(135deg, #f8fbfd 0%, #ecf3f6 48%, #f8fafc 100%);
}

html,
body,
#__nuxt {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  color: var(--text-primary);
  font-family: 'Noto Sans SC', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--gradient-bg);
  background-attachment: fixed;
}

a {
  color: inherit;
}

::selection {
  background: var(--accent-light);
  color: var(--text-primary);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(138, 160, 182, 0.7);
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(95, 114, 136, 0.9);
}

.glass-panel {
  background: color-mix(in srgb, var(--bg-glass) 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 86%, transparent);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.accent-gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.site-shell {
  min-height: 100vh;
}
</style>
