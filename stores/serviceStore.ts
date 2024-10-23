import { defineStore } from "pinia";
export const useServiceStore = defineStore("service", {
  state: () => {
    return {
      sidebar: false,
      profile: [],

      knowledge: [],
      group: [],
    };
  },
  actions: {
    onToggleSidebar() {
      this.sidebar = !this.sidebar;
    },

    async setLogin(body: { username: string; password: string | null }) {
      const data = await interceptor(`auth/login`, "POST", body);

      if (data?.message === "Email or Password Incorrect") {
        return data?.message;
      } else {
        const user = useCookie<string>("_user");
        const token = useCookie<string>("_token");
        const refreshToken = useCookie<string>("_refreshToken");

        user.value = data?.user.id;
        token.value = data?.access_token;
        refreshToken.value = data?.refresh_token;

        return "LOGIN_SUCCESS";
      }
    },

    async getProfile() {
      const data: any = await interceptor(`profile`, "GET", undefined);
      this.profile = await data;
    },

    async getKnowledge() {
      const data: any = await interceptor(`knowledges`, "GET", undefined);
  
      this.knowledge = await data;
    },

    async getGroup() {
      const data: any = await interceptor(`group`, "GET", undefined);

      this.group = await data;
    },
  },
});
