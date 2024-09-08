/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */

// JSX import is required if you want to use JSX syntax
// Builder is a base class to create your own builders
// loadImage is a helper function to load images from url or path
import { JSX, Builder, loadImage } from "canvacord";
import {CardProps} from '../../types/Card'


export class Card extends Builder<CardProps> {
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

  setPostPhoto(value: string) {
    this.options.set("postPhoto", value);
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

  async render() {
    const { company, companyLogo, category, title, description, date, postPhoto, link, type} = this.options.getOptions();

    const image = await loadImage("https://files.metropoles.com/static/expediente/assets/images/general/portal-metropoles.jpg");
    const post = await loadImage(postPhoto);

    const logo = await loadImage(companyLogo);

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
              transform: 'translateX(-250px)'
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
              <div className="flex items-center bg-[#FFFFFF] rounded-xl px-[20px]	w-[200px]  h-[100px] flex justify-center items-center">
                <img
                  src={logo.toDataURL()}
                  className="max-w-[90%] h-[90%] m-5"
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
  Card,
};
