import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function SvgIcon({
  size = 20,
  strokeWidth = 1.8,
  children,
  ...rest
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props: IconProps) => (
  <SvgIcon strokeWidth={2} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </SvgIcon>
);

export const CloseIcon = (props: IconProps) => (
  <SvgIcon strokeWidth={2.2} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </SvgIcon>
);

export const ChevronDownIcon = (props: IconProps) => (
  <SvgIcon strokeWidth={2.2} {...props}>
    <path d="m6 9 6 6 6-6" />
  </SvgIcon>
);

export const ChevronRightIcon = (props: IconProps) => (
  <SvgIcon strokeWidth={2} {...props}>
    <path d="m9 6 6 6-6 6" />
  </SvgIcon>
);

export const PlusIcon = (props: IconProps) => (
  <SvgIcon strokeWidth={2.2} {...props}>
    <path d="M12 5v14M5 12h14" />
  </SvgIcon>
);

export const CheckIcon = (props: IconProps) => (
  <SvgIcon strokeWidth={2.6} {...props}>
    <path d="m5 12 5 5 9-10" />
  </SvgIcon>
);

export const KeyIcon = (props: IconProps) => (
  <SvgIcon {...props}>
    <circle cx="8" cy="15" r="4" />
    <path d="m10.8 12.2 9.2-9.2M17 6l3 3M14 9l2 2" />
  </SvgIcon>
);
