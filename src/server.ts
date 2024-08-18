import express, { Request, Response } from "express";
require("dotenv").config();

const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");

var fs = require("fs");

import { StickerBuilder } from "../src/sticker-builder";

import { Font } from "canvacord";
import { GreetingsCard } from "./GreetingsCard";

const app = express();

const port: number = 3000;

const ig = new IgApiClient();

const clamp = (value: number, min: number, max: number) =>
  Math.max(Math.min(value, max), min);

async function generateUsertagFromName(
  name: string,
  x: number,
  y: number
): Promise<{ user_id: number; position: [number, number] }> {
  // constrain x and y to 0..1 (0 and 1 are not supported)
  x = clamp(x, 0.0001, 0.9999);
  y = clamp(y, 0.0001, 0.9999);
  // get the user_id (pk) for the name
  const { pk } = await ig.user.searchExact(name);
  return {
    user_id: pk,
    position: [x, y],
  };
}

async function login() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}

const postToInstaImage = async (buffer, isPost = false) => {
  // let file = fs.readFileSync('file.jpg');

  // const imageBuffer = await get({
  //   url: "../file.jpg",
  //   encoding: null,
  // });

  // await ig.publish.photo({
  //   file: buffer,
  //   // file: imageBuffer,
  //   caption: "Really nice photo from the internet!", // nice caption (optional)
  // });

  if (isPost) {
    await login();
    const path = "file.jpg";
    // const { latitude, longitude, searchQuery } = {
    //   latitude: 0.0,
    //   longitude: 0.0,
    //   // not required
    //   searchQuery: "place",
    // };

    // /**
    //  * Get the place
    //  * If searchQuery is undefined, you'll get the nearest places to your location
    //  * this is the same as in the upload (-configure) dialog in the app
    //  */
    // const locations = await ig.search.location(
    //   latitude,
    //   longitude,
    //   searchQuery
    // );
    /**
     * Get the first venue
     * In the real world you would check the returned locations
     */
    // const mediaLocation = locations[0];
    // console.log(mediaLocation);

    const publishResult = await ig.publish.photo({
      // read the file into a Buffer
      file: fs.readFileSync(path),
      // optional, default ''
      caption: "my caption",
      ds_user_id: "daily.fin.dev",
      // optional
      // location: mediaLocation,
      // optional
      usertags: {
        in: [
          // tag the user 'instagram' @ (0.5 | 0.5)
          await generateUsertagFromName("instagram", 0.5, 0.5),
        ],
      },
    });

    console.log(publishResult);
  }
};

const postToInstaStory = async (buffer, isPost = false) => {
  if (isPost) {
    await login();
    const path = "file.jpg";
    const file = fs.readFileSync(path);

    await ig.publish.story({
      file,
      // this creates a new config
      stickerConfig: new StickerBuilder()
        // these are all supported stickers
        .add(
          StickerBuilder.hashtag({
            tagName: "dailyFin",
          }).center()
        )
        // .add(
        //   StickerBuilder.mention({
        //     userId: ig.state.cookieUserId,
        //   }).center(),
        // )
        // .add(
        //   StickerBuilder.question({
        //     question: 'My Question',
        //   }).scale(0.5),
        // )
        // .add(
        //   StickerBuilder.question({
        //     question: 'Music?',
        //     questionType: 'music',
        //   }),
        // )
        // .add(
        //   StickerBuilder.countdown({
        //     text: 'My Countdown',
        //     // @ts-ignore
        //     endTs: DateTime.local().plus(Duration.fromObject({ hours: 1 })), // countdown finishes in 1h
        //   }),
        // )
        // .add(
        //   StickerBuilder.chat({
        //     text: 'Chat name',
        //   }),
        // )
        // .add(
        //   StickerBuilder.location({
        //     locationId: (await ig.locationSearch.index(13, 37)).venues[0].external_id,
        //   }),
        // )
        // .add(
        //   StickerBuilder.poll({
        //     question: 'Question',
        //     tallies: [{ text: 'Left' }, { text: 'Right' }],
        //   }),
        // )
        // .add(
        //   StickerBuilder.quiz({
        //     question: 'Question',
        //     options: ['0', '1', '2', '3'],
        //     correctAnswer: 1,
        //   }),
        // )
        // .add(
        //   StickerBuilder.slider({
        //     question: 'Question',
        //     emoji: '❤',
        //   }),
        // )

        // // mention the first story item
        // .add(StickerBuilder.mentionReel((await ig.feed.userStory('username').items())[0]).center())

        // // mention the first media on your timeline
        // .add(StickerBuilder.attachmentFromMedia((await ig.feed.timeline().items())[0]).center())

        // // you can also set different values for the position and dimensions
        // .add(
        //   StickerBuilder.hashtag({
        //     tagName: 'insta',
        //     width: 0.5,
        //     height: 0.5,
        //     x: 0.5,
        //     y: 0.5,
        //   }),
        // )
        .build(),
    });
  }
};

app.get("/story", async (req: Request, res: Response) => {
  // Font.loadDefault();

  // // create card
  // Font.loadDefault();
  const path = __dirname + "/font/Ubuntu-Light.ttf";

  console.log(path);
  // loading font from file would be like this
  await Font.fromFile(path);
  // or synchronously

  // create card
  const card = new GreetingsCard("story")
    .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png")
    .setDisplayName("Wumpus")
    .setType("goodbye")
    .setMessage("Welcome to the server!");

  const image = await card.build({ format: "jpeg" });

  fs.writeFileSync("file.jpg", image);

  await postToInstaStory(image, false);

  res.send("Postando no story instagram");
});

app.get("/image", async (req: Request, res: Response) => {
  // Font.loadDefault();

  // // create card
  // Font.loadDefault();
  const path = __dirname + "/font/Ubuntu-Light.ttf";

  console.log(path);
  // loading font from file would be like this
  await Font.fromFile(path);
  // or synchronously

  // create card
  const card = new GreetingsCard("post")
    .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png")
    .setDisplayName("Wumpus")
    .setType("goodbye")
    .setMessage("Welcome to the server!");

  const image = await card.build({ format: "jpeg" });

  fs.writeFileSync("file.jpg", image);

  await postToInstaImage(image, false);

  res.send("Postando no story instagram");
});

// load font, in this case we are loading the bundled font from canvacord

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
