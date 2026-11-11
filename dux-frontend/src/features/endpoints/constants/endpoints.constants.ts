import type {
  Endpoint,
  EndpointGroup,
} from "../interfaces/endpoint.interface";
import { AGRO_ENDPOINTS } from "./catalog/agro.endpoints";
import { AVIATION_ENDPOINTS } from "./catalog/aviation.endpoints";
import { CURRENCY_ENDPOINTS } from "./catalog/currency.endpoints";
import { HOLIDAY_ENDPOINTS } from "./catalog/holiday.endpoints";
import { NEWS_ENDPOINTS } from "./catalog/news.endpoints";
import { SPORTS_ENDPOINTS } from "./catalog/sports.endpoints";
import { WEATHER_ENDPOINTS } from "./catalog/weather.endpoints";

export const ENDPOINTS: Endpoint[] = [
  ...WEATHER_ENDPOINTS,
  ...NEWS_ENDPOINTS,
  ...CURRENCY_ENDPOINTS,
  ...HOLIDAY_ENDPOINTS,
  ...SPORTS_ENDPOINTS,
  ...AVIATION_ENDPOINTS,
  ...AGRO_ENDPOINTS,
];

export const GROUPS: EndpointGroup[] = [
  { name: "Weather", description: "Conditions anywhere in the world." },
  { name: "News", description: "Headlines and stories from around the web." },
  { name: "Money", description: "Exchange rates and conversions." },
  { name: "Holidays", description: "Public holidays and long weekends by country." },
  { name: "Sports", description: "Teams, players, matches and tables." },
  { name: "Flights", description: "Flights, airports and airlines." },
  { name: "Farm", description: "Weather and crop data for your fields." },
];

export const DEFAULT_ENDPOINT_ID = "weather-current";
