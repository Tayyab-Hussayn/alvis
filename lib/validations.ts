import { z } from 'zod'

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:   z.string().email('Enter a valid email address').max(200),
  phone:   z.string().max(40).optional(),
  subject: z.string().min(2, 'Please add a subject').max(150),
  message: z.string().min(20, 'Tell us more — at least 20 characters').max(2000),
  _gotcha: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
