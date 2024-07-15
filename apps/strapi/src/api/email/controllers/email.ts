/**
 * A set of functions called "actions" for `email`
 */

import Joi from "joi";
import { ContactEmail } from "../../../../types/email/email";

export default {
  sendContactForm: async (ctx, next) => {
    const emailBody: ContactEmail = ctx.request.body.data;

    const { error: validationError } = Joi.object({
      email: Joi.string().email().required(),
      fullname: Joi.string().required(),
      message: Joi.string().max(1000).required(),
      h_captcha_response: Joi.string().required(),
    }).validate(emailBody);

    if (validationError) {
      return ctx.badRequest(null, validationError);
    }

    try {
      await strapi.service("api::email.email").sendContactEmail(emailBody);
      await strapi.service("api::email.email").sendContactEmailConfirmation(emailBody);
    } catch (e) {
      return ctx.badRequest(null, e);
    }

    ctx.status = 200;
  },
};
