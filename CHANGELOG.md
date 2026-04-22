# Changelog

## 2026-04-22 — Rebuild as modern static application

**Added**
- Search view for looking up restaurant inspection results by facility name
- Latest inspections view showing the most recent inspection results
- Worst offenders view ranking facilities by number of critical violations
- Inspection detail view displaying full violation history for a facility
- Mobile-first responsive layout with card-based table fallback on small screens
- Collapsible navigation menu on mobile
- Client-side pagination for result lists
- Static about page with project disclaimer

**Changed**
- Replaced jQuery, Handlebars, and Bootstrap/Bootswatch with Vite, TypeScript, and vanilla CSS
- Routing now uses URL query parameters on a single page instead of separate HTML pages

**Removed**
- jQuery, Handlebars, and Bootstrap runtime dependencies
- Handlebars template precompilation build step
