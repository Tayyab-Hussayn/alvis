'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Newsletter Automation Agent',
    desc: 'Automated content pipeline pulling from Reddit, Hacker News, GitHub, and RSS, processed through LLMs, delivered via WhatsApp',
    tags: ['AI Automation', 'n8n'],
    href: '/case-studies/newsletter-automation-agent',
    primary: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAahju0E0pob2D1JgJd9VH0yU0tRdxV9hhW_f5HeMvP6Z3yPaZqUJI95Eh_HarLB4sQkIZQD94QfSXDTEjiw9mYiX3DEL58jb_6JL6qEo9ybMh_TPmla76Kjr-oTSWzVFBWES_B6JzkMw_VvC-ZI_l3schLYg2uT5C5Xzz-NMbsBS5t6psb7r9_TiMUIApq2CAHPfM_tejBh6Nsg_vyuyHGfmXuf7SeDfWucoHxZOMN9ovCzG9jNy2J',
      alt: 'Newsletter automation mobile dashboard',
      cls: 'absolute w-[60%] h-[80%]',
    },
    secondary: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-2WIyzv27bPhNqXdduD-rJ_dhJSbOEu8MJZCD9xuqIlYvGzQWaM8zMvaT96OreeJFhQa552IC5bm_FDI4Gj5DqOxlsnzS7sTffKOV2JvTeZ0dh63SMpuNSVapSnLPFfWqqnrjCgpkdSOZglnSQaIrmPDWZjc42pgCcxcLHIxZ80EVqnU-bcyELkFRsxeVXNQvX-EismROoHtYlp2-PqSyDoS6V1Y3LFxgRFjNEUGslIO6ta9llyHV',
      alt: 'WhatsApp newsletter delivery interface',
      cls: 'absolute w-[50%] h-[70%] left-[10%]',
    },
  },
  {
    id: 2,
    title: 'Qalam',
    desc: 'Live product built end-to-end with a modern full-stack architecture',
    tags: ['Full Stack', 'Next.js'],
    href: '/case-studies/qalam',
    primary: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh-bamLFd4jX-c6zhX_m0pkHDgi_0Z37Hx7eFft3IT217cVB4on0xuwyQeeDhm0IMHMVOUF8QZPcU3wB6G6mA6DViCSCcMbaw5eh1NUkaQ2GhvPsrFKj4A6WKvxVS1hxUW2hMOVkx6jgwRxbmj4ESxf98E5jvAuLuGy5_P70LerLagcIrxWrB0Au565g4aco6ecb3IwRIYMLycTBTwqdrXe7wHlvZNu9WYiekRrQ9bitXBo_KWuu6T',
      alt: 'Qalam SaaS landing page',
      cls: 'absolute w-[70%] h-[85%]',
    },
    secondary: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfWFlmH9IXl_7RS9yv0vV0NMFlQs0bMerP1CAhFtzQeg45Pw7iDlBVMBv4QCZ80kXjpHGA4eeXNJrN5tmNkk9bOB7bHN8-LbdzEuRKvyCnsr3W-hpFPxhsfX66PBnNw7ZTtPxUxLt2Nqa8GiljcXDb5mi8e3uczdrBRd2HKhpPk-vmIckam0vsbgE0Q4yZwFM8DIzA8O2vBdWJPPamq0ucuDd5ZjCpIa32l9BPSgXcBj9uATGVB-S1',
      alt: 'Qalam mobile dashboard',
      cls: 'absolute w-[45%] h-[65%] right-[5%]',
    },
  },
  {
    id: 3,
    title: 'TechSpirex',
    desc: 'Live technical platform combining web development and automated workflows',
    tags: ['Web Development', 'Automation'],
    href: '/case-studies/techspirex',
    primary: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWFXFdW78rVViJyTrb4IJBDp35csHdv1G26XiALqq7z8LgqOnxEEXswdsIEy-BX9Tgr_iUt6iBGNUSJDApMdNGBiiFC2Eq-6ocLAbrBj8a3c4DB9WNc1KdXl5vxPGL2dVGkCIW-ISzlPvKS2n09XwxND3jkSH0-Lm-E5YIFJRlNzgF5YEf2BXbzWh576IkFrJKxMEs4q0ctOwR7qRKWKFRvRlK3Om72tLQu_6nCt9ey8yY7yZRvzE7',
      alt: 'TechSpirex corporate website',
      cls: 'absolute w-[80%] h-[70%]',
    },
    secondary: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNk2P2pVkyhKYIhotUcvnW9cx0_Safz6jpbRG9xVfWNfOJ20Cx7elskkwXZSPscxMaCmXoDYynEsc_le8bf03Ui-8jEWZtTjVu_0HVCxiDzj21zF_deYcGbAfpFwlHCrxn_j1gmJ9nO2Zax40cokVbd0fZHIlbPdtGeGTZBX5oTfFRcRAHN2-N5ULeNuvi4xQqxUpRq_qiXrcGUEkXNF7mNW1pZVrYHtLx4AakTh6c7xjdyJkb5mc',
      alt: 'TechSpirex workflow automation mobile',
      cls: 'absolute w-[40%] h-[80%] right-[15%] -top-[10%]',
    },
  },
  {
    id: 4,
    title: 'leadsGen',
    desc: 'Automated lead generation system built for business development workflows',
    tags: ['AI Integration', 'Lead Generation'],
    href: '/case-studies/leadsgen',
    primary: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTlGUZdp9eUMsbDCOr5e0Kl3pTYJAPW0Si9VT9SEBzwMKpVTjRW83s244NkIrUhv7VN4SAAgYOuFfsMipArgThlhRPRhjISKh5P4CLA4JgsNgxBBMME9NBP-PxB3kDrqENYCo_M1hZRmnXHSFjaelglzm5RbiSvEd9JL_Q1GPjdj0O0lqCcuCjbLx740hQJ-YauR0lCmK2CKApiwnqnbecJ2my05tr10MAHmmWhC3v_ZJ_BaAgidrk',
      alt: 'leadsGen B2B dashboard',
      cls: 'absolute w-[60%] h-[85%]',
    },
    secondary: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa6gvBdn09nggLaEVl-x2Lema6V__ulK2rCujcUfEErDAv9EYKXoEc1kmVtn52bwJlhUEMBR_lN3hsbQBxrk4xWqtVhkbjb_PAAznuJgp464e6WNz5LgkrZUyCL2DlwOt2uMTJsIktFYA_xV_bPpYSg0OrxI7YTJS3b10KOTD6jrHjZKgOJluQSARB6zEtOvKTFyohn36ryG_j0HITjNyg24XwxXdsKF9BdoM9laWEPyMZ4PrCR7rk',
      alt: 'leadsGen prospecting automation UI',
      cls: 'absolute w-[55%] h-[60%] left-[5%] bottom-[10%]',
    },
  },
]

