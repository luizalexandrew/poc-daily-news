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
    .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png")
    .setDisplayName("Wumpus")
    .setType("goodbye")
    .setMessage("Welcome to the server!");

  const image = await card.build({ format: "jpeg" });

  fs.writeFileSync(outputPath, image);

  return outputPath

};

export default {
    GenerateFile
}