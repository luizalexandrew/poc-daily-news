import Parser from "rss-parser";
import moment from "moment";
import { shuffle } from "lodash";

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

type Fonte = {
  nome: string;
  url?: string;
  imagem?: string;
};

type Noticia = {
  autor?: string;
  titulo: string;
  link: string;
  dataPublicacao: string;
  horaPublicacao: string;
  categorias?: string[];
  resumo?: string;
  conteudo?: string;
  fonte: Fonte;
};

const parser = new Parser<CustomFeed, CustomItem>({
  customFields: {
    feed: ["foo"],
    item: ["bar"],
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
      const noticia: Noticia = {
        autor: item.creator,
        titulo: item.title as string,
        link: item.link as string,
        dataPublicacao: moment(item.isoDate).format("DD/MM/YYYY"),
        horaPublicacao: moment(item.isoDate).format("HH:mm"),
        categorias: item.categories,
        resumo: item.contentSnippet,
        conteudo: item.content,
        fonte,
      };

      noticias.push(noticia);
    }
  }

  return noticias;
}
