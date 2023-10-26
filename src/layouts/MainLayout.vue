<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-sm" style="background-color: bisque">
      <q-toolbar class="bg-brown text-orange shadow-2 rounded-borders">
        <q-btn flat icon="home" href="/"
          ><p style="color: orange"><b style="color: white">KN</b>UP</p></q-btn
        >
        <q-space />

        <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->

        <q-btn href="" no-caps flat label="Clientes" />
        <q-btn href="/faleconosco" no-caps flat label="Fale Conosco" />
        <q-btn href="" no-caps flat label="Planos" />
        <q-btn href="" no-caps flat label="Sobre nós" />
        <q-btn href="/login" no-caps flat label="Login" />
      </q-toolbar>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    return {};
  },
});
</script>
