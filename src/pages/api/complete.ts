import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = req.body.code;
  const instruction = req.body.instruction;
  if (!input || !instruction) {
    res.status(400).json({
      status: 400,
      code: "Can't have Code or Instruction empty"
    });
    return;
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createEdit({
    model: "code-davinci-edit-001",
    input: input,
    instruction: instruction,
    temperature: 0.7,
    top_p: 1
  });

  if (response.status !== 200) {
    res.status(500).json({
      status: 500,
      code: "Error: Contact the developer"
    });
  } else {
    res.status(200).json({
      status: 200,
      code: response.data.choices[0].text
    });
  }
}
