# Replace jQuery + Handlebars + Bootstrap with Vite + TypeScript + Vanilla CSS

**Date:** 2026-04-22
**Status:** Accepted

## Context

The prior implementation of Eat Safe CNY relied on jQuery for DOM manipulation and AJAX, Handlebars with CLI precompilation for templating, and Bootstrap/Bootswatch for styling. This required three runtime libraries and a separate build step for template compilation. Modern browser APIs — fetch, URLSearchParams, template literals, CSS custom properties, Flexbox, and Grid — now provide equivalent functionality natively without external dependencies.

## Decision

We will rebuild the application using Vite as the build tool, TypeScript for all application code, and vanilla CSS for styling. No UI framework or runtime library will be used.

## Consequences

The application ships zero runtime library code, reducing bundle size and eliminating dependency maintenance. The build pipeline simplifies to a single Vite step. Developers working on the app must be comfortable with vanilla DOM APIs and CSS rather than relying on jQuery or Bootstrap abstractions. The Bootswatch United theme is no longer available — the app uses custom CSS that must be maintained directly. Any future feature that would have been trivial with a framework (e.g., complex state management) will require more manual wiring.
