# Images that need upscaling

Upscale each file with your online tool, then hand the folder back **keeping the
same filenames and the same page subfolders**. Each file belongs to exactly one
page - do not move a file between subfolders.

Source is a full-page design JPEG only ~900-1024px wide, so these crops are all
the real detail that exists. Upscaling is the only way to get more.

| Page folder | File | Current size | Upscale to | Factor | What it is | Goes back to |
|---|---|---|---|---|---|---|
| `about/` | `hero-illustration.png` | 520x330 | **1600px wide** | ~3.1x | About hero illustration | `public/images/about/hero-illustration.png` |
| `services/` | `hero-illustration.png` | 534x300 | **1600px wide** | ~3.0x | Services hero illustration | `public/images/services/hero-illustration.png` |
| `contact/` | `hero-illustration.png` | 520x350 | **1600px wide** | ~3.1x | Contact hero illustration | `public/images/contact/hero-illustration.png` |
| `contact/` | `map.png` | 905x140 | **2600px wide** | ~2.9x | Contact office map strip | `public/images/contact/map.png` |
| `case-studies/` | `hero-illustration.png` | 540x272 | **1600px wide** | ~3.0x | Case Studies hero illustration | `public/images/case-studies/hero-illustration.png` |
| `case-studies/` | `ecommerce.png` | 290x136 | **900px wide** | ~3.1x | Card 1 image - E-COMMERCE | `public/images/case-studies/ecommerce.png` |
| `case-studies/` | `social-media.png` | 290x136 | **900px wide** | ~3.1x | Card 2 image - SOCIAL MEDIA | `public/images/case-studies/social-media.png` |
| `case-studies/` | `seo.png` | 290x134 | **900px wide** | ~3.1x | Card 3 image - SEO | `public/images/case-studies/seo.png` |
| `blog/` | `hero-illustration.png` | 462x268 | **1600px wide** | ~3.5x | Blog hero illustration | `public/images/blog/hero-illustration.png` |
| `blog/` | `featured.png` | 265x210 | **1100px wide** | ~4.2x | Featured post cover | `public/images/blog/featured.png` |
| `blog/` | `post-1.png` | 166x124 | **800px wide** | ~4.8x | Post card 1 cover | `public/images/blog/post-1.png` |
| `blog/` | `post-2.png` | 166x124 | **800px wide** | ~4.8x | Post card 2 cover | `public/images/blog/post-2.png` |
| `blog/` | `post-3.png` | 166x124 | **800px wide** | ~4.8x | Post card 3 cover | `public/images/blog/post-3.png` |
| `blog/` | `post-4.png` | 166x124 | **800px wide** | ~4.8x | Post card 4 cover | `public/images/blog/post-4.png` |
| `blog/` | `post-5.png` | 166x124 | **800px wide** | ~4.8x | Post card 5 cover | `public/images/blog/post-5.png` |
| `blog/` | `post-6.png` | 166x124 | *800px wide* | ~4.8x | *OPTIONAL - spare, not used yet (site has 6 posts)* | `public/images/blog/post-6.png` |
| `homepage/` | `hero-phone.webp` | 482x514 | **1200px wide** | ~2.5x | Homepage hero phone mockup | `public/images/homepage/hero-phone.webp` |

## Notes

- `blog/post-6.png` is **optional** - it is a spare cover for a future 7th post and is not
  currently displayed anywhere. Skip it if you want to save time.

- Keep the aspect ratio exactly as-is; do not crop or pad.
- PNG files should come back as PNG, the `.webp` file as `.webp` (or PNG - I will reconvert).
- `contact/map.png` has AI-garbled street names in the original design; upscaling will
  sharpen the garble. Consider replacing it with a real map embed instead.
