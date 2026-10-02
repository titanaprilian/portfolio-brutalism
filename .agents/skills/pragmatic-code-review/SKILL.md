---
name: pragmatic-code-review
description: "Review the work another agent produced while implementing a ticket (a branch, PR, or diff) for code smells and design problems using core Pragmatic Programmer principles (DRY as knowledge duplication, orthogonality/coupling, broken windows, tracer bullets, reversibility, programming by coincidence, design by contract, YAGNI/good-enough software) plus this user's Deep Modules convention. Checks the implementation against the ticket's acceptance criteria, then produces a structured, non-interactive findings report with a verdict (approve / approve with follow-ups / request changes) that the implementing agent or a human can act on. When the verdict is an approval, commits the changes and closes the ticket automatically without asking for confirmation. Use whenever an agent submits a ticket for review, a PR is ready to check, or you are asked to review an implementation against a ticket or spec."
---

# Pragmatic Code Review

A non-interactive review workflow for **checking another agent's implementation
of a ticket**. You are the reviewer, not the implementer: read the ticket, read
the change, judge it against Pragmatic Programmer principles, and hand back a
report the implementer can act on without a follow-up conversation.

Rules of engagement:

- **Do not modify the code under review.** Findings go in the report; fixes are
  the implementer's job (or a later ticket's).
- **Do not interview the user or ask clarifying questions mid-review.** If
  something is ambiguous, record it as an assumption or an open question in the
  report and keep going.
- **Review the change, not the whole codebase.** Stay anchored to the ticket.
- **Approval commits changes and closes the ticket automatically** (Step 5) —
  no confirmation from the user is needed. These are the only actions beyond
  writing the report.

## Step 1 — Establish scope

1. **Find the ticket.** Read its description and acceptance criteria (e.g. the
   GitHub issue via `gh issue view <n>`). The ticket defines "done"; without it
   you can't tell a bug from a design choice or scope creep from a requirement.
2. **Find the change.** Identify the branch / PR / commit range and get the diff
   (e.g. `gh pr diff <n>` or `git diff <base>...<head>`). List the changed
   files and the modules they belong to.
3. **Read beyond the diff where needed.** For each changed file, read enough of
   the surrounding code and its callers/importers to judge whether the change
   fits — don't review hunks in isolation, and don't guess from file names.
4. If the ticket or diff genuinely can't be found, say so at the top of the
   report, state what you reviewed instead, and continue with the best
   available scope.

## Step 2 — Check the ticket first

Before hunting smells, answer these plainly:

- Does the change satisfy **every** acceptance criterion? Note any that are
  missing, partial, or only accidentally satisfied.
- Is there **scope creep** — unrelated refactors, extra features, speculative
  options the ticket never asked for?
- Are there **tests** proportionate to the change (following the repo's
  testing tiers), and do they assert behaviour rather than implementation?
- Do the repo's own checks pass (typecheck, lint, tests) if you can run them?

Unmet acceptance criteria and failing checks are automatically blocking.

## Step 3 — Diagnose against the principles

Classify every smell under **one** principle so the implementer knows what rule
is being violated, not just that something looks off.

| Principle                           | What to look for                                                                                                                                                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DRY (knowledge duplication)**     | Same _knowledge_ expressed in two places (not just copy-pasted text) — duplicated validation rules, duplicated business logic across a route and a component, schema drift between Drizzle models and TanStack types |
| **Orthogonality**                   | Changing one thing forces changes elsewhere; tight coupling; a UI change that requires touching the DB layer                                                                                                         |
| **Deep Modules / shallow modules**  | Wide interfaces, leaky abstractions, a "God" module/hook/component doing too much or exposing too much; new code that bypasses an existing module's public interface                                                 |
| **Broken windows**                  | Dead code, stale TODOs, inconsistent patterns, one hacky exception that invites more hacks — especially ones the change **introduced**                                                                               |
| **Programming by coincidence**      | Code that works but nobody can explain why; magic values; untested assumptions about ordering/timing                                                                                                                 |
| **Tracer bullets / reversibility**  | Big-bang changes with no incremental path; decisions that are expensive to undo (e.g. baked-in schema choices, hard framework lock-in)                                                                               |
| **YAGNI / good-enough software**    | Speculative abstraction, config for hypothetical futures, over-engineering relative to the ticket's actual need                                                                                                      |
| **Design by contract / assertions** | Missing input validation, no pre/post-condition checks, silent failure paths, swallowed errors                                                                                                                       |
| **Stack conventions**               | Elysia route handlers doing DB + validation + business logic inline instead of delegating to deep modules; Drizzle queries scattered instead of centralized; TanStack Router loaders bypassing the module boundary   |

