import type { ParamValues } from "@/features/endpoints";

export type ResultState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string; httpStatus?: number }
  | {
      status: "success";
      data: unknown;
      raw: unknown;
      httpStatus: number;
      values: ParamValues;
    };


export type MessageTone = "neutral" | "error";
