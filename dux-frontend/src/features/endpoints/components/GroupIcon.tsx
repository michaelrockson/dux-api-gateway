import type { ReactElement } from "react";
import { SvgIcon } from "@/components/icons";
import type { GroupIconProps } from "../interfaces/endpoint.props";
import type { GroupName } from "../types/endpoint.types";

const GROUP_PATHS: Record<GroupName, ReactElement> = {
  Weather: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  News: (
    <>
      <rect x="3" y="4" width="15" height="16" rx="2" />
      <path d="M18 8h2a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2M7 8h7M7 12h7M7 16h4" />
    </>
  ),
  Money: <path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5" />,
  Holidays: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  Sports: (
    <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8" />
  ),
  Flights: (
    <path d="M2 20h20M5 15.5 3 11l2-.6 3 2.4 4-1.4L8.5 4.2l2.3-.7 6.8 6.1 3-1a1.6 1.6 0 0 1 1 3L6.5 16.5z" />
  ),
  Farm: (
    <path d="M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 14c0-3 2.5-6 7-6 0 3.5-2.5 6-7 6z" />
  ),
};

export function GroupIcon({ group, ...props }: GroupIconProps) {
  return <SvgIcon {...props}>{GROUP_PATHS[group]}</SvgIcon>;
}
