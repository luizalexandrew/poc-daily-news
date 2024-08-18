/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */

// JSX import is required if you want to use JSX syntax
// Builder is a base class to create your own builders
// loadImage is a helper function to load images from url or path
import { JSX, Builder, loadImage } from "canvacord";

interface Props {
  displayName: string;
  type: "welcome" | "goodbye";
  avatar: string;
  message: string;
}

export class GreetingsCard extends Builder<Props> {
  constructor() {
    // set width and height
    super(1080, 1920);
    // initialize props
    this.bootstrap({
      displayName: "",
      type: "welcome",
      avatar: "",
      message: "",
    });
  }

  setDisplayName(value: string) {
    this.options.set("displayName", value);
    return this;
  }

  setType(value: Props["type"]) {
    this.options.set("type", value);
    return this;
  }

  setAvatar(value: string) {
    this.options.set("avatar", value);
    return this;
  }

  setMessage(value: string) {
    this.options.set("message", value);
    return this;
  }

  // this is where you have to define output ui
  async render() {
    const { type, displayName, avatar, message } = this.options.getOptions();

    // make sure to use the loadImage helper function to load images, otherwise you may get errors
    const image = await loadImage(avatar);
    const post = await loadImage(
      "https://blog.cielo.com.br/wp-content/uploads/2019/03/quais-sao-as-taxas-da-cielo.jpg"
    );

    return (
      <div>
        <div className="bg-[#2B2F35]" style={{
          top: 0,
          left: 0,
          display: 'flex',
          position: 'absolute',
          width: '100%'
        }}>
          <img
            src={post.toDataURL()}
            style={{
              top: 0,
              left: 0,
              display: 'flex',
              position: 'absolute',
              height: '1920px',
              minWidth: '100%',
              transform: 'translateX(-540px)'
            }}
          />
        </div>

        <div className="flex flex-col w-[1080px] h-[1920px] z-10">
          <div className="flex items-start p-10 bg-[#FFFF00] h-[170px]">
            <img
              src={image.toDataURL()}
              className="flex h-[100px] w-[100px] rounded-full"
            />
            <div className="flex flex-col ml-6">
              <h1 className="text-5xl text-white font-bold m-0">
                {type === "welcome" ? "Welcome" : "Olocooo"},{" "}
                <span className="text-blue-500">{displayName}!</span>
              </h1>
              <p className="text-gray-300 text-3xl m-0">{message}</p>
            </div>
          </div>
          <div
            className={`flex`}

          >
            {/* <img
            src={post.toDataURL()}
            className="flex h-[100px] w-[100px] rounded-full"
          />
          <div className="flex flex-col ml-6">
            <h1 className="text-5xl text-white font-bold m-0">
              {type === "welcome" ? "Welcome" : "Olocooo"},{" "}
              <span className="text-blue-500">{displayName}!</span>
            </h1>
            <p className="text-gray-300 text-3xl m-0">{message}</p>
          </div> */}
          </div>
        </div>
        
      </div>
    );
  }
}

export default {
  GreetingsCard,
};
