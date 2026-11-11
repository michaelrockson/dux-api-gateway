import {
  DEFAULT_ENDPOINT_ID,
  ENDPOINTS,
  GROUPS,
} from "../constants/endpoints.constants";
import type {
  Endpoint,
  EndpointGroup,
  ParamState,
} from "../interfaces/endpoint.interface";
import type { GroupName } from "../types/endpoint.types";

export function getEndpoint(id: string): Endpoint {
  return ENDPOINTS.find((endpoint) => endpoint.id === id) ?? ENDPOINTS[0];
}

export function getDefaultEndpoint(): Endpoint {
  return getEndpoint(DEFAULT_ENDPOINT_ID);
}

export function getGroup(name: GroupName): EndpointGroup | undefined {
  return GROUPS.find((group) => group.name === name);
}

export function getEndpointsByGroup(group: GroupName): Endpoint[] {
  return ENDPOINTS.filter((endpoint) => endpoint.group === group);
}

export function searchEndpoints(query: string): Endpoint[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ENDPOINTS.filter((endpoint) =>
    [
      endpoint.name,
      endpoint.description,
      endpoint.group,
      ...endpoint.params.map((param) => param.label),
    ]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export function describeRequirements(endpoint: Endpoint): string {
  const required = endpoint.params
    .filter((param) => param.required)
    .map((param) => param.label.toLowerCase());
  return required.length
    ? `You’ll need: ${required.join(", ")}`
    : "Nothing to fill in";
}

export function initialParamState(endpoint: Endpoint): ParamState {
  const values: ParamState["values"] = {};
  const added: string[] = [];
  for (const param of endpoint.params) {
    if (param.example) values[param.id] = param.example;
    if (param.choices && param.defaultValue) {
      values[param.id] = param.defaultValue;
      added.push(param.id);
    }
  }
  return { values, added };
}
