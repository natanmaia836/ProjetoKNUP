<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-dark">
        <q-btn href=""
          ><span class="text-h3"
            ><strong>KN</strong><strong class="text-secondary">UP</strong></span
          ></q-btn
        >
        <q-space />

        <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->

        <q-btn href="" no-caps flat label="Clientes" />
        <q-btn href="faleconosco" no-caps flat label="Fale Conosco" />
        <q-btn href="" no-caps flat label="Planos" />
        <q-btn href="" no-caps flat label="Sobre nós" />
        <q-btn href="/login" no-caps flat label="Login" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-primary">
      <router-view />
      <ChatBot></ChatBot>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import ChatBot from "components/ChatBot.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    ChatBot,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {};
  },
});
</script>
