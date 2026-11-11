import type { Endpoint } from "../../interfaces/endpoint.interface";

export const AVIATION_ENDPOINTS: Endpoint[] = [
  { id: "aviation-flights", group: "Flights", name: "Live flights", description: "Flights in the air right now.", path: "/aviation/flights", params: [] },
  { id: "aviation-airports", group: "Flights", name: "Airports", description: "Airports and their details.", path: "/aviation/airports", params: [] },
  { id: "aviation-airlines", group: "Flights", name: "Airlines", description: "Airlines and their details.", path: "/aviation/airlines", params: [] },
];
