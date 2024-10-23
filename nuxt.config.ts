import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,

  build: {
    transpile: ["vuetify", "vue-i18n"],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(
          vuetify({
            autoImport: true,
            styles: { configFile: "./styles/settings.scss" },
          })
        );
      });
    },
    "@pinia/nuxt",
    "@vueuse/motion/nuxt",
    "nuxt-swiper",
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
        compilerOptions: {
          isCustomElement: (tag) => ["custom-dropdown"].includes(tag),
        },
      },
    },
    optimizeDeps: {
      exclude: ["vue-demi"],
    },
    resolve: {
      alias: {
        "@": "/Users/apple/Desktop/masterProject/frontend",
        "~": "/Users/apple/Desktop/masterProject/frontend",
      },
    },
  },

  // css: ["~/assets/fonts/main.css", "~/styles/main.scss"],

  sourcemap: {
    server: false,
    client: false,
  },

  alias: {
    "@": "/Users/apple/Desktop/masterProject/frontend",
    "~": "/Users/apple/Desktop/masterProject/frontend",
  },
});
