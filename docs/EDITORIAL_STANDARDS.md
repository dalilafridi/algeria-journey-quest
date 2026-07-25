# DZ Odyssey — Editorial Standards

## Punctuation

### No em dashes in visitor-facing content

The em dash character (`—`, U+2014) must not appear in visitor-facing prose,
including English, French, and Arabic translations.

Rewrite sentences naturally using one of:

- a period
- a comma
- a colon
- a semicolon
- parentheses
- a conjunction such as *and*, *but*, *because*, or *while*

Never substitute a spaced hyphen (` - `). Choose the construction that reads
most naturally and preserves the intended meaning.

**Legitimate exceptions** (do not rewrite):

- Direct quotations reproduced verbatim from a historical source.
- Source titles and bibliographic citations
  (see `src/data/provenance/sources.ts`).
- Date ranges written as `1954–1962` use the en dash (`–`, U+2013), not the
  em dash. En dashes are permitted.

### Voice

- Natural, direct, elegant, warm, historically informed.
- Avoid AI-writing tells: dramatic sentence fragments, repeated
  *not only… but also*, formulas such as *It is more than X. It is Y.* or
  *This was not merely X. It was Y.*, and overused words like *remarkable*,
  *timeless*, *testament*, and *tapestry*.

## Enforcement

- `scripts/check-em-dashes.mjs` runs as part of `bun run build` and fails
  the build when an em dash appears in visitor-facing content.
- Studio/curator internal admin (`src/routes/curator/*`,
  `src/components/curator-portal/*`, `src/lib/curator-portal/*`) and the
  source registry (`src/data/provenance/sources.ts`) are excluded.
- Code comments (`//`, `/* */`, `*`) are excluded.
