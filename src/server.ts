import express, { Request, Response } from "express";
import { GenerateFile } from "./service/post";
import { Publish } from "./service/publish";
import { CreateDir } from "./util/path";
import {getNews} from './rss'

require("dotenv").config();

const port: number = parseInt(process.env.PORT) || 4000;
const app = express();
app.use(express.json());

const getRandomArbitrary = (min, max)=>{
  return Math.random() * (max - min) + min;
}
 
app.post("/publish", async (req: Request, res: Response) => {

  const noticias = await getNews();

  for (let index = 0; index < noticias.length; index++) {


    const noticia = noticias[index];

    const outputFile = `output/${noticia.company}/${noticia.category}/${noticia.title}`;

    CreateDir(outputFile);

    const type = getRandomArbitrary(0, 100) > 50 ? "post" : "story";

    console.log(`------------- Publicação Instagram [${index + 1}] - ${type}`)
    console.log(noticia)
 
    const path = await GenerateFile({
      category: noticia.category,
      company: noticia.company,
      companyLogo: noticia.companyLogo,
      title: noticia.title,
      description: noticia.description,
      postPhoto: noticia.postPhoto,
      date: noticia.date,
      link: noticia.link,
      type: type,
      outputPathName: `${outputFile}/${type}`,
    });
  
    console.log("Output file: ", path);
  
    const publishResponse = await Publish(req.body.platform, type, path)
  


    
  }

  res.send(`Success`);

});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
