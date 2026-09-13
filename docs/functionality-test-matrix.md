# Functionality Test Matrix

| Test | Expected result | Status |
|---|---|---|
| Click Show all photos | Photo Tour opens and background scroll is locked | Pass |
| Click first gallery image | Lightbox opens at image 1 | Pass |
| Click second gallery image | Lightbox opens at image 2 | Pass |
| Click next | Next image and counter appear | Pass |
| Click previous | Previous image and counter appear | Pass |
| Press Right Arrow | Next image appears | Pass |
| Press Left Arrow | Previous image appears | Pass |
| Press Escape | Active Lightbox or Photo Tour closes/returns correctly | Pass |
| Click Close | Active overlay closes or Lightbox returns to Photo Tour | Pass |
| Tab in modal | Focus remains inside active dialog | Pass |
| Shift+Tab in modal | Focus reverses inside active dialog | Pass |
| Open then close | Focus returns to the opening control | Pass |
| Open modal | Background page cannot be scrolled | Pass |
| Close modal | Background scrolling is restored | Pass |
| Rapid next/previous | Functional state updates remain deterministic | Pass |
| Save then Save again | Saved state toggles and returns to unsaved | Pass |
| Share | Accessible share panel opens and Copy link gives feedback | Pass |
| Search | Search panel opens and submits locally | Pass |
| Language/profile/host controls | Accessible local panels open and close | Pass |
| Guest selector | Guest count changes and updates reservation card | Pass |
| Reserve | Local confirmation feedback appears | Pass |
| Show more | Description expands and collapses | Pass |
| Show all amenities | Additional amenities reveal and hide | Pass |
| Message host | Message panel accepts text and shows success state | Pass |
| Hover controls | Existing hover transitions remain visible | Pass |
| Image failure | Failed image swaps to the local fallback without crashing the layout | Pass |

## Manual QA notes

The reference site itself was blocked by a Vercel Security Checkpoint in this environment. Browser QA was run against the local implementation. Browser automation had occasional stability timeouts while remote images were still settling, so direct user-event and DOM-event checks were both used for overlay transitions.
