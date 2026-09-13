# Reference Analysis

## Inspection note

The supplied reference URL was not available for DOM or screenshot inspection in this environment because it returned a Vercel Security Checkpoint. The implementation therefore uses the assignment brief as the behavioral specification and preserves the gallery content in one local data module so visual details can be tuned without changing component logic.

## Page structure

The desktop listing experience is organized as:

1. A fixed-height Airbnb-style header with brand mark, centered search control, and account/action controls.
2. A constrained listing header containing the property title, location, rating/review summary, and share/save actions.
3. A five-image hero gallery: one large feature image on the left and four supporting images in a two-by-two grid on the right, with a Show all photos control.
4. A two-column listing body: property facts and descriptive content on the left, with a sticky reservation card on the right.
5. Detail sections for sleeping arrangements, amenities, description, host information, and location.
6. A Photo Tour overlay containing the full image collection in a scrollable grid.
7. A Lightbox dialog for a focused image with previous/next controls, a counter, close control, and keyboard navigation.
8. A quiet footer-style legal strip at the end of the listing.

## Visual system

These are implementation targets derived from the rendered-page brief and the familiar desktop Airbnb visual language:

- Page max width: 1,120px to 1,200px.
- Desktop horizontal padding: 24px, increasing to 40px on wide screens.
- Header height: approximately 80px.
- Main section rhythm: 28px to 48px between major groups.
- Hero gallery: 2:1 overall ratio, 4px internal gap, 16px outer radius.
- Surfaces: white page, near-white reservation card, charcoal primary text, muted gray secondary text.
- Borders: #dddddd at 1px.
- Primary accent: Airbnb coral-red for calls to action and active states.
- Typography: system-safe sans-serif with strong 26px to 32px listing heading, 15px body copy, and compact 12px metadata.
- Buttons: 44px minimum interactive height, rounded-full for pills and 10px to 12px for framed controls.
- Reservation card: 1px border, 14px radius, restrained shadow, sticky positioning below the header.
- Overlay: near-black background for the lightbox and white surface for the photo tour.

## Responsive behavior

The assignment is desktop-only. The layout remains usable from roughly 960px upward. At narrower desktop widths, the reservation card becomes a narrower fixed column and the listing content compresses; mobile-specific navigation and stacking are intentionally out of scope.

## Interaction inventory

- Header search, language, and profile controls are keyboard-focusable buttons.
- Share and save actions provide pressed-state feedback; save toggles between outline and filled heart.
- Each hero image opens the Lightbox at its own index.
- Show all photos opens the Photo Tour overlay.
- Photo Tour images open the Lightbox at the selected index.
- Photo Tour close control returns to the listing and restores the opener focus.
- Lightbox close control returns to the previous surface and restores focus.
- Lightbox previous and next controls wrap around the image list.
- Left and Right Arrow keys move between images while Lightbox is open.
- Escape closes the active overlay.
- Tab and Shift+Tab are trapped inside the active dialog.
- Overlay opening and closing use opacity/scale transitions; image changes use a short fade.
- Background page scrolling is disabled while an overlay is active.
- All icon-only controls have accessible labels and visible keyboard focus.

## Required assets

The page uses a local list of publicly accessible, static image URLs in `src/data/listing.ts`. The data model includes meaningful alt text and stable ids so the gallery, photo tour, and lightbox share one source of truth. Replacing those URLs with downloaded local assets later does not require component changes.

## Architecture direction

The app uses a server-rendered page shell with a focused client-side listing experience. Static listing data stays separate from UI components. A single overlay state owns the photo tour/lightbox relationship, and a small focus-trap utility keeps modal behavior predictable without introducing a large state library.
