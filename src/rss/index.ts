import { shuffle } from "lodash";
import moment from "moment";
import Parser from "rss-parser";
import { DEFAULT_CATEGORY, DEFAULT_FORMAT_DATE } from "./constants";
import { findImage } from "./findImage";
import { CustomItem, Noticia } from "./types";

const rssResoucers = [
  {
    nome: "InfoMoney",
    url: "https://www.infomoney.com.br/feed/",
    companyLogo:
      "https://www.infomoney.com.br/wp-content/uploads/2019/10/IM-Favicon.png?fit=100%2C100&#038;quality=70&#038;strip=all",
  },
  {
    nome: "Investing",
    url: "https://br.investing.com/rss/news.rss",
    companyLogo:
      "https://pbs.twimg.com/profile_images/1108337112351469570/vkooDg2x_400x400.png",
  },
  {
    nome: "Money Times",
    url: "https://www.moneytimes.com.br/feed/",
    companyLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosnSg9nnuZqd2tEvQI_98EOhEu7Jrd-xrjg&s",
  },
  {
    nome: "Banco Central do Brasil",
    url: "https://www.bcb.gov.br/api/feed/sitebcb/sitefeeds/noticias",
    companyLogo:
      "https://assets.infra.grancursosonline.com.br/projeto/bacen.png",
  },
  {
    nome: "Valor Econômico",
    url: "https://pox.globo.com/rss/valor",
    companyLogo:
      "https://s3.glbimg.com/v1/AUTH_1b264e8ce06649ae85acee5d38e32f34/images/novo_logo_valor_economico.png",
  },
  {
    nome: "Suno Notícias",
    url: "https://www.suno.com.br/noticias/feed/",
    companyLogo:
      "https://files.sunoresearch.com.br/n/uploads/2020/06/cropped-e171e4ac-favicon2-32x32.png",
  },
  {
    nome: "CNN Brasil",
    url: "https://www.cnnbrasil.com.br/economia/feed/",
    companyLogo:
      "https://logodownload.org/wp-content/uploads/2019/07/cnn-brasil-logo-0.png",
  },
  {
    nome: "G1 Economia",
    url: "https://pox.globo.com/rss/g1/economia",
    companyLogo:
      "https://pbs.twimg.com/media/E4puPTTUcAQSG9h?format=jpg&name=large",
  },
  {
    nome: "E-Investidor Estadão",
    url: "https://einvestidor.estadao.com.br/feed/",
    companyLogo:
      "https://einvestidor.estadao.com.br/wp-content/uploads/2020/04/card-compartilhamento-01-1_010420200357_large-1.png",
  },
  {
    nome: "Brazil Journal",
    url: "https://braziljournal.com/economia/feed/",
    companyLogo:
      "https://i.vimeocdn.com/video/1816305339-76f1988cf476669367474f0dffa8154a2479e70de74beba0bdea5296537d3cbc-d_640?f=webp",
  },
];

export async function getNews() {
  const allNews = await getLastNews();

  const shuffledNews = shuffle(allNews);

  const top10News = shuffledNews.slice(0, 2);

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
        companyLogo: feed?.image?.url || rss?.companyLogo,
        category: item?.categories?.length
          ? item.categories[0]
          : DEFAULT_CATEGORY,
        title: item.title as string,
        description: item.contentSnippet as string,
        date: dataFinal,
        link: item.link as string,
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
