import type {
  Endpoint,
  ListView,
  Param,
} from "../../interfaces/endpoint.interface";
import type { UpstreamPayload } from "../../types/endpoint.types";
import { asArray } from "../../utils/format.utils";

const sources: Param = { id: "sources", label: "Sources", placeholder: "bbc-news", description: "Only from certain outlets" };
const language: Param = { id: "language", label: "Language", placeholder: "en", description: "Only stories in one language" };
const pageSize: Param = { id: "pageSize", label: "Per page", placeholder: "20", description: "Stories at once (up to 100)" };
const page: Param = { id: "page", label: "Page", placeholder: "2", description: "Which page of results" };

function articles(d: UpstreamPayload): ListView {
  const list = asArray<UpstreamPayload>(d?.articles);
  const total = Number(d?.totalResults ?? list.length);
  return {
    kind: "list",
    caption: `${total.toLocaleString("en")} ${total === 1 ? "story" : "stories"} found`,
    rows: list.map((a) => ({
      main: a?.title ?? "Untitled",
      sub: [a?.source?.name, a?.publishedAt?.slice(0, 10)].filter(Boolean).join(" · "),
    })),
  };
}

export const NEWS_ENDPOINTS: Endpoint[] = [
  {
    id: "news-topic",
    group: "News",
    name: "Search by topic",
    description: "Find stories about any subject.",
    path: "/news/topic",
    responseKey: "Related Article(s)",
    params: [
      { id: "q", label: "Topic", required: true, example: "technology", placeholder: "e.g. climate" },
      {
        id: "sortBy",
        label: "Sort by",
        description: "Order of results",
        defaultValue: "publishedAt",
        choices: [
          { value: "relevancy", label: "Best match" },
          { value: "popularity", label: "Popular" },
          { value: "publishedAt", label: "Newest" },
        ],
      },
      {
        id: "searchIn",
        label: "Look in",
        description: "Which part of the story to search",
        choices: [
          { value: "title", label: "Title" },
          { value: "description", label: "Summary" },
          { value: "content", label: "Text" },
        ],
      },
      language,
      sources,
      { id: "domains", label: "Websites", placeholder: "bbc.co.uk", description: "Only from certain websites" },
      { id: "from", label: "From date", placeholder: "YYYY-MM-DD", description: "Oldest story date" },
      { id: "to", label: "To date", placeholder: "YYYY-MM-DD", description: "Newest story date" },
      pageSize,
      page,
    ],
    toView: articles,
  },
  {
    id: "news-top",
    group: "News",
    name: "Top headlines",
    description: "The biggest stories in a country today.",
    path: "/news/top-headlines",
    responseKey: "Top Headlines",
    params: [
      { id: "country", label: "Country code", required: true, example: "us", placeholder: "gh" },
      { id: "q", label: "About", placeholder: "any topic", description: "Only headlines about a topic" },
      sources,
      language,
      pageSize,
      page,
    ],
    toView: articles,
  },
];
