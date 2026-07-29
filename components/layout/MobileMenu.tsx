'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: NavLink[]
  pathname: string
}

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
}

const contentVariants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
}

const linkVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
}

export function MobileMenu({ open, onClose, links, pathname }: MobileMenuProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[60] bg-black/20"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-[70] bg-surface flex flex-col px-6 py-6"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Close button */}
                <div className="flex justify-end mb-12">
                  <button
                    onClick={onClose}
                    aria-label="Close menu"
                    className="p-2 text-text"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-2 flex-1">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          'block text-display-md font-display font-bold py-2 transition-colors duration-200',
                          pathname === link.href ? 'text-accent' : 'text-text hover:text-accent',
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.3 } }}
                  className="pt-8 border-t border-border"
                >
                  <Button href="/contact" variant="primary" size="lg" withArrow className="w-full">
                    Let&apos;s Talk
                  </Button>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
