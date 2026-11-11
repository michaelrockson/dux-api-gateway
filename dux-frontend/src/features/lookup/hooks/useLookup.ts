import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { initialParamState } from "@/features/endpoints";
import type { Endpoint, Param, ParamState } from "@/features/endpoints";
import { friendlyError, GatewayError } from "@/lib/http";
import type { LookupState } from "../interfaces/lookup.interface";
import { runLookup } from "../services/lookup.service";
import type { ResultState } from "../types/lookup.types";

const IDLE: ResultState = { status: "idle" };

export function useLookup(initialEndpoint: Endpoint): LookupState {
  const [endpoint, setEndpoint] = useState<Endpoint>(initialEndpoint);
  const [{ values, added }, setParams] = useState<ParamState>(() =>
    initialParamState(initialEndpoint),
  );
  const [result, setResult] = useState<ResultState>(IDLE);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const active = useMemo(
    () => endpoint.params.filter((p) => p.required || added.includes(p.id)),
    [endpoint, added],
  );
  const available = useMemo(
    () => endpoint.params.filter((p) => !active.includes(p)),
    [endpoint, active],
  );
  const missing = useMemo(
    () =>
      active
        .filter((p) => p.required && !values[p.id]?.trim())
        .map((p) => p.label.toLowerCase()),
    [active, values],
  );
  const ready = missing.length === 0;

  const selectEndpoint = useCallback((next: Endpoint) => {
    abortRef.current?.abort();
    setEndpoint(next);
    setParams(initialParamState(next));
    setResult(IDLE);
  }, []);

  const setValue = useCallback((id: string, value: string) => {
    setParams((s) => ({ ...s, values: { ...s.values, [id]: value } }));
  }, []);

  const addParam = useCallback((param: Param) => {
    setParams((s) => ({
      values:
        param.defaultValue && !s.values[param.id]
          ? { ...s.values, [param.id]: param.defaultValue }
          : s.values,
      added: s.added.includes(param.id) ? s.added : [...s.added, param.id],
    }));
  }, []);

  const removeParam = useCallback((id: string) => {
    setParams((s) => {
      const nextValues = { ...s.values };
      delete nextValues[id];
      return { values: nextValues, added: s.added.filter((x) => x !== id) };
    });
  }, []);

  const run = useCallback(
    async (headers: Record<string, string>) => {
      if (!ready) return;
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const snapshot = { ...values };
      setResult({ status: "loading" });
      try {
        const response = await runLookup({
          endpoint,
          values: snapshot,
          activeParamIds: active.map((p) => p.id),
          headers,
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        setResult({
          status: "success",
          data: response.data,
          raw: response.raw,
          httpStatus: response.status,
          values: snapshot,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        setResult({
          status: "error",
          message: friendlyError(error),
          httpStatus: error instanceof GatewayError ? error.status : undefined,
        });
      }
    },
    [ready, values, endpoint, active],
  );

  return {
    endpoint,
    values,
    active,
    available,
    missing,
    ready,
    result,
    selectEndpoint,
    setValue,
    addParam,
    removeParam,
    run,
  };
}
