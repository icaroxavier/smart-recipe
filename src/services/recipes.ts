import { RecipesParams } from '@/types/recipes'
import axios from 'axios'

export async function getRecipesRequest(params: RecipesParams) {
  console.log('params: ', params)
  const text = `
    O meu site que deverá gerar receitas inteligentes conforme 
    o que o usuário preencheu nos seguintes campos, 
    "recipeDescription" são ingredientes que o usuário quer que apareça na receita, 
    pode ser um pedaço de uma receita que ele já conhece, pode ser uma receita especifica que ele quer, 
    o usário fica livre para escrever o que quiser, 
    "time" é o tempo médio que ele quer levar na receita (campo opcional), 
    "tools" é os esquipamentos que o usuário tem preferência para utilizar (campo opcional).
    "exclude" é uma lista de receitas que o usuário já viu e não deve mais aparecer (campo opcional).
    "alimentaryRestrictions" é um campo onde o usuário pode preencher alguma ou várias restrições alimentares (campo opcional).
    Assumindo que o usuário já tem os ingredientes básicos em casa, como sal, açucar, água e óleo,
    gere pra mim 2 receitas.
    Os dados estão aqui : ${JSON.stringify(params, null, 2)} , 
    O retorno da API deverá ser apenas um JSON válido sem linguagem natural 
    que functione dentro do JSON.parse() do JavaScript e deverá ter este formato: 
    Uma lista de receitas, cada receita deverá ter um "name", uma "description", um "timeToCook", 
    uma lista de "ingredients", uma lista de "tools", uma lista de "steps".
  `
  const payload = {
    model: 'text-davinci-003',
    prompt: text,
    temperature: 0,
    max_tokens: 2048,
    top_p: 0.2,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }

  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  }

  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    payload,
    { headers },
  )

  const responseText = response.data.choices[0].text.trim()
  const data = JSON.parse(responseText)
  return data
}
