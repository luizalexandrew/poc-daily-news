import Parser from "rss-parser";
import moment from "moment";
import { shuffle } from "lodash";

type CustomFeed = { foo: string };
type CustomItem = { lastBuildDate: string };

enum TypePost {
  STORY = "story",
}

type Fonte = {
  nome: string;
  url?: string;
  imagem?: string;
};

type Noticia = {
  company: string;
  companyLogo: string;
  category: string;
  title: string;
  description: string;
  date: string;
  link: string;
  type: string;
};

const parser = new Parser<CustomFeed, CustomItem>({
  customFields: {
    feed: ["foo"],
    item: ["lastBuildDate"],
  },
});

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

export async function getNoticias() {
  const todasNoticias = await getFeeds();
  const noticiasEmbaralhadas = shuffle(todasNoticias);
  const noticiasSorteadas = noticiasEmbaralhadas.slice(0, 10);

  return noticiasSorteadas;
}

async function getFeeds() {
  const noticias: Noticia[] = [];

  for (const rss of rssResoucers) {
    const feed = await parser.parseURL(rss.url);

    if (!feed || !feed?.items?.length) continue;

    const fonte: Fonte = {
      nome: rss.nome,
      url: feed.link,
      imagem: feed?.image?.url,
    };

    for (const item of feed.items.slice(0, 10)) {
      const dataPublicacao = moment(item.isoDate).format("DD/MM/YYYY HH[h]mm");
      const dataAtualizacao = moment(item?.lastBuildDate).format(
        "DD/MM/YYYY HH[h]mm"
      );

      const dataFinal = dataAtualizacao
        ? `${dataPublicacao} - Atualizado em ${dataAtualizacao}`
        : dataPublicacao;

      const noticia: Noticia = {
        company: rss.nome,
        companyLogo: fonte.imagem as string,
        category: item?.categories?.length ? item.categories[0] : "Finanças",
        title: item.title as string,
        description: item.contentSnippet as string,
        date: dataFinal,
        link: item.link as string,
        type: TypePost.STORY,
      };

      noticias.push(noticia);
    }
  }

  return noticias;
}
