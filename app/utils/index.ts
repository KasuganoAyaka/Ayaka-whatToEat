export function replaceText(text?: string) {
  return text?.replace('的做法', '') || '神马'
}

export function getOriginRecipeLink(source_path?: string) {
  if (!source_path)
    return ''

  return `https://cook.aiursoft.com/${source_path?.replace('.md', '')}`
}
