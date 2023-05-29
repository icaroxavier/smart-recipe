import { IRecipe } from '@/@types/recipes'
import { FaClock } from 'react-icons/fa'
interface RecipeProps {
  recipe: IRecipe
}

export function Recipe({ recipe }: RecipeProps) {
  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-5 shadow-xl">
      <div className="flex justify-between">
        <h3 className="text-xl text-gray-700">{recipe.name}</h3>
        <span className="flex items-center gap-2 text-gray-500">
          {recipe.timeToCook} <FaClock />
        </span>
      </div>

      <p className="text-sm  text-gray-500">{recipe.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="font-medium text-gray-600">Você utilizará:</span>
        {recipe.tools.map((tool) => (
          <span key={tool} className="flex items-center gap-1 text-gray-500">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            {tool}
          </span>
        ))}
      </div>
      <h4 className="mb-1 mt-4 text-gray-600">Ingredientes necessários: </h4>
      <div className="flex flex-col gap-1 text-sm">
        {recipe.ingredients.map((ingredient) => (
          <span
            key={ingredient}
            className="flex items-center gap-1 text-gray-500"
          >
            <div className="h-2 w-2 rounded-full bg-green-500" />
            {ingredient}
          </span>
        ))}
      </div>
      <h4 className="mb-1 mt-4 text-gray-600">Passo a Passo: </h4>
      <div className="flex flex-col gap-2 text-sm">
        {recipe.steps.map((step) => (
          <div key={step} className="flex items-center gap-2 text-gray-500">
            <input
              type="checkbox"
              className="max-w-5 h-5 max-h-5 w-5 focus:shadow-none"
            />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}