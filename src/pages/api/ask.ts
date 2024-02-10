import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.body.code;
  const question = req.body.question;
  if (!code || !question) {
    res.status(400).json({
      status: 400,
      answer: "Can't ask question without code or question",
    });
    return;
  }

  const config = {
    apiKey: process.env.OPENAI_API_KEY,
  };
  const openai = new OpenAI(config);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: String(process.env.OPENAI_SYSTEM_PROMPT) },
      { role: "user", content: String(process.env.OPENAI_FIRST_USER_PROMPT) },
      { role: "user", content: question + "```" + code + "```" },
    ],
  });

  res.status(200).json({
    status: 200,
    answer: completion.choices[0].message.content,
  });
}
