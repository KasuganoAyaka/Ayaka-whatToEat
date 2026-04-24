export default defineNuxtPlugin(async () => {
  const cleanupKey = 'ayaka-eat-pwa-cleanup-done'

  const clearCaches = async () => {
    if (!('caches' in window))
      return false

    const cacheKeys = await caches.keys()
    await Promise.all(cacheKeys.map(key => caches.delete(key)))
    return cacheKeys.length > 0
  }

  const clearServiceWorkers = async () => {
    if (!('serviceWorker' in navigator))
      return false

    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map(registration => registration.unregister()))
    return registrations.length > 0
  }

  const hadRegistrations = await clearServiceWorkers()
  const hadCaches = await clearCaches()

  if ((hadRegistrations || hadCaches) && sessionStorage.getItem(cleanupKey) !== 'true') {
    sessionStorage.setItem(cleanupKey, 'true')
    window.location.reload()
    return
  }

  sessionStorage.removeItem(cleanupKey)
})
