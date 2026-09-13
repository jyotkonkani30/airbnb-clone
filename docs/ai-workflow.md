# AI Workflow

This record describes the actual development sequence for the recreation.

## Prompt 01 - Project analysis
Goal: Translate the assignment into a constrained desktop listing experience, identify required views, and preserve originality.

## Prompt 02 - Reference analysis
Goal: Inspect the supplied rendered URL and document structure, visuals, assets, interactions, and accessibility. The browser was stopped by a Vercel Security Checkpoint, so the document records the verified limitation and the brief-derived implementation contract.

## Prompt 03 - Component architecture
Goal: Separate static listing data, page presentation, gallery state, modal behavior, focus trapping, and scroll locking.

## Prompt 04 - Listing page
Goal: Build the header, title/details region, hero gallery, listing sections, sticky reservation card, and footer.

## Prompt 05 - Gallery
Goal: Build a scrollable photo tour from the same photo data and make every image a useful entry point to the viewer.

## Prompt 06 - Lightbox
Goal: Build the full-screen viewer with counter, close, previous/next controls, and wraparound navigation.

## Prompt 07 - Accessibility
Goal: Add semantic buttons, dialog semantics, keyboard arrows, Escape, focus trapping, focus restoration, alt text, and visible focus styles.

## Prompt 08 - Visual QA
Goal: Centralize visual tokens, preserve stable gallery geometry, add restrained hover and overlay transitions, and validate lint/build output.

## Prompt 09 - Final polish
Goal: Confirm the project runs from the workspace root, keep documentation current, and avoid unrelated backend scope.

## Prompt 10 - Functionality audit and QA
Goal: Audit every existing interactive control, document current behavior versus the assignment contract, repair gallery/modal state, keyboard navigation, focus restoration, body scroll handling, and dead visible controls without redesigning the page. Run real browser flows plus lint and build, then record the test matrix and root causes.
