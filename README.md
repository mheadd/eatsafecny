# Eat Safe CNY

Search and browse restaurant health inspection results for Onondaga County in Central New York. The app pulls open data from the NYS Department of Health via the [Socrata SODA API](https://health.data.ny.gov/Health/Onondaga-County-Restaurant-Inspections/tbxv-5tbd) and presents it in a mobile-friendly interface.

Live at [eatsafecny.org](https://eatsafecny.org).

> **Disclaimer:** This site is not affiliated with the NYS Department of Health or the Onondaga County Health Department.

## Features

- **Search** — Find establishments by full or partial name
- **Latest inspections** — Browse the most recent inspection results
- **Worst offenders** — See establishments with the most critical violations
- **Inspection detail** — View full violation details for any inspection, with address linked to Google Maps

## Tech Stack

- [Vite](https://vitejs.dev/) — Build tool and dev server
- TypeScript — Application logic
- Vanilla CSS — Mobile-first responsive design
- GitHub Pages — Hosting

No runtime frameworks or libraries. The app runs entirely in the browser using modern web APIs.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build with `npm run preview`.

## Agent Chain Demo

This project was built using the agent chain defined in [my-agent-team](https://github.com/mheadd/my-agent-team) — a four-agent workflow (Orchestrator → Builder → Reviewer → Shipper) that takes a software specification from planning to pull request. The chain is configured in this repo's [AGENTS.md](AGENTS.md) and `.github/agents/` directory.
