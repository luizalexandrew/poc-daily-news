import express, { Request, Response } from "express";
require("dotenv").config();

const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");

const CronJob = require("cron").CronJob;

const app = express();

const port: number = 3000;

const postToInsta = async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  const imageBuffer = await get({
    url: "https://img.freepik.com/vetores-gratis/instagram-fundo-em-cores-gradientes_23-2147823814.jpg",
    encoding: null,
  });

  await ig.publish.photo({
    file: imageBuffer,
    caption: "Really nice photo from the internet!", // nice caption (optional)
  });
};

app.get("/", (req: Request, res: Response) => {
  postToInsta();

  res.send("Postando no instagram");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
