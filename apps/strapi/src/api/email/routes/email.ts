export default {
  routes: [
    {
      method: "POST",
      path: "/email/contact-form",
      handler: "email.sendContactForm",
      config: {
        policies: ["global::verifyCaptcha"],
        middlewares: [],
      },
    },
  ],
};