var fs = require("fs");
import { Font } from "canvacord";
import { Card } from "./Card";
import { CardProps } from "./types/Card"

export const GenerateFile = async (dataFile: CardProps) => {
  const path = __dirname + "/font/Ubuntu-Light.ttf";
  await Font.fromFile(path);

  const outputPath = `${dataFile.outputPathName}.jpg`

  const card = new Card(dataFile.type)
    .setCompany(dataFile.company)
    .setCompanyLogo(dataFile.companyLogo)
    .setCategory(dataFile.category)
    .setTitle(dataFile.title)
    .setDescription(dataFile.description)
    .setDate(dataFile.date)
    .setLink(dataFile.link)
    .setType(dataFile.type)
    .setPostPhoto(dataFile.postPhoto)
    .setOutputPathName(dataFile.outputPathName);

  const image = await card.build({ format: "jpeg" });

  fs.writeFileSync(outputPath, image);

  return outputPath

};

export default {
    GenerateFile
}