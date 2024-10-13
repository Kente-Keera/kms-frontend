import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify, type ThemeDefinition } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from "vuetify/labs/components";

export default defineNuxtPlugin((nuxtApp) => {
  const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
      primary: "#ffffff",
      secondary : "#000000",
      base : "#f5f5f5",
      Gray : "#c3c0c0",
      white: "#ffff",
      menu : "#4a4a4a",
      bgmain : "#F7F7FC",
      success : "#2e8c47"
    },
  };
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
