import { NextResponse } from 'next/server'
import { RecipesParams } from '@/types/recipes'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {
  const req = await request.json()
  const params: RecipesParams = req.params

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
  return NextResponse.json(data)
}
