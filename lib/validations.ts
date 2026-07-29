import { z } from 'zod'

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:   z.string().email('Enter a valid email address').max(200),
  company: z.string().max(100).optional(),
  service: z.string().min(1, 'Please select a service'),
  budget:  z.string().min(1, 'Please select a budget range'),
  message: z.string().min(20, 'Tell us more — at least 20 characters').max(2000),
  _gotcha: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
