# Eat Safe CNY — Software Specification

## Purpose

Eat Safe CNY is a public-facing web application that allows users to search and browse restaurant health inspection results for Onondaga County in Central New York (CNY). It consumes open data from the NYS Department of Health and presents it in a user-friendly interface. The site is hosted at `eatsafecny.org`.

**Disclaimer**: The site is not affiliated with the NYS Department of Health or the Onondaga County Health Department.

## Data Source

- **API**: NYS Open Data (Socrata SODA API)
- **Endpoint**: `https://health.data.ny.gov/resource/tbxv-5tbd.json`
- **Dataset**: Onondaga County Restaurant Inspections
- **Dataset landing page**: https://health.data.ny.gov/Health/Onondaga-County-Restaurant-Inspections/tbxv-5tbd
- **County filter**: `ONONDAGA`

### Key Data Fields

| Field | Description |
|:-------|:-------------|
| `operation_name` | Name of the food service establishment |
| `nys_health_operation_id` | Unique identifier used for detail lookups |
| `facility_address` | Street address |
| `city` | City name |
| `food_service_facility_state` | State abbreviation |
| `zip_code` | ZIP code |
| `date` | Inspection date (ISO 8601) |
| `total_critical_violations` | Count of critical violations |
| `total_crit_not_corrected` | Count of critical violations not corrected |
| `violations` | Full text of violation details (semicolon-delimited) |

## Features

### 1. Search by Name

- A centered search bar on the home page accepts a full or partial establishment name.
- Submitting the form (via button click or Enter key) navigates to `/?search={name}`.
- Results are fetched from the API using a `contains()` filter on `operation_name`.

### 2. Latest Inspections

- Accessible via the "Latest" nav link (`/?latest=true`).
- Returns inspections ordered by `date DESC`, limited to 100 results.

### 3. Worst Offenders

- Accessible via the "Worst" nav link (`/?worst=true`).
- Returns inspections where `total_critical_violations > 0`, ordered by `total_critical_violations DESC`, limited to 100 results.

### 4. Inspection Detail View

- Clicking an establishment name in any list navigates to `/?id={nys_health_operation_id}`.
- Displays a detail table with:
  - Facility name
  - Facility address (linked to Google Maps)
  - Inspection date
  - Critical violation count
  - Critical violations not corrected count
  - Full violation text with formatting:
    - Semicolons replaced with line breaks
    - "Critical Violation" text bolded
    - "RED" text highlighted in red

### 5. Client-Side Pagination

- List views paginate results at 10 items per page.
- Pagination controls appear below results when more than one page exists.
- API fetches up to 100 results; pagination is handled client-side.

### 6. Loading Indicator

- A warning alert ("Fetching data...") appears during API requests and hides on completion.

## Pages

### `index.html` — Main Application Page

- Contains the search bar, results container, and all application logic.
- Single-page-style routing via URL query parameters (`search`, `latest`, `worst`, `id`).

### `about.html` — About Page

- Static page with project description, links to source code and community groups, and a disclaimer.

## Navigation

Fixed top navbar with links:

| Label | Target |
|:-------|:--------|
| Eat Safe CNY (brand) | `/` |
| Latest | `/?latest=true` |
| Worst | `/?worst=true` |
| About | `about.html` |
| Data | External link to the NYS Open Data dataset page |

## Current Technology Stack

| Layer | Technology | Notes |
|:-------|:-----------|:-------|
| CSS Framework | Bootstrap 5.3 (United theme from Bootswatch) | Loaded via CDN |
| DOM / AJAX | jQuery 3.7 | Used for DOM manipulation and API calls |
| Templating | Handlebars 4.7 | Templates precompiled via CLI; runtime loaded via CDN |
| Hosting | GitHub Pages | Custom domain via CNAME (`eatsafecny.org`) |
| Local dev server | PHP built-in server or Python SimpleHTTPServer | Via `serve.sh` |
| Build tool | npm scripts | `npm run compile` precompiles Handlebars templates |

### Handlebars Templates

Two templates are used:

1. **`list.handlebars`** — Renders a table of establishments with columns: Name (linked to detail view), Address, City, Date. Shows "No results found" alert when empty.
2. **`detail.handlebars`** — Renders a detail table for a single inspection with all violation information.

### Handlebars Helpers

| Helper | Purpose |
|:--------|:---------|
| `formatDate` | Formats ISO date to `M/D/YYYY` |
| `toTitleCase` | Converts uppercase strings to title case |
| `highlightCritical` | Formats violation text with line breaks, bold critical labels, red highlights |
| `makeAddressString` | Combines address fields into a single formatted string |
| `getBaseUrl` | Returns the current URL without query parameters |

## Styling

- Bootstrap United theme provides the primary visual styling.
- Custom CSS in `assets/css/style.css` handles:
  - Top margin offset for fixed navbar (65px)
  - Centered search bar (max-width 600px)
  - Loading alert and error state styling
  - Red text class for violation highlighting
  - Hide utility class

## Routing

All routing is client-side via URL query parameters parsed with `URLSearchParams`:

| Parameter | Action |
|:-----------|:--------|
| `id={value}` | Show inspection detail |
| `search={value}` | Search by establishment name |
| `latest=true` | Show most recent inspections |
| `worst=true` | Show worst offenders |
| *(none)* | Show home page with search bar |

Parameters are evaluated in priority order: `id` > `search` > `latest` > `worst`.

## API Query Patterns

All queries use this base structure:

```
GET https://health.data.ny.gov/resource/tbxv-5tbd.json
  ?county=ONONDAGA
  &$select=operation_name, nys_health_operation_id, facility_address, city, date
```

| View | Additional Parameters |
|:------|:----------------------|
| Search | `&$where=contains(operation_name, '{name}')` |
| Latest | `&$order=date DESC&$limit=100` |
| Worst | `&$where=total_critical_violations>0&$order=total_critical_violations DESC&$limit=100` |
| Detail | Full record: `?nys_health_operation_id={id}` (no `$select` filter) |

## Rebuild Guidance

When rebuilding this application, preserve these core requirements:

1. **Static site** — No server-side rendering required. The app runs entirely in the browser.
2. **SODA API consumption** — The Socrata Open Data API is the sole data source. No API key is required for basic access, but be aware of rate limiting.
3. **Query parameter routing** — Maintain URL-based routing so that links to specific views or search results are shareable.
4. **All four views** — Search, Latest, Worst, and Detail must all be implemented.
5. **Client-side pagination** — Paginate list results.
6. **Responsive design** — The site must work on mobile devices.
7. **Google Maps linking** — Detail view should link the facility address to Google Maps.
8. **Violation text formatting** — Critical violations must be visually distinguished in the detail view.
9. **Custom domain support** — Must support deployment to `eatsafecny.org`.
10. **Static hosting** — Must be deployable to a static hosting provider (e.g., GitHub Pages, Netlify, Vercel, Cloudflare Pages).

### Technology Considerations for Rebuild

- jQuery and Handlebars may be replaced with vanilla JavaScript, a lightweight framework, or a modern build tool depending on current best practices.
- The Bootswatch United theme should be preserved or a visually similar theme used.
- Precompiled templates can be replaced with template literals, a component system, or any modern templating approach.
- Consider adding error handling for failed API requests (currently absent).
- Consider accessibility improvements (ARIA labels, keyboard navigation, focus management).
