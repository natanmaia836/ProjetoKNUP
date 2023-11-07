import { defineStore } from "pinia";

export const useCookies = defineStore("stores_cookies", {
  state: () => ({
    cookie: {},
  }),

  getters: {
    // doubleCount(state) {
    //   return state.counter * 2;
    // },
    // getMe(state) {
    //   return state.me;
    // },
    // getToken(state) {
    //   return state.token;
    // },
    // getIsAuthenticated(state) {
    //   return state.isAuthenticated;
    // },
  },

  actions: {
    async setCookies(cookies) {
      this.cookie = cookies;
      window.localStorage.setItem("Cookies", JSON.stringify(cookies));
    },
    async getCookies() {
      const result = JSON.parse(window.localStorage.getItem("usuario"));
      // console.log('getUsuario', result);
      if (result) {
        this.usuario = result.usuario;
        this.claims = result.claims;
        this.token = result.token;
        this.isAuthenticated = true;
      } else {
        this.removeUsuario();
      }
    },
  },
});
