import type { AccessKeyState } from "./access-key.interface";

export interface AccessKeyDialogProps {
  open: boolean;
  onClose: () => void;
  access: AccessKeyState;
}

export interface AccessKeyButtonProps {
  attached: boolean;
  onClick: () => void;
}
