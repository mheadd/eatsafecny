---
name: pr-writing
description: 'Write pull request descriptions and summaries. Use when preparing a PR, drafting change summaries, or reviewing PR content quality.'
---

# PR Writing Skill

Guide for writing pull request descriptions in this project. The Shipper agent owns the PR structure — this skill governs the writing style and content quality within that structure.

## Voice and Tone

Write like a developer explaining a change to a teammate, not like a release note or a ticket comment. Plain conversational English. No jargon for its own sake, no unnecessary formality.

## The Summary

The "What was built" section is the most important part. Write a short paragraph — 3 to 5 sentences — that answers:

- What exists now that didn't before?
- Why does it matter?

That's it. Do not explain how it was built. Do not restate the spec. Do not summarize the commit history.

## What Good Looks Like

**Good:**
> The user authentication flow now supports OAuth 2.0 via Google and GitHub. Previously users could only sign in with email and password, which was a friction point for new signups. This adds the provider integrations, updates the session model to store provider metadata, and wires up the callback routes.

**Too thin:**
> Added OAuth support.

**Too much:**
> This PR implements OAuth 2.0 authentication by adding a new AuthProvider enum, updating the User model with a provider field and providerUserId field, creating OAuthCallbackController with Google and GitHub handler methods, registering routes in startup, and updating the login page component to show social login buttons...

## Notes Section

Use the Notes section for anything a reviewer needs to know before reading the code — not observations about the code itself. Examples of good notes:
- A dependency was added that requires a new environment variable
- A migration needs to run before deploying
- A follow-up ticket exists for something intentionally deferred

Leave it empty if there's nothing a reviewer needs to know upfront.

## What to Leave Out

- How the code works — that's what the code is for
- Implementation details that are obvious from the diff
- Filler phrases like "This PR aims to..." or "In this change we..."