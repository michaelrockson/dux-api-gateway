import type { Endpoint } from "../../interfaces/endpoint.interface";

export const AGRO_ENDPOINTS: Endpoint[] = [
  { id: "agro-polygons", group: "Farm", name: "My fields", description: "The fields you’ve mapped.", path: "/argo/polygons", params: [] },
  { id: "agro-weather", group: "Farm", name: "Weather on a field", description: "Current weather over one of your fields.", path: "/argo/polygons/weather", params: [] },
];