export function PortfolioPreview() {
  return (
    <section className="bg-[#f8f9ff] py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
          <div>
            <p className="text-[#004ac6] font-semibold tracking-wide flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-[#004ac6] inline-block" />
              Our Portfolio
            </p>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-[#0b1c30]">
              Our Latest <span className="text-[#004ac6]">Projects</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-3 bg-[#0b1c30] text-white py-3 px-6 rounded-full hover:bg-[#004ac6] transition-all duration-300 shadow-md self-start md:self-auto"
          >
            <span className="text-[14px] font-semibold">View All Projects</span>
            <span className="bg-white/20 rounded-full p-1 group-hover:bg-white/40 transition-colors">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(({ id, title, desc, tags, href, primary, secondary }) => (
            <div
              key={id}
              className="group bg-[#eff4ff] border border-[#c3c6d7]/30 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Visual mockup container */}
              <div className="relative w-full aspect-[4/3] bg-[#e5eeff] rounded-lg overflow-hidden mb-6 perspective-container flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#004ac6]/5 to-transparent" />
                <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
                  <div className={`${primary.cls} rounded-xl bg-white border border-[#c3c6d7]/50 overflow-hidden tilt-card-primary z-10`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={primary.src} alt={primary.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className={`${secondary.cls} rounded-xl bg-slate-50 border border-[#c3c6d7]/50 overflow-hidden tilt-card-secondary`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={secondary.src} alt={secondary.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span key={tag} className="bg-[#dce9ff] text-[#004ac6] px-3 py-1 rounded-full text-[12px] font-semibold tracking-tight uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-[22px] font-semibold text-[#0b1c30] mb-2 leading-snug group-hover:text-[#004ac6] transition-colors">
                  {title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#434655] line-clamp-2">{desc}</p>
              </div>

              {/* Arrow button */}
              <div className="mt-6 flex justify-end">
                <Link
                  href={href}
                  className="w-10 h-10 rounded-full bg-[#0b1c30] text-white flex items-center justify-center group-hover:bg-[#004ac6] transition-all duration-300"
                >
                  <ArrowUpRight size={18} className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
