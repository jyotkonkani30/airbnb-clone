# Photo Tour Audit

Audit target: `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1004`

The live reference URL was unavailable for direct rendered inspection because Vercel returned a Security Checkpoint. The local implementation was tested against the assignment contract and the exact query-state requirement.

| Feature | Current behavior | Required behavior | Status |
|---|---|---|---|
| Open URL state | Query params are read on initial load | URL opens Photo Tour directly | Fixed |
| `modalItem=1004` | Stable item id maps to the fifth photo and scroll target | Initial gallery position reflects requested item | Fixed |
| Photo Tour scroll | Modal owns vertical overflow | Gallery scrolls while background stays locked | Fixed |
| Close | Removes modal query state and restores focus | Listing returns and URL is clean | Fixed |
| Browser Back | `popstate` synchronizes modal state | Back closes or returns to the prior modal state | Fixed |
| Photo click | Uses shared photo data and item ids | Opens exact Lightbox image | Fixed |
| Lightbox return | Returns to Photo Tour item and URL state | Tour remains the underlying modal | Fixed |
| Next / Previous | Functional state updates with wraparound | Correct image and counter | Verified |
| Arrow keys | One cleaned-up document listener while modal is active | Left/right navigation only in Lightbox | Verified |
| Escape | Closes active modal | Close and restore scroll/focus | Verified |
| Focus trap | Tab wraps between modal controls | Focus stays inside modal | Verified |
| Image fallback | Failed remote image swaps to local SVG | Avoid layout crash | Verified |

## Browser QA results

- Direct URL `/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1004`: Photo Tour opened, body overflow became `hidden`, and item `1004` was centered in the modal viewport.
- Closing the direct URL state removed both query parameters and restored body scrolling.
- Opening from the listing pushed `modal=PHOTO_TOUR_SCROLLABLE&modalItem=1000`; browser Back closed it and Forward reopened it.
- Clicking item `1004` pushed `modal=LIGHTBOX&modalItem=1004`; Next advanced to item `1005` and Escape returned to the Tour at item `1005`.
- Browser Back from Lightbox returned to the Tour, and Forward reopened the same Lightbox item.
- All five hero image entry points opened counters `1 / 8` through `5 / 8`.

## Known limitation

The reference page and exact reference assets could not be inspected because the supplied Vercel URL returned a browser security checkpoint. The implementation therefore does not claim pixel-perfect parity with inaccessible reference pixels; it remains an original implementation of the specified state and behavior.
