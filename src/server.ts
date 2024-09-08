import express, { Request, Response } from "express";
import { GenerateFile } from "./service/post";
import { Publish } from "./service/publish";
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
    outputPathName: `${outputFile}/${req.body.type}`,
  });

  console.log("Output file: ", path);

  const publishResponse = await Publish(req.body.platform, req.body.type, path)

  console.log(publishResponse)

  res.send(`Post [${req.body.title}] on Instagram [${publishResponse.isError} - ${publishResponse.message}]`);
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
