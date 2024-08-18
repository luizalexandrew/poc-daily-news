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
  size: "story" | "post" | "postlg";
}

export class GreetingsCard extends Builder<Props> {
  constructor(value: "story" | "post" | "postlg") {

    switch (value) {
      case 'story':
        super(1080, 1920);
        this.setSize('story')
        break;
      case 'post':
        super(1080, 1080);
        this.setSize('post')
        break;
      case 'postlg':
        super(1080, 608);
        this.setSize('postlg')
        break;
      default:
        super(1080, 608);
        break;
    }

    // this.bootstrap({
    //   displayName: "",
    //   type: "welcome",
    //   avatar: "",
    //   message: "",
    //   size: this.s
    // });
  }

  setSize(value: "story" | "post" | "postlg") {
    this.options.set("size", value);
    return this;
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
    const { type, displayName, avatar, message, size } = this.options.getOptions();

    // make sure to use the loadImage helper function to load images, otherwise you may get errors
    const image = await loadImage("https://files.metropoles.com/static/expediente/assets/images/general/portal-metropoles.jpg");
    const post = await loadImage(
      "https://www.infomoney.com.br/wp-content/uploads/2024/06/2024-06-06T200313Z_1_LYNXMPEK550T9_RTROPTP_4_META-WHATSAPP-BRAZIL.jpg"
    );

    const logo = await loadImage(
      "https://logodownload.org/wp-content/uploads/2019/09/infomoney-logo.png"
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
              height: `${this.height}px`,
              minWidth: '100%',
              transform: 'translateX(-540px)'
            }}
          />
        </div>

        <div className={`flex flex-col w-[${this.width}px] h-[${this.height}px]`}>

          <div
            className="flex flex-col bg-[#000000]"
            style={{
              opacity: 1,
              bottom: 0,
              left: 0,
              display: 'flex',
              position: 'absolute',
              width: '100%',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.90) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.0) 100%)',
              // backgroundImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0)), linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))'
            }}
          >
            <span className="pt-[100%]"></span>

            <div className="flex justify-center	 p-10 h-[170px] w-full">
              <img
                src={image.toDataURL()}
                className="flex h-[80px] w-[80px] rounded-full"
              />
              <div className="flex flex-col ml-6">
                <h1 className="text-5xl text-white font-bold m-0">
                  <span className="text-blue-500">{"Daily.fin"}</span>
                </h1>
                <p className="text-gray-300 text-3xl m-0">{"Seu feed de notícias"}</p>
              </div>
            </div>


            <h1 className="text-6xl text-white px-[20px] font-black">Dividendos da semana: Petrobras, Copasa e Localiza estão entre as empresas que pagam</h1>
            <h3 className="text-4xl text-white px-[20px]"> {size} No total, cinco empresas distribuem dividendos e juros sobre capital próprio até a sexta-feira (23)</h3>
            <h4 className="text-3xl text-white px-[20px]">18/08/2024 06h00 • Atualizado 2 dias atrás</h4>
            <div className={`flex items-center p-10 bg-[#30363d] rounded-3xl ${size === 'story' ? 'mb-[200px]' : 'mb-[10px]'} mx-[10px]`} >
              <div className="flex items-center bg-[#FFFFFF] rounded-xl px-[20px]	 h-[100%]">
                <img
                  src={logo.toDataURL()}
                  className="flex items-center w-[200px]"
                />

              </div>
              <div className="flex flex-col ml-6">
                <h1 className="text-5xl text-white font-bold m-0">
                  <span className="text-blue-500">{"Infomoney"}</span>
                </h1>
                <p className="text-gray-300 text-3xl m-0">{"Finanças"}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default {
  GreetingsCard,
};
