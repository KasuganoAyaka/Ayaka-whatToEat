export function replaceText(text?: string) {
  return text?.replace('的做法', '') || '神马'
}

export function getOriginRecipeLink(source_path?: string, name?: string) {
  if (!source_path)
    return ''

  const params = new URLSearchParams({ source_path })

  if (name)
    params.set('name', replaceText(name))

  return `/api/recipe-link?${params.toString()}`
}
