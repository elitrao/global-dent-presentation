# Design QA

- Source visual truth: `https://globaldent-presentation-bice.vercel.app/` and the supplied reference screenshots.
- Comparison image: `work/qa/reference-vs-implementation.jpg`.
- Desktop implementation evidence: `work/qa/desktop-contact-sheet.jpg`, 1366 x 768.
- Mobile implementation evidence: `work/qa/mobile-contact-sheet.jpg`, 390 x 844.
- PDF evidence: `work/pdf/pdf-contact-sheet.jpg`, 960 x 540 points per page.
- State: all nine slides, dark theme, panels closed; inventory detail panel separately tested open on mobile.

## Full-view comparison

The implementation reproduces the reference's restrained near-black canvas, warm beige accent, thin light typography, generous negative space, flat dark cards, subtle borders, 10 px radii and quiet navigation. Manrope intentionally replaces the reference's Geist because it was explicitly requested. Persistent collaboration branding and horizontal navigation remain because they are presentation requirements.

## Focused comparison

The context/metrics and architecture/card compositions were compared side by side in `work/qa/reference-vs-implementation.jpg`. Typography hierarchy, card density, padding, neutral contrast and accent usage match the reference system. The deck contains no raster illustrations, gradients, decorative emoji or recreated robot overlay.

## Required fidelity surfaces

- Fonts and typography: local variable Manrope loads correctly in Cyrillic; weights 350-600, negative display tracking and line heights render consistently.
- Spacing and layout rhythm: all target viewports fit inside `100dvh` with no horizontal or vertical overflow and no clipped descendants.
- Colors and tokens: `#191919`, `#212121`, `#F5F5F5`, translucent secondary text, `#D4B896`, 8% borders and 10 px radii are consistent.
- Image quality and assets: no image assets are required by the selected style; previous 3D artwork is no longer rendered.
- Copy and content: all nine planned topics, amounts, durations, caveats and panel details remain present.

## Comparison history

### Pass 1

- P1: PDF pages could capture the previous slide during initial rendering.
- P2: focused headings showed an unwanted outline in PDF export.
- Fixes: waited for the target section before printing and disabled focus outlines only in export mode.

### Pass 2

- Re-rendered all nine PDF pages and inspected the combined contact sheet plus full-size pages 1 and 8.
- No actionable P0, P1 or P2 findings remain.

## Interaction and accessibility checks

- Arrow buttons, ArrowLeft/ArrowRight and browser back history update slide hashes correctly.
- Escape closes the detail panel; focus starts on the close button and the background is inert.
- Mobile detail panel resolves to the full viewport width with `x = 0` after transition.
- Console checked with no warnings or errors.
- Reduced-motion styling and visible keyboard focus remain available.

## Follow-up polish

No blocking follow-up items. Minor copy-density adjustments can be made later from user annotations without changing the design system.

final result: passed
