import { z } from 'zod';

export const ContactFormSchema = z.object({
  fullname: z.string({ required_error: 'Champ requis.' }).min(1, { message: 'Champ requis.' }),
  email: z.string({ required_error: 'Champ requis.' }).min(1, { message: 'Champ requis.' }).email({ message: 'Email invalide.' }),
  message: z.string({ message: 'Champ requis.' }).min(1, { message: 'Champ requis.' }).max(1000),
  h_captcha_response: z.string().optional(),
});