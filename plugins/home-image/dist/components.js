import { h } from "preact"

/**
 * HomeImage — a small local Quartz component.
 *
 * Renders a single <img> in place of the (hidden, via `condition: not-index`
 * on article-title) page title, but only on the index/home page. Every other
 * page renders nothing.
 *
 * Options (settable via `options:` on this plugin's entry in quartz.config.yaml):
 *   - src: path to the image, relative to the site root (default: "static/home-image.jpg")
 *   - alt: alt text for the image (default: "")
 */
export const HomeImage = (opts = {}) => {
  const src = opts.src ?? "static/home-image.jpg"
  const alt = opts.alt ?? ""

  const HomeImageComponent = ({ fileData, displayClass }) => {
    if (fileData.slug !== "index") {
      return null
    }

    const classes = ["home-image"]
    if (displayClass) classes.push(displayClass)

    return h("img", {
      class: classes.join(" "),
      src,
      alt,
    })
  }

  HomeImageComponent.displayName = "HomeImage"
  HomeImageComponent.css = `
.home-image {
  display: block;
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  margin: 0 0 1.5rem 0;
  /* Fade all four edges to transparent so the banner blends into the page
     background instead of ending in a hard rectangle. Two gradients (one
     per axis) combined with mask-composite so the fades apply together. */
  -webkit-mask-image:
    linear-gradient(to right, transparent, black 10%, black 90%, transparent),
    linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(to right, transparent, black 10%, black 90%, transparent),
    linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
  mask-composite: intersect;
}
`

  return HomeImageComponent
}
