import Parser from "rss-parser";
import moment from "moment";
import { shuffle } from "lodash";
import { CustomItem, Noticia, TypePost } from "./types";
import { DEFAULT_CATEGORY, DEFAULT_FORMAT_DATE } from "./constants";
import { findImage } from "./findImage";

const rssResoucers = [
  {
    nome: "InfoMoney",
    url: "https://www.infomoney.com.br/feed/",
  },
  {
    nome: "Investing",
    url: "https://br.investing.com/rss/news.rss",
  },
  {
    nome: "Money Times",
    url: "https://www.moneytimes.com.br/feed/",
  },
  {
    nome: "Banco Central do Brasil",
    url: "https://www.bcb.gov.br/api/feed/sitebcb/sitefeeds/noticias",
  },
  {
    nome: "Valor Econômico",
    url: "https://pox.globo.com/rss/valor",
  },
  {
    nome: "Suno Notícias",
    url: "https://www.suno.com.br/noticias/feed/",
  },
  {
    nome: "CNN Brasil",
    url: "https://www.cnnbrasil.com.br/economia/feed/",
  },
  {
    nome: "G1 Economia",
    url: "https://pox.globo.com/rss/g1/economia",
  },
  {
    nome: "E-Investidor Estadão",
    url: "https://einvestidor.estadao.com.br/feed/",
  },
  {
    nome: "Brazil Journal",
    url: "https://braziljournal.com/economia/feed/",
  },
];

export async function getNews() {
  const allNews = await getLastNews();

  const shuffledNews = shuffle(allNews);

  const top10News = shuffledNews.slice(0, 10);

  await injectPostPhoto(top10News);

  return top10News;
}

async function injectPostPhoto(news: Noticia[]) {
  for (const noticia of news) {
    const postPhoto = await getImageFromTitle(noticia.title);

    noticia.postPhoto = postPhoto;
  }
}

async function getLastNews() {
  const parser = getParser();
  const news: Noticia[] = [];

  for (const rss of rssResoucers) {
    const feed = await parser.parseURL(rss.url);

    if (!feed || !feed?.items?.length) continue;

    for (const item of feed.items.slice(0, 10)) {
      const dataPublicacao = moment(item.isoDate).format(DEFAULT_FORMAT_DATE);
      const dataAtualizacao = moment(item?.lastBuildDate).format(
        DEFAULT_FORMAT_DATE
      );

      const dataFinal = dataAtualizacao
        ? `${dataPublicacao} - Atualizado em ${dataAtualizacao}`
        : dataPublicacao;

      const noticia: Noticia = {
        company: rss.nome,
        companyLogo: feed?.image?.url,
        category: item?.categories?.length
          ? item.categories[0]
          : DEFAULT_CATEGORY,
        title: item.title as string,
        description: item.contentSnippet as string,
        date: dataFinal,
        link: item.link as string,
        type: TypePost.STORY,
        postPhoto: null,
      };

      news.push(noticia);
    }
  }

  return news;
}

async function getImageFromTitle(title: string) {
  try {
    const imageUrl = await findImage(title);

    return imageUrl;
  } catch (error) {
    return null;
  }
}

function getParser() {
  return new Parser<CustomItem>({
    customFields: {
      item: ["lastBuildDate"],
    },
  });
}
