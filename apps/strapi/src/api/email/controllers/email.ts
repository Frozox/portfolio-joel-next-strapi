/**
 * A set of functions called "actions" for `email`
 */

import Joi from "joi";
import { ContactEmail, ContactEmailPopulated } from "../../../../types/email/email";

export default {
  sendContactForm: async (ctx, next) => {
    const emailBody: ContactEmail = ctx.request.body.data;

    const { error: validationError } = Joi.object({
      email: Joi.string().email().required(),
      fullname: Joi.string().required(),
      message: Joi.string().max(1000).required(),
      h_captcha_response: Joi.string().required(),
      arts: Joi.array().required(),
    }).validate(emailBody);

    if (validationError) {
      return ctx.badRequest('Une erreur est survenue', validationError);
    }

    try {
      const arts = await strapi.entityService.findMany("api::art.art", { populate: 'thumbnail', filters: { id: { $in: emailBody.arts }, sold_out: { $eq: false } }});

      const populatedBody: ContactEmailPopulated = {
        ...emailBody,
        arts: arts.map((art): ContactEmailPopulated['arts'][0] => ({
          id: art.id,
          name: art.name,
          thumbnail: {
            url: `${strapi.config.get('server.base_url')}${art.thumbnail.url}`,
            width: art.thumbnail.width,
            height: art.thumbnail.height,
          },
        })),
      };

      await strapi.service("api::email.email").sendContactEmail(populatedBody);
      await strapi.service("api::email.email").sendContactEmailConfirmation(populatedBody);
    } catch (e) {
      return ctx.badRequest('Une erreur est survenue', e);
    }

    ctx.status = 200;
  },
};
