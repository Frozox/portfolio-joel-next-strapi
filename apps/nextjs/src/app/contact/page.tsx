'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { env } from '@/env.mjs';
import { sendContactForm } from '@/helpers/hook/strapi/request';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const hcaptchaRef = React.useRef<HCaptcha>(null);

  const { register, handleSubmit, reset } = useForm();

  const createContact = async (data: FieldValues) => {
    if (!hcaptchaRef.current) return;
    await hcaptchaRef.current.execute({ async: true });
    data.h_captcha_response = hcaptchaRef.current.getResponse();

    sendContactForm(data).then(() => {
      reset();
      toast.success('Message envoyé !');
    }).catch((res: any) => {
      toast.error(res.error.message);
    });
  };

  return (
    <div className="container size-full lg:w-2/3">
      <form
        onSubmit={handleSubmit((data) => createContact(data))}
        className="grid grid-cols-1 gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Nom/Prénom</Label>
            <Input
              {...register('fullname')}
              type="text"
              placeholder="John Doe"
              required={true}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="jon.doe@me.com"
              required={true}
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              {...register('message')}
              placeholder="Votre message"
              required={true}
            ></Textarea>
          </div>
          <Button type="submit" className="col-span-2 w-full lg:w-64">
            Envoyer
          </Button>
        </div>
        <HCaptcha
          ref={hcaptchaRef}
          sitekey={env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
          size="invisible"
        />
        <Toaster />
      </form>
    </div>
  );
};

export default Contact;
