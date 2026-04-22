---
name: changelog-update
description: Guides the Shipper agent in writing changelog entries. Use when adding a new entry to CHANGELOG.md after a successful build and review cycle.
---

# Changelog Writing Skill

## File Location

The changelog lives at `CHANGELOG.md` in the repo root. If the file does not already exist when you add an entry, create it. The Shipper adds one entry per PR, prepended to the top of the file.

## Format

Each entry follows this structure:

```markdown
## YYYY-MM-DD — Short title

**Added**
- <what was added>

**Changed**
- <what changed in existing behavior>

**Fixed**
- <what was corrected>

**Removed**
- <what was deleted or retired>
```

Only include categories that apply. If nothing was removed, omit the Removed section entirely.

## Writing Guidelines

**Short title** should match or closely echo the PR title. 4–7 words, describes the change not the ticket.

**Entries are written for humans reading the log later** — not for the developer who made the change. Assume the reader knows the codebase but not this PR.

Each bullet should be one sentence. Lead with the thing that changed, not the reason:

- ✅ `User sessions now expire after 30 minutes of inactivity`
- ✅ `Removed legacy v1 API endpoints`
- ❌ `In order to improve security, we have implemented session expiry...`

## What to Leave Out

- Implementation details — those are in the code and commits
- References to internal ticket numbers or agent run IDs — those belong in the PR, not the changelog
- Anything that didn't change observable behavior (refactors, test additions, dependency bumps unless they affect behavior)