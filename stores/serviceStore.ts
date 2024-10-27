import { defineStore } from "pinia";
import Search from "~~/pages/search/[search].vue";
export const useServiceStore = defineStore("service", {
  state: () => {
    return {
      sidebar: false,
      profile: [],

      knowledge: [],
      search: [],
      group: [],

      knowledgeId: null,
    };
  },
  actions: {
    onToggleSidebar() {
      this.sidebar = !this.sidebar;
    },

    async setLogin(body: { username: string; password: string | null }) {
      const data: any = await interceptor(`auth/login`, "POST", body);

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

    async createKnowledge(body: any) {
      const data: any = await interceptor(`knowledges/create`, "POST", body);

      if (data?.id) {
        return "SUCCESS";
      }
    },
    async getSearchKnowledge(word: string) {
      if (word === null) {
        const data: any = await interceptor(
          `knowledges/search/?keyword=`,
          "GET",
          undefined
        );

        this.search = await data;
      } else {
        const data: any = await interceptor(
          `knowledges/search/?keyword=${word}`,
          "GET",
          undefined
        );

        this.search = await data;
      }
    },

    async getKnowledgeById(id: any) {
      const data: any = await interceptor(`knowledges/${id}`, "GET", undefined);
      this.knowledgeId = await data;
    },
  },
});
