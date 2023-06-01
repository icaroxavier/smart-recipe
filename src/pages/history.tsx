import PageWrapper from '@/components/PageWrapper'
import { Recipe } from '@/components/Recipe'
import { IRecipe } from '@/types/recipes'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

export default function HistoryPage() {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const { t } = useTranslation('common')

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
      <div className="mb-4 mt-4 flex w-full flex-1 flex-col gap-4">
        {recipes?.map((recipe: IRecipe) => {
          return <Recipe recipe={recipe} key={recipe.name} />
        })}
        {recipes?.length === 0 && (
          <h2 className="my-auto text-center text-2xl text-zinc-600">
            {t('noHistory')}
          </h2>
        )}
      </div>
    </PageWrapper>
  )
}
