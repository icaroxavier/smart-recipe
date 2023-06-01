import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Spinner } from '../components/Spinner'
import { Recipe } from '@/components/Recipe'
import { IRecipe, RecipesParams } from '@/types/recipes'
import { Asterisk } from '@/components/Asterisk'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import PageWrapper from '@/components/PageWrapper'

const recipesFormSchema = z.object({
  recipeIngredientsOrInstructionsOrSpecific: z.string(),
  time: z.string(),
  tools: z.string(),
  alimentaryRestrictions: z.string(),
})

type RecipesFormData = z.infer<typeof recipesFormSchema>

export default function Home() {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [previousFields, setPreviousFields] = useState<RecipesFormData | null>(
    null,
  )
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<RecipesFormData>({
    resolver: zodResolver(recipesFormSchema),
  })
  const { t, lang } = useTranslation('common')

  function addRecipeToLocalStorage(recipe: IRecipe) {
    const localRecipes = localStorage.getItem(
      '@icaroxavier/smart-recipe:recipes',
    )
    if (localRecipes) {
      const localRecipesParsed = JSON.parse(localRecipes)
      localStorage.setItem(
        '@icaroxavier/smart-recipe:recipes',
        JSON.stringify([recipe, ...localRecipesParsed]),
      )
    } else {
      localStorage.setItem(
        '@icaroxavier/smart-recipe:recipes',
        JSON.stringify([recipe]),
      )
    }
  }

  async function getRecipes(params: RecipesParams) {
    try {
      setLoading(true)
      const response = await axios.post('/api/recipes', { params })
      setRecipes((state) => [...state, response.data])
      addRecipeToLocalStorage(response.data)
    } catch (error) {
      toast.error(
        <div className="flex flex-col">
          <h2>{t('error.title')}</h2>
          <p className="text-xs text-zinc-400">{t('error.message')}</p>
        </div>,
      )
    } finally {
      setLoading(false)
    }
  }

  function handleRecipesFormSubmit(fields: RecipesFormData) {
    setRecipes([])
    setPreviousFields(fields)
    getRecipes({ ...fields, lang })
  }

  function generateMoreRecipes() {
    previousFields &&
      getRecipes({
        ...previousFields,
        exclude: recipes.map((recipe) => recipe.name),
        lang,
      })
  }

  return (
    <PageWrapper>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(handleRecipesFormSubmit)}
      >
        <div className="flex flex-col">
          <label
            className="text-zinc-600"
            htmlFor="recipeIngredientsOrInstructionsOrSpecific"
          >
            {t('recipeIngredientsOrInstructionsOrSpecific.label')} <Asterisk />
          </label>
          <textarea
            id="recipeIngredientsOrInstructionsOrSpecific"
            className="rounded border border-zinc-400 px-2 py-1 placeholder:text-zinc-400"
            placeholder={t(
              'recipeIngredientsOrInstructionsOrSpecific.placeholder',
            )}
            {...register('recipeIngredientsOrInstructionsOrSpecific')}
            required
            rows={4}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-zinc-600" htmlFor="time">
            {t('time.label')}
          </label>
          <input
            id="time"
            type="text"
            className="rounded border border-zinc-400 px-2 py-1 placeholder:text-zinc-400"
            placeholder={t('time.placeholder')}
            {...register('time')}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-zinc-600" htmlFor="tools">
            {t('tools.label')}
          </label>
          <input
            id="tools"
            type="text"
            className="rounded border border-zinc-400 px-2 py-1 placeholder:text-zinc-400"
            placeholder={t('tools.placeholder')}
            {...register('tools')}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-zinc-600" htmlFor="alimentaryRestrictions">
            {t('alimentaryRestrictions.label')}
          </label>
          <input
            id="alimentaryRestrictions"
            type="text"
            className="rounded border border-zinc-400 px-2 py-1 placeholder:text-zinc-400"
            placeholder={t('alimentaryRestrictions.placeholder')}
            {...register('alimentaryRestrictions')}
          />
        </div>
        <button
          type="submit"
          className={`flex h-12 cursor-pointer items-center justify-center 
          gap-2 rounded-lg bg-green-400 text-zinc-50 transition-all hover:bg-green-500  disabled:opacity-70 ${
            loading ? 'cursor-wait' : 'disabled:cursor-not-allowed'
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner /> {t('loadingMessage')}
            </>
          ) : (
            t('generate')
          )}
        </button>
      </form>
      <div className="mb-4 mt-4 flex w-full flex-col gap-4">
        {recipes?.map((recipe: IRecipe) => {
          return <Recipe recipe={recipe} key={recipe.name} />
        })}
      </div>

      {recipes.length > 0 && (
        <button
          className={`mb-8 flex h-12 w-full cursor-pointer  items-center justify-center
          gap-2 rounded-lg bg-green-400 text-zinc-50 transition-all hover:bg-green-500  disabled:opacity-70 ${
            loading ? 'cursor-wait' : 'disabled:cursor-not-allowed'
          }`}
          disabled={loading}
          onClick={generateMoreRecipes}
        >
          {loading ? (
            <>
              <Spinner /> {t('loadingMessage')}
            </>
          ) : (
            t('generateMore')
          )}
        </button>
      )}
    </PageWrapper>
  )
}
