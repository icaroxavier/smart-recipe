import PageWrapper from '@/components/PageWrapper'
import { Recipe } from '@/components/Recipe'
import { IRecipe } from '@/types/recipes'
import { useEffect, useState } from 'react'

export default function HistoryPage() {
  const [recipes, setRecipes] = useState<IRecipe[]>([])

  useEffect(() => {
    const localRecipes = localStorage.getItem(
      '@icaroxavier/smart-recipe:recipes',
    )
    if (localRecipes) {
      setRecipes(JSON.parse(localRecipes))
    }
  }, [])

  return (
    <PageWrapper>
      <div className="mb-4 mt-4 flex w-full flex-col gap-4">
        {recipes?.map((recipe: IRecipe) => {
          return <Recipe recipe={recipe} key={recipe.name} />
        })}
      </div>
    </PageWrapper>
  )
}
