var fs = require("fs");
require("dotenv").config();

const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");
import { ProcessProps } from "../../../types/Process";

import {
  StickerBuilder,
  Clamp,
  GenerateUsertagFromName,
} from "./sticker-builder";

const ig = new IgApiClient();
let isLogin = false

async function login() {
  if(!isLogin){
    ig.state.generateDevice(process.env.IG_USERNAME);
    ig.state.proxyUrl = process.env.IG_PROXY;
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    isLogin = true
  }
}


const IS_POST = Boolean(process.env.IS_PUBLISH) || false;

export const PostToInstaImage = async (path): Promise<ProcessProps> => {
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

  if (IS_POST) {
    try {
      await login();
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
            await GenerateUsertagFromName("instagram", 0.5, 0.5, ig),
          ],
        },
      });

      return {
        isSuccess: true,
        message: "Publish on Instagram",
      };
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        message: "Error publish on Instagram",
      };
    }
  } else {
    return {
      isSuccess: true,
      message: "Publish on Instagram [disabled]",
    };
  }
};

export const PostToInstaStory = async (path): Promise<ProcessProps> => {
  if (IS_POST) {
    try {
      await login();
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

      return {
        isSuccess: true,
        message: "Publish on Instagram",
      };
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        message: "Error publish on Instagram",
      };
    }
  } else {
    return {
      isSuccess: true,
      message: "Publish on Instagram [disabled]",
    };
  }
};

// app.get("/story", async (req: Request, res: Response) => {
//   // Font.loadDefault();

//   // // create card
//   // Font.loadDefault();
//   const path = __dirname + "/font/Ubuntu-Light.ttf";

//   console.log(path);
//   // loading font from file would be like this
//   await Font.fromFile(path);
//   // or synchronously

//   // create card
//   const card = new GreetingsCard("story")
//     .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png")
//     .setDisplayName("Wumpus")
//     .setType("goodbye")
//     .setMessage("Welcome to the server!");

//   const image = await card.build({ format: "jpeg" });

//   fs.writeFileSync("file.jpg", image);

//   await postToInstaStory(image, false);

//   res.send("Postando no story instagram");
// });

export default {
  PostToInstaImage,
  PostToInstaStory,
};
