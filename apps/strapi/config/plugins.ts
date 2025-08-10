
import type { EmailConfig } from "strapi-plugin-email-designer-5/dist/server/src";

export default ({ env }) => ({
  'sortable-entries': {
    enabled: true,
  },
  'strapi-thumbhash': {
    enabled: true,
    config: {
      // Set recreateOnBootStrap to true if you'd like to generate all hashes
      // on bootstrap. Depending on the amount of files, it may take some time.
      // It won't recreate hashes if they already exist.
      recreateOnBootStrap: false,
      regenerateOnUpdate: true
    }
  },
  'schemas-to-ts': {
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
  'email-designer-5': {
    enabled: true,
    config: {
      mergeTags: {
        email: {
          name: 'Email',
          value: '{{ email }}',
        },
        fullname: {
          name: 'Fullname',
          value: '{{ fullname }}',
        },
        message: {
          name: 'Message',
          value: '{{ message }}',
        },
        arts: {
          name: 'Arts',
          value: '{{ arts }}',
        }
      }
    } as EmailConfig,
  }
});
