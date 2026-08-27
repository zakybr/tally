---
name: tally-portal
description: Write research, notes and tasks straight into the Tally admin portal at tallynz.co/admin. Use when asked to file a research note, log a prospect, turn a document into tasks, add a Claude Design prompt, or organise what is already in the portal. Also use when handed raw research and asked to "put this in the portal".
---

# Writing to the Tally portal

The portal is a Supabase Postgres database behind `tallynz.co/admin`. You write to
it with the **Supabase MCP** (`execute_sql` for data, `apply_migration` for schema).
No extra credentials are needed — the MCP connection is the access path.

**Project ref:** `fwwnracpcseaiqzxqkjw`

Row level security means the portal's own web client can only read as a signed-in
member. The MCP connects with a privileged role, so it bypasses RLS. Treat that
seriously: never widen `allowed_emails` or `members` on your own initiative.

## Before writing anything

Read the current state first, so you extend the existing structure instead of
inventing a parallel one:

```sql
select collection, count(*) from public.notes group by collection order by 1;
select title, position from public.lists where archived = false order by position;
```

## Notes

| Column | Notes |
|---|---|
| `title` | Sentence case. Name the subject, not the document type. |
| `collection` | The workstream, e.g. `Marine beachhead`, `Premium seafood`. Groups the index. |
| `pinned` | `true` only for the anchor document of a collection. |
| `tags` | `text[]`, lowercase, hyphenated. |
| `plain_text` | The body. See the seeding rule below. |
| `ydoc` | Collaborative state. **Never write this by hand.** |

### The seeding rule — read this before updating any note

A note's body lives in `plain_text` until the first time somebody opens it. On
that first open the editor converts `plain_text` into the collaborative document
and stores it in `ydoc`. **From then on `ydoc` wins and edits to `plain_text` are
invisible in the portal.**

So:

- **Creating a note:** set `plain_text`, leave `ydoc` null. Works every time.
- **Updating a note nobody has opened** (`ydoc is null`): update `plain_text`.
- **Updating a note that has been opened:** do **not** silently rewrite
  `plain_text` — it will look like nothing happened. Either add a new dated note,
  or, only when the note is Claude-authored and has not been hand-edited, reset it:

```sql
update public.notes
set plain_text = $q$...new body...$q$, ydoc = null
where id = '...' ;
```

Resetting discards any human edits in that note. Ask before doing it.

### Body formatting

The seeder converts the plain text as follows, so write to this shape:

- A blank line separates blocks.
- A short line that is entirely UPPERCASE becomes a section heading (amber, in the
  brand's label face). Use these instead of markdown `##`.
- Everything else becomes a paragraph. Single newlines inside a block become line
  breaks.
- There is no markdown parsing. No `**bold**`, no `- ` bullets — they render as
  literal characters.

## Lists and tasks

`lists` are the columns of work; `tasks` belong to one list.

- `status`: `todo` | `doing` | `blocked` | `done`
- `priority`: `p1` (now) | `p2` (next) | `p3` (later)
- `position`: numeric, gaps of 1000, ascending.

Use `blocked` honestly — it drives the dashboard's "Needs a decision" section, so
marking things blocked that merely have not been started makes that view useless.

Turn a research document's open questions into **tasks**, not a buried checklist
in the note. A question that gates the whole approach is `p1`, and the thing that
cannot proceed until it clears is `blocked`.

## House style — this matters more than the schema

Tally's documents follow rules that also apply to anything you file:

- Public record only. Where a figure is not published, write "not published"
  rather than estimating it.
- Anything unverified gets its own clearly-labelled section, and the note says
  plainly not to put it in writing until checked. Do not bury a caveat mid-paragraph.
- Institutional, plain, unhyped. Short declarative sentences. No exclamation
  marks, no emoji, no marketing adjectives.
- Concede the real weakness before claiming the strength.

## Brand assets and prompts

`brand_assets` (category: `logo` | `colour` | `type` | `imagery` | `rule`) and
`prompts` (channel: `pitch-deck` | `linkedin` | `instagram` | `one-pager` |
`research` | `email` | `other`) back the Brand page.

Every prompt body must open with the brand block — the canonical copy is exported
as `BRAND_BLOCK` from `components/admin/BrandHub.tsx`. Do not paraphrase it.

## After writing

Report what you filed as counts, and name anything you deliberately did not
assert. Realtime pushes the change to any open browser, so there is nothing to
deploy for a data-only change.
