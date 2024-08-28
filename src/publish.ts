var fs = require("fs");
import { Font } from "canvacord";
import { GreetingsCard } from "./GreetingsCard";


type DataFile = {
  company: string;
  companyLogo: string;
  category: string;
  title: string;
  description: string;
  date: string;
  link: string;
  type: "story" | "post" | "postlg";
  outputPathName: string;
};

export const GenerateFile = async (dataFile: DataFile) => {
  const path = __dirname + "/font/Ubuntu-Light.ttf";
  await Font.fromFile(path);

  const outputPath = `${dataFile.outputPathName}.jpg`

  const card = new GreetingsCard(dataFile.type)
    .setCompany(dataFile.company)
    .setCompanyLogo(dataFile.companyLogo)
    .setCategory(dataFile.category)
    .setTitle(dataFile.title)
    .setDescription(dataFile.description)
    .setDate(dataFile.date)
    .setLink(dataFile.link)
    .setType(dataFile.type)
    .setOutputPathName(dataFile.outputPathName);

  const image = await card.build({ format: "jpeg" });

  fs.writeFileSync(outputPath, image);

  return outputPath

};

export default {
    GenerateFile
}