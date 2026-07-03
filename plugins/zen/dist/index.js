import { visit } from "unist-util-visit"

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/**
 * Zen — a small local transformer plugin, modeled on jzhao.xyz's "Poetry"
 * transformer. Turns a fenced code block tagged ```zen``` into a raw HTML
 * <pre class="zen-highlight"> block instead of a syntax-highlighted code
 * block, so it renders in the Yuji Syuku font (see quartz/styles/custom.scss)
 * with line breaks preserved.
 *
 * Usage in a note:
 *
 *   ```zen
 *   Sit. Breathe. Begin again.
 *   ```
 */
export default function Zen() {
  return {
    name: "Zen",
    markdownPlugins() {
      return [
        () => (tree, _file) => {
          visit(tree, "code", (node) => {
            if (node.lang === "zen") {
              node.type = "html"
              node.value = `<pre class="zen-highlight">${escapeHtml(node.value)}</pre>`
            }
          })
        },
      ]
    },
  }
}
