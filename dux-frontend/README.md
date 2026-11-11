# Dux Gateway — frontend

React 19 + TypeScript + Vite + Tailwind v4 demo UI for the Dux API gateway:
choose an endpoint, fill in the details, press Go.

## Run it

```bash
yarn install
yarn dev        # http://localhost:5173
yarn build      # type-check + production bundle in dist/
yarn lint
```

Start the gateway (`dux-backend`) first. The gateway sends no CORS headers, so
in dev the browser calls `/v1` on the Vite server and Vite proxies it to the
gateway.

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `/v1` | Where the browser sends requests. Use a full URL only if that origin allows CORS. |
| `GATEWAY_PROXY_TARGET` | `http://localhost:3000` | Dev only: where Vite forwards `/v1`. |

Copy `.env.example` to `.env.local` to change them.

## Structure

```
src/
├── App.tsx, main.tsx, index.css      # entry, theme tokens (@theme)
├── config/env.ts                     # API_BASE_URL
├── lib/http/                         # gatewayGet, GatewayError, friendlyError
├── components/
│   ├── icons/                        # shared stroke icons
│   └── layout/AppHeader.tsx
├── pages/GatewayPage.tsx             # composes the features
└── features/
    ├── access-key/                   # request, store and attach the API key
    ├── endpoints/                    # endpoint catalogue, chooser bar and menu
    └── lookup/                       # fields, the request, the result card
```

Each feature follows the same layout and is imported only through its
`index.ts`:

```
features/<name>/
├── components/     # React components
├── hooks/          # stateful logic (useAccessKey, useEndpointSearch, useLookup)
├── services/       # gateway calls, storage, pure domain logic
├── interfaces/     # object contracts (*.interface.ts) and component props (*.props.ts)
├── types/          # unions and aliases (*.types.ts)
├── constants/      # static data (where needed)
├── utils/          # small pure helpers (where needed)
└── index.ts        # the feature's public exports
```

Dependencies point one way: `lookup` → `endpoints`, and the page wires in
`access-key`. Features never import each other's internals.

## How it maps to the gateway

| UI | Gateway |
|---|---|
| Endpoint menu | `ENDPOINTS` — `path` is relative to `VITE_API_BASE_URL` |
| Fields under the bar | `params` — `id` is the query-string name |
| "Add option" | params without `required` |
| Readable view | `toView(details[responseKey], values)` |
| Raw data | the full JSON body |
| Request a key | `GET /v1/auth/gateway-key` → `details.ApiKeyResponse.apiKey` |
| Bearer token / API key header | `Authorization: Bearer gw_…` or `x-api-key: gw_…` |

## Adding an endpoint

Add one object to the matching file in
`src/features/endpoints/constants/catalog/`. It sets the menu name and
description, the `params` (add `choices` for a segmented control), the
`responseKey` under `details`, and a `toView` that returns a `hero` or `list`
view. Leave `toView` out and the card shows Raw data only.

## Known gaps

- **Flights and Farm** have no params or readable view yet; they show Raw data.
- **Weather** takes latitude and longitude, not a city name.
- **Key storage** is `sessionStorage` (this tab only) — see
  `features/access-key/services/access-key.storage.ts`.
