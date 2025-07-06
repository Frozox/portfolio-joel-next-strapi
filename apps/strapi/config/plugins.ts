export default ({ env }) => ({
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
  "schemas-to-ts": {
    enabled: true,
    config: {
      acceptedNodeEnvs: ["development"],
      commonInterfacesFolderName: "sharedSchemas",
      verboseLogs: false,
      alwaysAddEnumSuffix: false,
    },
  },
  email: {
    config: {
      provider: env('EMAIL_PROVIDER', 'nodemailer'),
      providerOptions: {
        host: env('EMAIL_SMTP_HOST'),
        port: env('EMAIL_SMTP_PORT'),
        auth: {
          user: env('EMAIL_SMTP_USER'),
          pass: env('EMAIL_SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_ADDRESS_FROM'),
      },
    }
  },
  'email-designer': {
    enabled: true,
    config: {
      editor: {
        options: {
          mergeTags: [
            {
              name: 'Email',
              value: '{{ email }}',
            },
            {
              name: 'Fullname',
              value: '{{ fullname }}',
            },
            {
              name: 'Message',
              value: '{{ message }}',
            },
            {
              name: 'Arts',
              value: '{{ arts }}',
            }
          ],
        },
      },
    },
  }
});
