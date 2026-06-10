# Impact-report scaffold (v0)

Assembles the skeleton of an honest annual / impact report from the live content
modules — boilerplate, programs, where-support-goes, status — and leaves an
explicit `[to be provided]` slot everywhere a real figure or account belongs.

**Deliberately no AI call.** An impact report is made of real numbers and real
events, which only the founder has; generating prose around figures that don't
exist yet is exactly the kind of invention the rest of the tooling guards
against. The site's placeholder stats are surfaced _as placeholders_ so they
can't slip into print as results.

```bash
npm run impact                 # scaffold for the current year
npm run impact -- --year 2026  # or a specific year
```

Output: `drafts/impact-report/<year>.md` (git-ignored). Fill the slots, run it
past the publishing checklist at the bottom of the file, and publish however
suits — a page, a PDF, or a supporter email (the supporter-update tool can help
announce it).
