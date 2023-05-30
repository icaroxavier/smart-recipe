import { RecipesParams } from '@/types/recipes'
import { Configuration, OpenAIApi } from 'openai'
import { NextApiRequest, NextApiResponse } from 'next'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params: RecipesParams = req.body.params

  console.log('params: ', params)

  const prompt = `
    Com base no JSON: ${JSON.stringify(params, null, 2)},
    gere pra mim 1 receita no formato JSON. 
    Contendo: "name", "description", "timeToCook", uma lista de "ingredients", uma lista de "tools", uma lista de "steps".
  `

  const completion = (await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 2048,
    prompt,
  })) as any

  const responseText = completion.data.choices[0].text.trim()

  console.log('responseText: ', responseText)

  const data = JSON.parse(responseText)

  return res.status(200).json(data)
}
