import { useCallback, useEffect, useState } from "react";
import { EMPTY_ACCESS_KEY } from "../constants/access-key.constants";
import type {
  AccessKeyState,
  StoredAccessKey,
} from "../interfaces/access-key.interface";
import {
  loadAccessKey,
  removeAccessKey,
  saveAccessKey,
} from "../services/access-key.storage";
import type { AuthMode } from "../types/access-key.types";

export function useAccessKey(): AccessKeyState {
  const [state, setState] = useState<StoredAccessKey>(
    () => loadAccessKey() ?? EMPTY_ACCESS_KEY,
  );

  useEffect(() => {
    if (state.attached) saveAccessKey(state);
    else removeAccessKey();
  }, [state]);

  const setKey = useCallback(
    (key: string) => setState((s) => ({ ...s, key, attached: false })),
    [],
  );
  const setMode = useCallback(
    (mode: AuthMode) => setState((s) => ({ ...s, mode })),
    [],
  );
  const attach = useCallback(
    () => setState((s) => ({ ...s, attached: s.key.length > 0 })),
    [],
  );
  const clear = useCallback(() => setState(EMPTY_ACCESS_KEY), []);

  return { ...state, setKey, setMode, attach, clear };
}
