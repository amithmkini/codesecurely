import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.body.code;
  const question = req.body.question;
  if (!code || !question) {
    res.status(400).json({
      status: 400,
      answer: "Can't ask question without code or question"
    });
    return;
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: String(process.env.OPENAI_SYSTEM_PROMPT)},
      {role: "user", content: String(process.env.OPENAI_FIRST_USER_PROMPT)},
      {role: "user", content: question + "```" + code + "```"}
    ]
  });

  if (completion.status !== 200) {
    res.status(500).json({
      status: 500,
      answer: "Error: Contact the developer"
    });
  } else {
    res.status(200).json({
      status: 200,
      answer: completion.data.choices[0].message
    });
  }
}
