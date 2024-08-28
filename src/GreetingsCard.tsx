/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */

// JSX import is required if you want to use JSX syntax
// Builder is a base class to create your own builders
// loadImage is a helper function to load images from url or path
import { JSX, Builder, loadImage } from "canvacord";

interface Props {
  category: string,
  company: string,
  companyLogo: string,
  title: string,
  description: string,
  date: string,
  link: string,
  type: "story" | "post" | "postlg",
  outputPathName: string,
}


export class GreetingsCard extends Builder<Props> {
  constructor(value: "story" | "post" | "postlg") {

    switch (value) {
      case 'story':
        super(1080, 1920);
        this.setType('story')
        break;
      case 'post':
        super(1080, 1080);
        this.setType('post')
        break;
      case 'postlg':
        super(1080, 608);
        this.setType('postlg')
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
    //   type: this.s
    // });
  }

  setType(value: "story" | "post" | "postlg") {
    this.options.set("type", value);
    return this;
  }

  setLink(value: string) {
    this.options.set("link", value);
    return this;
  }

  setDescription(value: string) {
    this.options.set("description", value);
    return this;
  }

  setDate(value: string) {
    this.options.set("date", value);
    return this;
  }

  setTitle(value: string) {
    this.options.set("title", value);
    return this;
  }

  setCategory(value: string) {
    this.options.set("category", value);
    return this;
  }

  setCompanyLogo(value: string) {
    this.options.set("companyLogo", value);
    return this;
  }

  setCompany(value: string) {
    this.options.set("company", value);
    return this;
  }

  setOutputPathName(value: string) {
    this.options.set("outputPathName", value);
    return this;
  }



  // this is where you have to define output ui
  async render() {
    const { company, companyLogo, category, title, description, date, link, type} = this.options.getOptions();

    // make sure to use the loadImage helper function to load images, otherwise you may get errors
    const image = await loadImage("https://files.metropoles.com/static/expediente/assets/images/general/portal-metropoles.jpg");
    const post = await loadImage(
      "https://www.infomoney.com.br/wp-content/uploads/2024/06/2024-06-06T200313Z_1_LYNXMPEK550T9_RTROPTP_4_META-WHATSAPP-BRAZIL.jpg"
    );

    const logo = await loadImage(
      companyLogo
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

            <div className="flex we	 p-10 h-[170px] w-full">
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

            <h1 className="text-6xl text-white px-[20px] font-black">{title}</h1>
            <h3 className="text-4xl text-white px-[20px]">{description}</h3>
            <h4 className="text-3xl text-white px-[20px]">{date}</h4>
            <div className={`flex items-center p-10 bg-[#30363d] rounded-3xl ${type === 'story' ? 'mb-[200px]' : 'mb-[10px]'} mx-[10px]`} >
              <div className="flex items-center bg-[#FFFFFF] rounded-xl px-[20px]	 h-[100%]">
                <img
                  src={logo.toDataURL()}
                  className="flex items-center w-[200px]"
                />
              </div>
              <div className="flex flex-col ml-6">
                <h1 className="text-5xl text-white font-bold m-0">
                  <span className="text-blue-500">{company}</span>
                </h1>
                <p className="text-gray-300 text-3xl m-0">{category}</p>
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
