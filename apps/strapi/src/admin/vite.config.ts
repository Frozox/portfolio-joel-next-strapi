import { env } from "@strapi/utils";
import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
        allowedHosts: [env('HOSTNAME', true)]
    }
  })
}