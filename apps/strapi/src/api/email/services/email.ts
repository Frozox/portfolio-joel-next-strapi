/**
 * email service
 */

import { ContactEmailPopulated } from "../../../../types/email/email";

export default () => ({
  async sendContactEmail(body: ContactEmailPopulated) {
    return await strapi.plugin("email-designer").services.email.sendTemplatedEmail(
      {
        to: process.env.EMAIL_ADDRESS_FROM,
      },
      {
        templateReferenceId: 1,
      },
      body,
    );
  },

  async sendContactEmailConfirmation(body: ContactEmailPopulated) {
    return await strapi.plugin("email-designer").services.email.sendTemplatedEmail(
      {
        to: body.email,
      },
      {
        templateReferenceId: 2,
      },
      body,
    );
  },
});
