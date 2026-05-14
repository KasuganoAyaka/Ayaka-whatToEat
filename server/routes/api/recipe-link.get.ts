import { getQuery, sendRedirect } from 'h3'

const viewerOrigin = 'https://howtocook.aiursoft.com'

function toRecipeName(sourcePath: string) {
  const normalized = sourcePath.replaceAll('\\', '/')
  const fileName = normalized.split('/').pop() || ''
  return fileName.replace(/\.md$/i, '')
}

function getSearchUrl(recipeName: string) {
  const params = new URLSearchParams({ q: recipeName })
  return `${viewerOrigin}/Dashboard/Index?${params.toString()}`
}

function getFirstDetailPath(html: string) {
  return html.match(/\/Recipes\/Detail\/\d+/)?.[0]
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sourcePath = typeof query.source_path === 'string' ? query.source_path : ''
  const queryName = typeof query.name === 'string' ? query.name.trim() : ''
  const recipeName = queryName || toRecipeName(sourcePath)

  if (!recipeName)
    return sendRedirect(event, viewerOrigin, 302)

  const searchUrl = getSearchUrl(recipeName)

  try {
    const html = await $fetch<string>(searchUrl)
    const detailPath = getFirstDetailPath(html)

    if (detailPath)
      return sendRedirect(event, `${viewerOrigin}${detailPath}`, 302)
  }
  catch (error) {
    console.error('解析 HowToCookViewer 菜谱链接失败:', error)
  }

  return sendRedirect(event, searchUrl, 302)
})
