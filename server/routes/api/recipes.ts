// server/api/recipes.ts
import type { Recipe, RecipeResponse } from '~/types'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// 获取本地菜谱
async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const json = await readFile(join(process.cwd(), 'public', 'recipes.json'), 'utf-8')
    return JSON.parse(json) as Recipe[]
  }
  catch (error) {
    console.error('获取本地菜谱数据失败:', error)
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

export default defineEventHandler(async (): Promise<RecipeResponse> => {
  const recipes = await fetchRecipes()
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
