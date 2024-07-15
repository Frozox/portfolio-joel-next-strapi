/**
 * email service
 */

import { ContactEmail } from "../../../../types/email/email";

export default () => ({
  async sendContactEmail(body: ContactEmail) {
    return await strapi.plugin("email-designer").services.email.sendTemplatedEmail(
      {
        to: process.env.EMAIL_ADDRESS_FROM,
      },
      {
        templateReferenceId: 1,
      },
      {
        fullname: body.fullname,
        email: body.email,
        message: body.message,
      },
    );
  },

  async sendContactEmailConfirmation(body: ContactEmail) {
    return await strapi.plugin("email-designer").services.email.sendTemplatedEmail(
      {
        to: body.email,
      },
      {
        templateReferenceId: 2,
      },
      {
        fullname: body.fullname,
        email: body.email,
        message: body.message,
      },
    );
  },
});
