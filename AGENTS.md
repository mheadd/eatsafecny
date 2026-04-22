# AGENTS.md

This repository uses a four-agent chain to take a software specification from planning to pull request. This file defines how the chain works, what conventions apply across all agents, and how AI-assisted work should behave in this codebase.

---

## The Agent Chain

Work moves through four agents in sequence. The Orchestrator runs the other three as [subagents](https://code.visualstudio.com/docs/copilot/agents/subagents) — they execute in isolated context within the Orchestrator's session and are not directly selectable from the agent picker.

| Agent | Role |
|:---|:---|
| **Orchestrator** | Governs the chain. Reviews specs for ambiguity, declares scope, manages the build loop, confirms ADRs, and runs all other agents as subagents. |
| **Builder** | Implements the spec. Writes code in discrete chunks, commits regularly. *(subagent only)* |
| **Reviewer** | Evaluates builder output against defined principles. Returns a structured PASS or FAIL. Does not rewrite code. *(subagent only)* |
| **Shipper** | Prepares the PR, updates the changelog, and codifies ADRs when instructed. Does not merge. *(subagent only)* |

**Always start with the Orchestrator.** The builder, reviewer, and shipper are not user-invocable — they run only as subagents of the orchestrator.

---

## Universal Conventions

These apply to all agents and all code in this repository.

**Code quality**
- Prefer simple, well-known patterns over creative ones
- Lines of code are expensive — write less, mean more
- Code is written by AI but maintained by humans — optimize for readability
- Each function, module, or component does one thing
- Comments explain *why*, not *what*

**Security**
- No hardcoded secrets or credentials — ever
- Sanitize inputs, apply least-privilege access
- Flag vulnerabilities rather than silently working around them

**Commits**
- Small, focused, and committed regularly
- Messages are short and descriptive: `add auth middleware` not `updates`
- No WIP commits in final output

**Human checkpoints**
- The chain pauses for human input on spec ambiguity before work begins
- The chain escalates to a human after two consecutive reviewer failures
- ADRs are confirmed by a human before being written

---

## What AI Agents Do Not Do

- Merge pull requests
- Proceed past requirement-level ambiguity without human clarification
- Infer architectural decisions — these are confirmed explicitly
- Modify code during review
- Retry a failed build more than twice without escalating