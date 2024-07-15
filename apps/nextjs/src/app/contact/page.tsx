'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { env } from '@/env.mjs';
import { sendContactForm } from '@/helpers/hook/strapi/request';
import { ContactFormSchema } from '@/helpers/schemas/contact/contactForm';
import { cn } from '@/libs/utils';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { z } from 'zod';

const Contact = () => {
  const hcaptchaRef = React.useRef<HCaptcha>(null);

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
  });

  const [formSending, setFormSending] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
    if (!hcaptchaRef.current) return;
    await hcaptchaRef.current.execute({ async: true });
    data.h_captcha_response = hcaptchaRef.current.getResponse();
    setFormSending(true);

    console.log(data);

    sendContactForm(data).then(() => {
      form.reset();
      toast.success('Message envoyé !');
    }).catch((res: any) => {
      toast.error(res?.error?.status === 500 ? 'Une erreur s\'est produite.' : res.error.message);
    }).finally(() => {
      setFormSending(false);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='container grid grid-cols-2 gap-4 lg:w-2/3'>
        <FormField
          control={form.control}
          name='fullname'
          defaultValue=''
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>Nom/Prénom</FormLabel>
              <FormControl>
                <>
                  <label className='hidden'>.</label>
                  <Input placeholder='John Doe' {...field} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          defaultValue=''
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='jon.doe@me.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          defaultValue=''
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Textarea className='max-h-80 min-h-28 pt-8 scrollbar-hide' placeholder='Votre message' {...field} />
                  <span className={cn('absolute inset-x-0 top-0 text-end bg-background py-1 px-6 select-none border-x border-t border-input rounded-md text-muted-foreground', field.value.length > 1000 && 'text-destructive')}>{field.value.length}/1000</span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className={cn('col-span-2 w-full lg:w-64 my-2', formSending && 'cursor-not-allowed')}>
          <Button type="submit" disabled={formSending} className='w-full'>
            {formSending && (
              <>
                <span className='pr-2'>Envoyer</span>
                <span className='animate-bounce text-xl font-bold'>.</span>
                <span className='animate-bounce text-xl font-bold delay-75'>.</span>
                <span className='animate-bounce text-xl font-bold delay-100'>.</span>
              </>
            ) || 'Envoyer'}
          </Button>
        </div>
        <div className='hidden'>
          <HCaptcha
            ref={hcaptchaRef}
            sitekey={env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
            size="invisible"
          />
        </div>
        <Toaster toastOptions={{
          style: {
            backgroundColor: 'hsl(var(--foreground))',
            color: 'hsl(var(--background))',
          }
        }}/>
      </form>
    </Form>
  );
};

export default Contact;
