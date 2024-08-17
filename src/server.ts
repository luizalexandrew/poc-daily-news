import express, { Request, Response } from "express";
require("dotenv").config();

const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");

import { StickerBuilder } from '../src/sticker-builder';



const app = express();

const port: number = 3000;

const ig = new IgApiClient();

async function login() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}

const postToInstaImage = async () => {
  await login();

  const imageBuffer = await get({
    url: "https://img.freepik.com/vetores-gratis/instagram-fundo-em-cores-gradientes_23-2147823814.jpg",
    encoding: null,
  });
 
  await ig.publish.photo({
    file: imageBuffer,
    caption: "Really nice photo from the internet!", // nice caption (optional)
  });
};

const postToInstaStory = async () => {

    await login();
    const file = await get({
        url: "https://img.freepik.com/vetores-gratis/instagram-fundo-em-cores-gradientes_23-2147823814.jpg",
        encoding: null,
      });
   
    await ig.publish.story({
        file,
        // this creates a new config
        stickerConfig: new StickerBuilder()
          // these are all supported stickers
          .add(
            StickerBuilder.hashtag({
              tagName: 'dadasdasdasdas',
            }),
          )
          // .add(
          //   StickerBuilder.mention({
          //     userId: ig.state.cookieUserId,
          //   }).center(),
          // )
        //   .add(
        //     StickerBuilder.question({
        //       question: 'My Question',
        //     }).scale(0.5),
        //   )
        //   .add(
        //     StickerBuilder.question({
        //       question: 'Music?',
        //       questionType: 'music',
        //     }),
        //   )
        //   .add(
        //     StickerBuilder.countdown({
        //       text: 'My Countdown',
        //       // @ts-ignore
        //       endTs: DateTime.local().plus(Duration.fromObject({ hours: 1 })), // countdown finishes in 1h
        //     }),
        //   )
        //   .add(
        //     StickerBuilder.chat({
        //       text: 'Chat name',
        //     }),
        //   )
        //   .add(
        //     StickerBuilder.location({
        //       locationId: (await ig.locationSearch.index(13, 37)).venues[0].external_id,
        //     }),
        //   )
        //   .add(
        //     StickerBuilder.poll({
        //       question: 'Question',
        //       tallies: [{ text: 'Left' }, { text: 'Right' }],
        //     }),
        //   )
        //   .add(
        //     StickerBuilder.quiz({
        //       question: 'Question',
        //       options: ['0', '1', '2', '3'],
        //       correctAnswer: 1,
        //     }),
        //   )
          // .add(
          //   StickerBuilder.slider({
          //     question: 'Question',
          //     emoji: '❤',
          //   }),
          // )
    
        //   // mention the first story item
        //   .add(StickerBuilder.mentionReel((await ig.feed.userStory('username').items())[0]).center())
    
        //   // mention the first media on your timeline
        //   .add(StickerBuilder.attachmentFromMedia((await ig.feed.timeline().items())[0]).center())
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


};

app.get("/story", async (req: Request, res: Response) => {
  await postToInstaStory();

  res.send("Postando no story instagram");
});

app.get("/image", async (req: Request, res: Response) => {
  await postToInstaImage();

  res.send("Postando no imagem instagram");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
