---
name: adr-writing
description: Guides the Shipper agent in writing Architecture Decision Records when instructed by the orchestrator. Use when a major architectural decision — infra change, wholesale approach change, or significant new dependency — needs to be documented.
---

# ADR Writing Skill

## File Location and Naming

ADRs live in `docs/adr/`. Name files using the date and a short, lowercase hyphenated title:

```
docs/adr/YYYY-MM-DD-short-title.md
```

Examples:
- `docs/adr/2026-03-31-use-postgres.md`
- `docs/adr/2026-03-31-switch-to-event-driven-arch.md`

Keep the title slug to 4–6 words. It should describe the decision, not the problem.

## Format

Each ADR follows this structure:

```markdown
# Title

**Date:** YYYY-MM-DD
**Status:** Accepted

## Context
<What situation prompted this decision? 2–4 sentences. Describe the problem or constraint, not the solution.>

## Decision
<What was decided? 1–3 sentences. State it plainly and directly.>

## Consequences
<What does this mean going forward? Cover both the benefits and any tradeoffs or obligations introduced.>
```

## Writing Guidelines

**Context** sets the scene — not the history of the project, just what made this decision necessary. Focus on the constraint or problem that forced a choice.

**Decision** is a statement of fact, not a justification. Write it as: *"We will use X"* or *"The service will be deployed as Y."* Save the reasoning for Context.

**Consequences** should be honest. Include tradeoffs, not just benefits. If a decision introduces operational overhead, a migration requirement, or a future constraint, say so.

## Length

An ADR should be readable in under two minutes. If it needs more than a short paragraph per section, it is probably too detailed. The goal is a durable record, not a design document.

## What to Leave Out

- Implementation details — those are in the code
- Options that were considered but rejected — this is a record of what was decided, not a decision log
- Filler phrases like "After careful consideration..." or "It was determined that..."