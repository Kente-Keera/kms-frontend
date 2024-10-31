import { defineStore } from "pinia";

export const useServiceStore = defineStore("service", {
  state: () => {
    return {
      sidebar: false,
      profile: [],

      knowledge: [],
      search: [],

      group: [],
      cate: [],
      subCate: [],
      profileKnowledge: [],

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
        const email = useCookie<string>("_email");
        const token = useCookie<string>("_token");
        const refreshToken = useCookie<string>("_refreshToken");

        user.value = data?.user.id;
        email.value = body?.username;
        token.value = data?.access_token;
        refreshToken.value = data?.refresh_token;

        return "LOGIN_SUCCESS";
      }
    },

    async getProfile() {
      const data: any = await interceptor(`profile`, "GET", undefined);
      this.profile = await data;
    },

    async getUserKnowledge() {
      const email = useCookie<string>("_email");

      const data: any = await interceptor(
        `users/email/?email=${email.value}`,
        "GET",
        undefined
      );
      this.profileKnowledge = await data?.knowledge;
    },

    async getKnowledge() {
      const data: any = await interceptor(`knowledges`, "GET", undefined);

      this.knowledge = await data;
    },

    async getGroup() {
      const data: any = await interceptor(`group`, "GET", undefined);

      this.group = await data;
    },
    async getCate() {
      const data: any = await interceptor(`category`, "GET", undefined);

      this.cate = await data;
    },
    async getSubCate(id : string, rate : number) {
      const data: any = await interceptor(`sub-cate/${id}/?rate=${rate}`, "GET", undefined);

      this.subCate = await data;
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

    async setComment(body: any) {
      const data: any = await interceptor(`comments/create`, "POST", body);
      
    },
  },
});
