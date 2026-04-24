// server/api/recipes.ts
import type { Recipe, RecipeResponse } from '~/types'
import { getRequestURL } from 'h3'

// 获取远程菜谱
async function fetchRecipes(origin: string): Promise<Recipe[]> {
  try {
    const recipes = await $fetch<Recipe[]>(`${origin}/recipes.json`)
    return recipes as Recipe[]
  }
  catch (error) {
    console.error('获取远程菜谱数据失败:', error)
    return []
  }
}

// 获取所有分类
function getAllCategories(recipes: Recipe[]): string[] {
  const categories = new Set<string>()
  recipes?.forEach((r) => {
    if (r.category)
      categories.add(r.category)
  })
  return [...categories]
}

export default defineEventHandler(async (event): Promise<RecipeResponse> => {
  const origin = getRequestURL(event).origin
  const recipes = await fetchRecipes(origin)
  const categories = getAllCategories(recipes)
  const recipesNameList = recipes.map(recipe => recipe.name)

  return {
    count: recipes.length,
    total: recipes.length,
    categories,
    recipesNameList,
    recipes,
  }
})
