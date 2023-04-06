import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dir = path.resolve("./public", "data");
  const file = path.join(dir, "code.txt");

  try {
    const data = await fs.promises.readFile(file, "utf8");
    res.status(200).json({
      status: 200,
      code: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      code: "Error: Contact the developer",
    });
  }
}
