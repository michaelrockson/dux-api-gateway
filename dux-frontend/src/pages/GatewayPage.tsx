import { useCallback, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import {
  AccessKeyButton,
  AccessKeyDialog,
  authHeaders,
  useAccessKey,
} from "@/features/access-key";
import {
  EndpointBar,
  EndpointMenu,
  getDefaultEndpoint,
} from "@/features/endpoints";
import type { Endpoint, Param } from "@/features/endpoints";
import {
  AddOptionMenu,
  ParamsPanel,
  ResultCard,
  useLookup,
} from "@/features/lookup";

export function GatewayPage() {
  const access = useAccessKey();
  const lookup = useLookup(getDefaultEndpoint());
  const [menuOpen, setMenuOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);

  const { endpoint, selectEndpoint } = lookup;

  const pickEndpoint = useCallback(
    (next: Endpoint) => {
      selectEndpoint(next);
      setMenuOpen(false);
      setAddOpen(false);
    },
    [selectEndpoint],
  );

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeKey = useCallback(() => setKeyOpen(false), []);

  function addParam(param: Param) {
    lookup.addParam(param);
    if (lookup.available.length <= 1) setAddOpen(false);
  }

  function run() {
    if (!access.attached) {
      setKeyOpen(true);
      return;
    }
    setMenuOpen(false);
    setAddOpen(false);
    void lookup.run(authHeaders(access.key, access.mode));
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <AppHeader>
        <AccessKeyButton
          attached={access.attached}
          onClick={() => setKeyOpen(true)}
        />
      </AppHeader>

      <main className="mx-auto flex max-w-[880px] flex-col gap-7 px-6 pb-20 pt-12">
        <section className="flex flex-col items-center gap-6 text-center">
          <h1 className="m-0 font-display text-[clamp(44px,7vw,68px)] font-medium leading-none tracking-[-0.03em]">
            Dux API Gateway
          </h1>
          <p className="m-0 text-base text-muted-foreground">
            Get all your weather, news, exchange rates, public holidays, sports,
            flights and farm data together, so you never sign up to seven
            different services. Your key is free.
          </p>
        </section>

        <section aria-label="Request" className="flex flex-col gap-3">
          <EndpointBar
            endpoint={endpoint}
            menuOpen={menuOpen}
            onToggleMenu={() => {
              setMenuOpen((open) => !open);
              setAddOpen(false);
            }}
            canRun={lookup.ready}
            running={lookup.result.status === "loading"}
            onRun={run}
          />

          {menuOpen && (
            <EndpointMenu
              current={endpoint}
              onPick={pickEndpoint}
              onClose={closeMenu}
            />
          )}

          <ParamsPanel
            key={endpoint.id}
            endpoint={endpoint}
            active={lookup.active}
            values={lookup.values}
            onChange={lookup.setValue}
            onRemove={lookup.removeParam}
            canAdd={lookup.available.length > 0}
            addOpen={addOpen}
            onToggleAdd={() => {
              setAddOpen((open) => !open);
              setMenuOpen(false);
            }}
            missing={lookup.missing}
          />

          {addOpen && lookup.available.length > 0 && (
            <AddOptionMenu
              endpoint={endpoint}
              available={lookup.available}
              onAdd={addParam}
              onClose={() => setAddOpen(false)}
            />
          )}
        </section>

        <ResultCard
          key={endpoint.id}
          endpoint={endpoint}
          result={lookup.result}
          ready={lookup.ready}
        />
      </main>

      <AccessKeyDialog open={keyOpen} onClose={closeKey} access={access} />
    </div>
  );
}
