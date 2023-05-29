export interface RecipesParams {
  recipeDescription: string
  time: string
  tools: string
  exclude?: string[]
}

export interface IRecipe {
  name: string
  description: string
  ingredients: string[]
  tools: string[]
  steps: string[]
  timeToCook: string
}