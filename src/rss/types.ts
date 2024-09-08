export type CustomFeed = { foo: string };
export type CustomItem = {
  lastBuildDate: string;
};

export enum TypePost {
  STORY = "story",
}

export type Noticia = {
  company: string;
  companyLogo: string;
  category: string;
  title: string;
  description: string;
  date: string;
  link: string;
  type: string;
  postPhoto: string | null;
};
