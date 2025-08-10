/**
 * A set of functions called "actions" for `email`
 */

import { Media_Plain } from "@common/sharedSchemas/Media";
import { ContactEmail, ContactEmailPopulated } from "@interfaces/common/email";
import Joi from "joi";

export default {
  sendContactForm: async (ctx, next) => {
    const emailBody: ContactEmail = ctx.request.body.data;

    const { error: validationError } = Joi.object({
      email: Joi.string().email().required(),
      fullname: Joi.string().required(),
      message: Joi.string().max(1000).required(),
      h_captcha_response: Joi.string().required(),
      arts: Joi.array().items(Joi.string()).required(),
    }).validate(emailBody);

    if (validationError) {
      return ctx.badRequest('Une erreur est survenue', validationError);
    }

    try {
      const arts = await strapi.documents("api::art.art").findMany({ populate: 'thumbnail', filters: { documentId: { $in: emailBody.arts }, sold_out: { $eq: false } }})

      const populatedBody: ContactEmailPopulated = {
        ...emailBody,
        arts: arts.map((art) => ({
          id: art.id as number,
          name: art.name,
          thumbnail: {
            url: `${strapi.config.get('server.url')}${art.thumbnail.url}`,
            width: art.thumbnail?.width,
            height: art.thumbnail?.height,
          } as Media_Plain,
        })),
      };

      await strapi.service("api::email.email").sendContactEmail(populatedBody);
      await strapi.service("api::email.email").sendContactEmailConfirmation(populatedBody);
      
      ctx.status = 200;
    } catch (e) {
      console.error(e)
      ctx.internalServerError('L\'email n\'a pas pu être envoyé');
    }
  },
};