### Calibrating what to flag

- **Blame the change, not the history.** A smell the diff _introduced or
  worsened_ is a finding. A smell that already existed in untouched code is a
  **follow-up** (see the report format), never a reason to block this ticket.
- **Prefer few, real findings over many nitpicks.** If you can't name the
  concrete cost (bug risk, change friction, onboarding cost), drop it.
- **Respect "good enough."** Don't demand abstraction the ticket doesn't need;
  flagging under-engineering is as valid as flagging over-engineering.
- **Verify before asserting.** Every finding must point at a specific file and
  line/symbol you actually read.

## Step 4 — Write the report

Deliver the report as the final reply (or as a PR review comment / file if the
invoking task says where it should go). Use this structure:

```
# Review: <ticket title / #number>

**Verdict:** Approve | Approve with follow-ups | Request changes
**Reviewed:** <branch/PR/commit range>, <N files changed>
**Assumptions / open questions:** <anything you couldn't resolve, or "none">

## Acceptance criteria
- [x] <criterion> — met (<where / how verified>)
- [ ] <criterion> — not met / partial (<why>)

## Blocking findings
### 1. <short title>
- **Where:** <file:line or symbol>
- **Principle violated:** <from the table>
- **Why it matters:** <concrete cost>
- **Suggested fix:** <specific enough for the implementer to act on>

## Non-blocking findings
<same format; things worth fixing but not worth holding the merge>

## Follow-ups (pre-existing or out of scope)
<smells noticed in untouched code — candidates for separate tickets, one line each>

## What's good
<one to three specific things done well, so they get repeated>
```

Verdict rules:

- **Request changes** — any unmet acceptance criterion, failing check, or
  blocking finding (correctness risk, contract/validation hole, a boundary
  violation that will be costly to undo).
- **Approve with follow-ups** — criteria met; only non-blocking findings and/or
  out-of-scope follow-ups remain.
- **Approve** — criteria met and nothing worth raising beyond "what's good."

Omit any empty section rather than writing "none," except the verdict,
acceptance criteria, and assumptions line, which are always present.

## Step 5 — Commit and close the ticket on approval

If the verdict is **Approve** or **Approve with follow-ups**, commit the approved
changes and close the ticket **immediately and without asking the user for
confirmation** — the approval is the go-ahead.

### 1. Commit the approved changes
If the changes for the ticket are uncommitted in the working tree:
1. Stage the files belonging to the ticket:
   ```bash
   git add <file1> <file2> ...
   ```
   Only stage files relevant to the reviewed ticket; do not stage scratch files or
   unrelated untracked artifacts.
2. Commit with a conventional commit message referencing the ticket number:
   ```bash
   git commit -m "<type>(<scope>): <summary> (#<n>)"
   ```
   (e.g., `fix(layout): prevent horizontal scroll on theme toggle hover (#1)`).

### 2. Close the ticket
Post the report and close the ticket:
```bash
gh issue comment <n> --body-file <report.md>
gh issue close <n> --reason completed
```

- Include the full report in the closing comment so the follow-ups and
  non-blocking findings stay attached to the ticket.
- If the verdict is **Request changes**, do **not** commit and do **not** close
  the ticket. Post the report as a comment and leave the ticket open for the
  implementer.
- Closing the ticket does not include merging the PR or deleting the branch;
  leave those to the normal workflow unless the invoking task says otherwise.
- If the close or commit command fails (permissions, wrong repo, already closed,
  git hook rejection), report the error at the end of your reply rather than
  retrying in a loop.
## Step 6 — Stop

The review ends with the report and, on approval, the closed ticket. Do not
start implementing fixes, do not open new tickets unless the invoking task
explicitly asks, and do not re-review until the implementer has pushed changes
in response.
