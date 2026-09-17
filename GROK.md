# grok/ner-tamid-link

Grok-only branch. Do not merge to main until reviewed into site-upgrade.

## What this is
The live site already has a Ner Tamid section that links to https://nertamid.grok.me and expects `/art/ner-tamid-app-preview.jpg`. That file was missing, so the preview was blank.

This branch adds the hanging-lamp graphic at the path the homepage already uses. No homepage HTML rewrite, so ChatGPT's React snapshot will not fight hydration.

## Merge
Review, then merge into `site-upgrade` (not main). ChatGPT keeps gallery, nav, commissions.
