import { RecipesParams } from '@/types/recipes'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed, please use GET' })
  }
  const params: RecipesParams = req.body.params
  console.log('params: ', params)
  const prompt = `
    Com base no JSON: ${JSON.stringify(params, null, 2)},
    gere pra mim 1 receita no formato JSON. 
    Contendo: "name", "description", "timeToCook", uma lista de "ingredients", uma lista de "tools", uma lista de "steps".
  `
  const payload = {
    model: 'text-davinci-003',
    max_tokens: 2048,
    prompt,
  }

  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  }

  const { data } = await axios.post(
    'https://api.openai.com/v1/completions',
    payload,
    { headers },
  )

  const responseText = data.choices[0].text.trim()

  console.log('responseText: ', responseText)

  const json = JSON.parse(responseText)

  return res.status(200).json(json)
}
