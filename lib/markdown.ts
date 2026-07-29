export interface TocItem {
  id: string
  text: string
}

export function extractToc(markdown: string): TocItem[] {
  const headings = markdown.match(/^## .+$/gm) ?? []
  return headings.map((h) => {
    const text = h.replace(/^## /, '').trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return { id, text }
  })
}

export function renderMarkdown(markdown: string): string {
  let html = markdown

  // Code blocks (before inline code)
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/^```[^\n]*\n?/, '').replace(/```$/, '')
    return `<pre class="bg-text text-white rounded-2xl p-6 overflow-x-auto my-8 text-body-sm font-mono"><code>${escapeHtml(code)}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="font-mono bg-subtle text-body-sm px-2 py-0.5 rounded text-text">$1</code>')

  // H2
  html = html.replace(/^## (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `<h2 id="${id}" class="text-display-md font-display font-semibold text-text mt-10 mb-4 scroll-mt-28">${text}</h2>`
  })

  // H3
  html = html.replace(/^### (.+)$/gm, (_, text) =>
    `<h3 class="text-display-sm font-display font-semibold text-text mt-8 mb-3">${text}</h3>`,
  )

  // Blockquote
  html = html.replace(/^> (.+)$/gm, (_, text) =>
    `<blockquote class="border-l-4 border-accent pl-6 italic text-text-muted my-8">${text}</blockquote>`,
  )

  // Unordered list
  html = html.replace(/^(\- .+\n?)+/gm, (block) => {
    const items = block
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => `<li>${line.replace(/^- /, '')}</li>`)
      .join('')
    return `<ul class="list-disc text-body-lg text-text-muted space-y-2 mb-6 pl-6">${items}</ul>`
  })

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-text">$1</strong>')

  // Paragraphs — wrap non-tag lines
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed.startsWith('<')) return trimmed
      return `<p class="text-body-lg text-text-muted leading-relaxed mb-6">${trimmed.replace(/\n/g, ' ')}</p>`
    })
    .join('\n')

  return html
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
