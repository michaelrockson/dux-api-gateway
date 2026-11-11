import type {
  Endpoint,
  HeroView,
  ListView,
  Param,
  ParamValues,
} from "@/features/endpoints";
import type { Pagination } from "../hooks/usePagination";
import type { MessageTone, ResultState } from "../types/lookup.types";

export interface ParamsPanelProps {
  endpoint: Endpoint;
  active: Param[];
  values: ParamValues;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  canAdd: boolean;
  addOpen: boolean;
  onToggleAdd: () => void;
  missing: string[];
}

export interface ParamFieldProps {
  inputId: string;
  param: Param;
  value: string;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

export interface AddOptionMenuProps {
  endpoint: Endpoint;
  available: Param[];
  onAdd: (param: Param) => void;
  onClose: () => void;
}

export interface ResultCardProps {
  endpoint: Endpoint;
  result: ResultState;
  ready: boolean;
}

export interface ResultHeroProps {
  view: HeroView;
}

export interface ResultListProps {
  view: ListView;
}

export interface ResultRawProps {
  raw: unknown;
}

export interface ResultPagerProps {
  pagination: Pagination<unknown>;
  noun: string;
}

export interface ResultMessageProps {
  title: string;
  text: string;
  tone?: MessageTone;
}
