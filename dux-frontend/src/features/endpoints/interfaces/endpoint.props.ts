import type { IconProps } from "@/components/icons";
import type { GroupName } from "../types/endpoint.types";
import type { Endpoint } from "./endpoint.interface";

export interface EndpointBarProps {
  endpoint: Endpoint;
  menuOpen: boolean;
  onToggleMenu: () => void;
  canRun: boolean;
  running: boolean;
  onRun: () => void;
}

export interface EndpointMenuProps {
  current: Endpoint;
  onPick: (endpoint: Endpoint) => void;
  onClose: () => void;
}

export interface GroupIconProps extends IconProps {
  group: GroupName;
}
