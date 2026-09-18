# Sweet Crumbs Bakery — Part 2

## Project Overview
Sweet Crumbs Bakery is a responsive multi-page bakery website developed for WEDES020 Part 2. The website uses an external CSS stylesheet to provide a consistent desktop design and responsive layouts for tablet and mobile screens.

## Pages
- `index.HTML` — Home page
- `Services.HTML` — Services offered by the bakery
- `About_us.HTML` — About the bakery, mission, vision and values
- `Product.HTML` — Product catalogue and prices
- `enquiry.HTML` — Customer enquiry form

## Part 2 CSS Styling
The website uses `css/style.css` as one external stylesheet linked to every HTML page. The stylesheet includes:

- CSS reset and `box-sizing` rules for consistent browser rendering.
- Base font, colour, background, margin and padding styles.
- Typography using `font-family`, `font-size`, `font-weight`, `line-height` and `letter-spacing`.
- CSS Grid for the product/service card layouts.
- Flexbox for the navigation and form actions.
- Decorative styling using colours, borders, rounded corners and box shadows.
- Interactive `:hover`, `:focus` and `:active` pseudo-classes.

## Responsive Design
Three responsive ranges are provided:

- **Desktop:** default layout for larger screens, including three-column cards.
- **Tablet:** `@media (max-width: 64rem)` changes cards to two columns and simplifies the content grid.
- **Mobile:** `@media (max-width: 45rem)` changes cards to one column, stacks navigation links, adjusts typography and makes images/content fit the screen.

Relative units such as `rem`, `%` and `vw` are used for responsive sizing and spacing.

### Responsive Images
The website uses `srcset` and `sizes` on supplied bakery images. Smaller 480px and 800px image variants were created from the original project images so the browser can select a suitable image size for the device.

## Responsive Evidence
The `evidence` folder contains preview evidence for the responsive design:

- `desktop-preview.png`
- `tablet-preview.png`
- `mobile-preview.png`

These previews show the Home page at desktop, tablet and mobile widths.

## Changelog

### Part 2 — CSS and Responsive Design
- Added `css/style.css` as the shared external stylesheet and linked it to all five HTML pages.
- Added a CSS reset and shared root colour variables to provide consistent styling across the website.
- Added typography rules for headings, paragraphs, navigation and prices.
- Reworked the page layout using CSS Grid and Flexbox so content is structured consistently.
- Added visual styling including bakery-themed colours, borders, rounded corners, shadows and interactive buttons.
- Added `:hover`, `:focus` and `:active` states to navigation and interactive controls.
- Added tablet and mobile media queries and changed multi-column content to fewer columns/single-column layouts at smaller widths.
- Added responsive image handling with `srcset` and `sizes` and generated smaller image variants from the supplied project images.
- Removed invalid nested navigation markup from the Services page and About Us page.
- Corrected inconsistent internal page links so navigation uses the actual filenames in the project.
- Added viewport and character-set metadata to each page to support responsive and consistent rendering.
- Improved the enquiry form styling and focus states for easier use on smaller screens.

### Part 1 Feedback
The supplied Part 2 brief requires feedback-related changes to be recorded here. The lecturer's specific Part 1 feedback was not included as readable text in the supplied PDF/project files, so no lecturer comments have been invented. The structural corrections above document the concrete corrections made while preparing the Part 2 website.

## Testing Checklist
- [x] All five HTML pages use the same external stylesheet.
- [x] Navigation links point to existing project pages.
- [x] Product and service cards use responsive Grid layouts.
- [x] Navigation changes to a stacked mobile layout.
- [x] Typography and spacing use relative units where appropriate.
- [x] Images use `srcset` and `sizes`.
- [x] Form controls have focus styling.
- [x] Desktop, tablet and mobile preview evidence is included.

## References
- Mozilla Developer Network (MDN) Web Docs (2026). *CSS: Cascading Style Sheets*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed 17 September 2026).
- Mozilla Developer Network (MDN) Web Docs (2026). *Using media queries*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries (Accessed 17 September 2026).
- Mozilla Developer Network (MDN) Web Docs (2026). *Responsive images*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images (Accessed 17 September 2026).
- World Wide Web Consortium (W3C) (2026). *CSS Flexible Box Layout Module*. Available at: https://www.w3.org/TR/css-flexbox-1/ (Accessed 17 September 2026).
- World Wide Web Consortium (W3C) (2026). *CSS Grid Layout Module*. Available at: https://www.w3.org/TR/css-grid-1/ (Accessed 17 September 2026).

## Commit History
The repository history uses descriptive commits for the main Part 2 stages: styling/responsive assets, page updates, and documentation/evidence.
