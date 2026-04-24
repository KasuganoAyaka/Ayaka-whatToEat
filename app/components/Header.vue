<template>
  <header class="top-header">
    <a href="https://github.com/KasuganoAyaka/whatToEat" target="_blank" rel="noopener noreferrer" class="repo-link glass-panel">
      <span class="repo-label">GitHub</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" /></svg>
    </a>
  </header>
</template>

<style scoped>
.top-header {
  position: absolute;
  top: 18px;
  right: 18px;
  left: 18px;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;
}

.repo-link {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
}

.repo-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: transform 0.24s ease, color 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
}

.repo-link:hover {
  color: var(--accent);
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--accent) 32%, var(--border-color));
  box-shadow: var(--shadow-lg);
}

.repo-label {
  font-size: 0.88rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .top-header {
    top: 14px;
    right: 14px;
    left: 14px;
  }

  .repo-link {
    padding: 9px 12px;
  }

  .repo-label {
    display: none;
  }
}
</style>
