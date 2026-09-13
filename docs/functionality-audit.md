# Functionality Audit

Audit date: 2026-09-13

The rendered reference URL was unavailable for direct comparison because the environment received a Vercel Security Checkpoint. The audit below is based on the existing implementation, the supplied assignment requirements, and a local browser smoke test.

| Feature | Current state | Required behavior | Root cause / fix |
|---|---|---|---|
| Show all photos | Broken | Opens Photo Tour, locks page scroll, focuses dialog, restores trigger focus on close | The label was inside the fifth hero image button, whose handler always opened Lightbox. Use a separate tour action layered over the gallery and keep the opener ref. |
| Hero image | Works | Opens Lightbox at clicked image | Existing indexed handler retained. |
| Photo Tour | Partial | Shows all photos, scrolls, closes, traps focus | Existing overlay works; modal transition state and focus restoration needed tightening. |
| Photo Tour image | Partial | Opens Lightbox at the selected image | Existing handler changes overlay, but close loses the previous tour context. Track return surface and restore focus safely. |
| Lightbox next | Works but stale-closure-prone | Advances, updates counter, wraps consistently under rapid clicks | Use functional state updates rather than closing over the selected index. |
| Lightbox previous | Works but stale-closure-prone | Moves backward, updates counter, wraps consistently | Use functional state updates. |
| Keyboard Left/Right | Works but listener is recreated per index | Only controls active Lightbox and remains stable | Use functional state updates and a stable effect dependency set. |
| Escape | Works | Closes active modal and restores focus | Centralize close behavior for Lightbox versus Photo Tour. |
| Tab / Shift+Tab | Partial | Focus remains inside active dialog | Existing trap handles normal focusables; initial focus and return behavior need stable refs. |
| Body scroll lock | Works | Lock while either modal is open, restore after close | Existing hook retained; modal state cleanup verified. |
| Save | Works | Toggle saved/unsaved visible state | Existing state retained. |
| Share | Partial | Perform a visible share action appropriate to desktop | Clipboard-only behavior has no visible success/failure feedback. Add a small accessible share popover with copy action and close behavior. |
| Search pill | Dead | Interactive control should provide a meaningful action | Add a compact search dialog with close/Escape behavior. |
| Language button | Dead | Interactive control should provide a meaningful action | Add a small language popover. |
| Profile button | Dead | Interactive control should provide a meaningful action | Add a small account popover. |
| Airbnb your home | Dead | Interactive control should provide a meaningful action | Add a visible host popover/action surface. |
| Guest selector | Dead | Interactive control should provide a meaningful action | Add guest stepper popover with accessible controls. |
| Reserve | Dead | Interactive control should provide feedback | Add local reservation confirmation state without backend behavior. |
| Show more | Dead | Expand/collapse listing description | Add local expanded state. |
| Show all amenities | Dead | Reveal full amenities list or indicate all are visible | Add expanded state with remaining amenities if available and visible feedback. |
| Message host | Dead | Provide a usable local interaction | Add a compact message dialog with textarea and success state. |
| Image loading failures | Unhandled | Preserve layout and show fallback | Add `onError` fallback handling for Next Image surfaces. |

## Accessibility findings

- Dialog roles and `aria-modal` are present.
- Icon-only modal controls have labels.
- Focus trap exists, but replacing Photo Tour with Lightbox invalidates the original focus target.
- The fifth gallery control needs a distinct accessible Photo Tour action.
- Visible popovers/dialogs need labels, Escape handling, and focus restoration.

## Final behavior target

All visible buttons perform a local, deterministic action; gallery state uses one authoritative photo list and one selected index; modal transitions do not leak listeners or body scroll state; and focus returns to the control that opened the active surface.

## Resolution

Implemented and verified: a separate Photo Tour trigger, Photo Tour-to-Lightbox return behavior, functional previous/next and arrow-key navigation, Escape close, modal focus trapping, explicit opener focus restoration, body scroll cleanup, saved state, share feedback, search/language/profile/host panels, guest count updates, reservation feedback, description and amenities expansion, host messaging feedback, and image fallback handling. Remote images bypass Next optimization to avoid server-side timeout errors. `npm run lint` and `npm run build` both pass.
