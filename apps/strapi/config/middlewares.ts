export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "cdn.jsdelivr.net",
            "strapi.io",
            "s3.amazonaws.com",
          ],
          "media-src": ["'self'", "data:", "blob:", "market-assets.strapi.io"],
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "editor.unlayer.com",
            "editor.unlayer.com/embed.js",
          ],
          "frame-src": ["'self'", "editor.unlayer.com"],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      headers: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "Cache-Control",
        "Pragma",
      ],
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    },
  },
];
