'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Spinner } from '../components/Spinner'
import Head from 'next/head'
import { Recipe } from '@/components/Recipe'
import { IRecipe, RecipesParams } from '@/types/recipes'
import { Asterisk } from '@/components/Asterisk'
import { FaUtensils } from 'react-icons/fa'
import { getRecipesRequest } from '@/services/recipes'

const recipesFormSchema = z.object({
  recipeDescription: z.string(),
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

  async function getRecipes(params: RecipesParams) {
    try {
      setLoading(true)
      JSON.parse('/saasdasdSD')
      const response = await getRecipesRequest(params)
      setRecipes((state) => [...state, ...response.data])
    } catch (error) {
      toast.error(
        <div className="flex flex-col">
          <h2>Ops, algo deu errado!</h2>
          <p className="text-xs text-gray-400">
            Desculpe pelo transtorno, por favor, tente novamente mais tarde.
          </p>
        </div>,
      )
    } finally {
      setLoading(false)
    }
  }

  function handleRecipesFormSubmit(fields: RecipesFormData) {
    setRecipes([])
    setPreviousFields(fields)
    getRecipes(fields)
  }

  function generateMoreRecipes() {
    previousFields &&
      getRecipes({
        ...previousFields,
        exclude: recipes.map((recipe) => recipe.name),
      })
  }

  return (
    <>
      <Head>
        <title>Receita Inteligente</title>
        <meta name="description" content="A receita que você precisa!" />
      </Head>
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-4 pt-2">
        <h1 className="text-bold mb-4 mt-2 flex w-full items-center justify-center gap-4 rounded-lg bg-rose-500 py-4 text-2xl text-gray-50">
          <FaUtensils /> Receita Inteligente
        </h1>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(handleRecipesFormSubmit)}
        >
          <div className="flex flex-col">
            <label
              className="text-sm text-gray-600"
              htmlFor="recipeDescription"
            >
              Descreva quais ingredientes você tem em casa, o que você quer que
              conste na receita, uma receita que você já conhece ou até mesmo um
              prato que você gostaria de comer <Asterisk />
            </label>
            <textarea
              id="recipeDescription"
              className="rounded border border-gray-400 px-2 py-1 text-sm placeholder:text-gray-400"
              placeholder="Ex: Alguma receita com frango, queijo e tomate. Ou você também pode ser mais específico 
              e dizer que quer uma receita de lasanha ou alguma receita do italiana."
              {...register('recipeDescription')}
              required
              rows={4}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600" htmlFor="time">
              Em quanto tempo você quer comer?
            </label>
            <input
              id="time"
              type="text"
              className="rounded border border-gray-400 px-2 py-1 text-sm placeholder:text-gray-400"
              placeholder="Ex: 30 minutos, 1 hora"
              {...register('time')}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600" htmlFor="tools">
              Você quer usar algum equipamento em específico?
            </label>
            <input
              id="tools"
              type="text"
              className="rounded border border-gray-400 px-2 py-1 text-sm placeholder:text-gray-400"
              placeholder="Ex: fogão, forno, air fryer..."
              {...register('tools')}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label
              className="text-sm text-gray-600"
              htmlFor="alimentaryRestrictions"
            >
              Tem alguma restrição alimentar?
            </label>
            <input
              id="alimentaryRestrictions"
              type="text"
              className="rounded border border-gray-400 px-2 py-1 text-sm placeholder:text-gray-400"
              placeholder="Ex: vegano, intorelância a lactose..."
              {...register('alimentaryRestrictions')}
            />
          </div>
          <button
            type="submit"
            className={`flex h-12 cursor-pointer items-center justify-center 
          gap-2 rounded-lg bg-green-400 text-gray-50 transition-all hover:bg-green-500  disabled:opacity-70 ${
            loading ? 'cursor-wait' : 'disabled:cursor-not-allowed'
          }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner /> A resposta pode demorar um pouco...
              </>
            ) : (
              'Buscar receitas'
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
          gap-2 rounded-lg bg-green-400 text-gray-50 transition-all hover:bg-green-500  disabled:opacity-70 ${
            loading ? 'cursor-wait' : 'disabled:cursor-not-allowed'
          }`}
            disabled={loading}
            onClick={generateMoreRecipes}
          >
            {loading ? (
              <>
                <Spinner /> A resposta pode demorar um pouco...
              </>
            ) : (
              'Gerar mais receitas'
            )}
          </button>
        )}
        <footer className="mx-auto mb-2 mt-auto text-sm text-gray-500">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://github.com/icaroxavier"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline hover:text-blue-600"
          >
            Ícaro Xavier
          </a>
          . All rights reserved.
        </footer>
      </main>
      <ToastContainer />
    </>
  )
}
