import express, { Request, Response } from "express";
import { GenerateFile } from "./service/post";
import { PostToInstaImage, PostToInstaStory } from "./service/instagram";
import { CreateDir } from "./util/path";

require("dotenv").config();

const port: number = parseInt(process.env.PORT) || 4000;
const app = express();
app.use(express.json());

app.post("/publish", async (req: Request, res: Response) => {
  const outputFile = `output/${req.body.company}/${req.body.category}/${req.body.title}`;

  CreateDir(outputFile);

  const path = await GenerateFile({
    category: req.body.category,
    company: req.body.company,
    companyLogo: req.body.companyLogo,
    title: req.body.title,
    description: req.body.description,
    postPhoto: req.body.postPhoto,
    date: req.body.date,
    link: req.body.link,
    type: req.body.type,
    outputPathName: `${outputFile}/file`,
  });

  console.log("Output file: ", path);

  if (false !== false) {
    await PostToInstaImage(path, false);
  }

  res.send(`Post [${req.body.title}] on Instagram`);
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
