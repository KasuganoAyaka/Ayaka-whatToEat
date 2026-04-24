<template>
  <div class="loading-shell" aria-live="polite" aria-label="页面加载中">
    <div class="loading-orb orb-left" />
    <div class="loading-orb orb-right" />

    <div class="loading-card glass-panel">
      <div class="loading-brand">
        <img src="/logo.png" alt="Ayaka Eat logo" class="brand-avatar">
        <span class="brand-text">Ayaka Eat</span>
      </div>

      <div class="loading-copy">
        <span class="loading-title accent-gradient-text">Loading</span>
        <span class="loading-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div class="loading-bar" aria-hidden="true">
        <span class="loading-bar-fill" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-shell {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  overflow: hidden;
  padding: 24px;
}

.loading-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(14px);
  opacity: 0.72;
  pointer-events: none;
}

.orb-left {
  top: calc(50% - 120px);
  left: calc(50% - 240px);
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(57, 197, 187, 0.26) 0%, rgba(57, 197, 187, 0) 72%);
}

.orb-right {
  top: calc(50% - 40px);
  right: calc(50% - 240px);
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, rgba(102, 126, 234, 0) 74%);
}

.loading-card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: min(360px, calc(100vw - 32px));
  padding: 24px 24px 22px;
  border-radius: 28px;
}

.loading-brand {
  display: inline-flex;
  align-items: center;
  align-self: center;
  gap: 12px;
  padding: 8px 14px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg-card) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 80%, transparent);
}

.brand-avatar {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 12px 26px rgba(57, 197, 187, 0.18);
}

.brand-text {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.loading-copy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.loading-title {
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
}

.loading-dots {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding-top: 4px;
}

.loading-dots i {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--gradient-primary);
  box-shadow: 0 8px 18px rgba(57, 197, 187, 0.24);
  animation: pulse 1.1s ease-in-out infinite;
}

.loading-dots i:nth-child(2) {
  animation-delay: 0.16s;
}

.loading-dots i:nth-child(3) {
  animation-delay: 0.32s;
}

.loading-bar {
  position: relative;
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg-soft) 88%, white);
  border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
}

.loading-bar-fill {
  position: absolute;
  inset: 0;
  width: 42%;
  border-radius: inherit;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.58) 45%, rgba(255, 255, 255, 0) 100%),
    var(--gradient-primary);
  box-shadow: 0 10px 24px rgba(57, 197, 187, 0.24);
  animation: loading-slide 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
    transform: translateY(0) scale(0.9);
  }

  50% {
    opacity: 1;
    transform: translateY(-2px) scale(1.08);
  }
}

@keyframes loading-slide {
  0% {
    transform: translateX(-110%);
  }

  100% {
    transform: translateX(300%);
  }
}

@media (max-width: 640px) {
  .loading-card {
    gap: 16px;
    padding: 20px 18px 18px;
    border-radius: 24px;
  }

  .loading-brand {
    gap: 10px;
    padding: 7px 12px;
  }

  .brand-avatar {
    width: 36px;
    height: 36px;
    border-radius: 12px;
  }

  .loading-title {
    font-size: 1.8rem;
  }

  .loading-dots {
    gap: 6px;
  }

  .loading-dots i {
    width: 9px;
    height: 9px;
  }
}
</style>
