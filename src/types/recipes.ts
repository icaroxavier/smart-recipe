export interface RecipesParams {
  recipeIngredientsOrInstructionsOrSpecific: string
  time: string
  tools: string
  alimentaryRestrictions: string
  exclude?: string[]
  lang: string
}

export interface IRecipe {
  name: string
  description: string
  ingredients: string[]
  tools: string[]
  steps: string[]
  timeToCook: string
}
