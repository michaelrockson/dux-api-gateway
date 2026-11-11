import { useEffect, useRef, useState } from "react";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { friendlyError } from "@/lib/http";
import { AUTH_MODES } from "../constants/access-key.constants";
import type { AccessKeyDialogProps } from "../interfaces/access-key.props";
import {
  headerPreview,
  requestGatewayKey,
} from "../services/access-key.service";
import type { CopyTarget } from "../types/access-key.types";
import { copyText, maskKey } from "../utils/access-key.utils";

export function AccessKeyDialog({
  open,
  onClose,
  access,
}: AccessKeyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);
  const [copied, setCopied] = useState<CopyTarget | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleClose() {
    setReveal(false);
    setCopied(null);
    setError(null);
    onClose();
  }

  async function request() {
    setLoading(true);
    setError(null);
    try {
      access.setKey(await requestGatewayKey());
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setLoading(false);
    }
  }

  async function copy(target: CopyTarget) {
    const text =
      target === "key" ? access.key : headerPreview(access.key, access.mode);
    setCopied((await copyText(text)) ? target : null);
  }

  function attach() {
    access.attach();
    handleClose();
  }

  const hasKey = access.key.length > 0;

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={(e) => e.target === dialogRef.current && handleClose()}
      aria-labelledby="key-title"
      className="m-auto w-[calc(100%-48px)] max-w-[500px] rounded-2xl border-0 bg-card p-0 text-foreground shadow-2xl backdrop:bg-overlay motion-safe:open:animate-pop"
    >
      <div className="flex items-center justify-between gap-3 pb-1 pl-6 pr-4 pt-5">
        <h2
          id="key-title"
          className="m-0 font-display text-[22px] font-bold tracking-tight"
        >
          Access key
        </h2>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="flex size-11 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-muted"
        >
          <CloseIcon size={18} />
        </button>
      </div>

      {!hasKey ? (
        <div className="flex flex-col gap-5 px-6 pb-6 pt-2">
          <p className="m-0 text-base leading-relaxed text-muted-foreground">
            You need a key before you can look anything up. It’s free and takes
            one click.
          </p>
          {error && (
            <p
              role="alert"
              className="m-0 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={request}
            disabled={loading}
            className="min-h-[52px] rounded-[10px] bg-primary text-base font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-70"
          >
            {loading ? "Requesting…" : "Request a key"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 px-6 pb-6 pt-2">
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-success-soft px-2.5 py-1.5 text-sm font-semibold text-success-strong">
            <CheckIcon size={14} />
            {access.attached ? "Your key is in use" : "Your key is ready"}
          </span>

          <p className="m-0 text-base leading-relaxed text-muted-foreground">
            {access.attached
              ? "You’re all set. We’re using this key automatically every time you look something up."
              : "Think of this key as a password for looking things up. Press “Use this key” and we’ll take care of the rest."}
          </p>

          <div className="flex flex-col gap-2">
            <h3 className="m-0 font-display text-base font-bold">Your key</h3>
            <div className="flex items-center gap-1.5 rounded-[10px] border border-border bg-muted py-1.5 pl-3.5 pr-1.5">
              <span
                className={`min-w-0 flex-1 font-mono text-[14.5px] ${reveal ? "break-all py-1.5" : "truncate"}`}
              >
                {reveal ? access.key : maskKey(access.key)}
              </span>
              <button
                type="button"
                onClick={() => setReveal((r) => !r)}
                aria-pressed={reveal}
                className="min-h-10 flex-none rounded-lg px-3 text-sm font-semibold text-primary hover:bg-card"
              >
                {reveal ? "Hide" : "Show"}
              </button>
              <button
                type="button"
                onClick={() => copy("key")}
                className="min-h-10 flex-none rounded-lg border border-border bg-card px-3.5 text-sm font-medium hover:bg-muted"
              >
                {copied === "key" ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="m-0 text-[13.5px] text-info">
              Keep a copy somewhere safe and don’t share it. We can’t show it
              to you again later.
            </p>
          </div>

          <button
            type="button"
            onClick={attach}
            className="min-h-[52px] rounded-[10px] bg-primary text-base font-semibold text-primary-foreground hover:brightness-110"
          >
            {access.attached ? "Done" : "Use this key"}
          </button>

          <details className="group rounded-xl border border-border">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3.5 text-sm font-medium text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
              <span>Settings</span>
              <span
                aria-hidden="true"
                className="text-xs transition-transform group-open:rotate-180"
              >
                ▼
              </span>
            </summary>
            <div className="flex flex-col gap-2 px-3.5 pb-3.5">
            <h3 id="send-title" className="m-0 text-sm font-semibold">
              How the key is sent
            </h3>
            <div
              role="radiogroup"
              aria-labelledby="send-title"
              className="flex flex-col gap-2"
            >
              {AUTH_MODES.map((option) => {
                const on = access.mode === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => {
                      access.setMode(option.id);
                      setCopied(null);
                    }}
                    className={`flex items-center gap-3 rounded-xl border-[1.5px] p-3.5 text-left text-foreground ${on ? "border-primary bg-accent/30" : "border-border bg-card hover:bg-muted"}`}
                  >
                    <span
                      className={`flex size-5 flex-none items-center justify-center rounded-full border-2 ${on ? "border-primary" : "border-border-strong"}`}
                    >
                      {on && <span className="size-2.5 rounded-full bg-primary" />}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[15px] font-semibold">
                        {option.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => copy("header")}
              className="min-h-11 self-start rounded-[10px] border border-border bg-card px-3.5 text-sm font-medium hover:bg-muted"
            >
              {copied === "header" ? "Copied" : "Copy as request header"}
            </button>
            </div>
          </details>

          <button
            type="button"
            onClick={() => {
              access.clear();
              setReveal(false);
            }}
            className="self-center text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Remove this key and get a new one
          </button>
        </div>
      )}
    </dialog>
  );
}
