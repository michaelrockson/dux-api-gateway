import { useMemo, useState } from "react";
import {
  getEndpointsByGroup,
  getGroup,
  searchEndpoints,
} from "../services/endpoint-catalog.service";
import type { GroupName } from "../types/endpoint.types";

export function useEndpointSearch(initialGroup: GroupName) {
  const [group, setGroup] = useState<GroupName>(initialGroup);
  const [query, setQuery] = useState("");

  const searching = query.trim().length > 0;
  const results = useMemo(
    () => (searching ? searchEndpoints(query) : getEndpointsByGroup(group)),
    [searching, query, group],
  );

  return {
    group,
    setGroup,
    groupInfo: getGroup(group),
    query,
    setQuery,
    searching,
    results,
  };
}
