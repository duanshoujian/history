# Monorepo Project

This is a monorepo project containing Vue3, React frontend applications and a Node.js backend service.

## Project Structure

```
.
├── apps/
│   ├── vue-app/     # Vue3 application
│   ├── react-app/   # React application
│   └── server/      # Node.js backend service
├── packages/
│   └── shared/      # Shared utilities and types
└── pnpm-workspace.yaml
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development servers:

- Vue app:
```bash
pnpm dev:vue
```

- React app:
```bash
pnpm dev:react
```

- Backend server:
```bash
pnpm dev:server
```

Or start all services at once:
```bash
pnpm dev
```

## Available Scripts

- `pnpm dev` - Start all services in development mode
- `pnpm dev:vue` - Start Vue app
- `pnpm dev:react` - Start React app
- `pnpm dev:server` - Start backend server 