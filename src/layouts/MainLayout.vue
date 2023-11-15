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
        <q-btn href="novocashback" no-caps flat label="Novo Cashback" />
        <q-btn href="clientes" no-caps flat label="Clientes" />
        <q-btn href="faleconosco" no-caps flat label="Fale Conosco" />
        <q-btn href="" no-caps flat label="Planos" />
        <q-btn href="sobrenos" no-caps flat label="Sobre nós" />
        <q-btn href="login" no-caps flat label="Login" />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-primary">
      <router-view />
      <div>
        <q-btn
          v-if="mostrarBotao"
          fab
          fixed
          @click="scrollToTop"
          icon="arrow_upward"
          class="q-ma-md botao-voltar"
          color="secondary"
          text-color="black"
          style="bottom: 11%; right: 0.2vw"
        >
          <q-tooltip
            class="bg-dark"
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
            >Início</q-tooltip
          ></q-btn
        >
      </div>
      <ChatBot></ChatBot>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import ChatBot from "components/ChatBot.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    ChatBot,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const mostrarBotao = ref(false);

    // Mostra ou oculta o botão com base na posição da página
    const verificarMostrarBotao = () => {
      mostrarBotao.value = window.scrollY > 100;
    };

    // Rola a página de volta ao topo
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Adiciona um ouvinte de rolagem quando o componente é montado
    onMounted(() => {
      window.addEventListener("scroll", verificarMostrarBotao);
    });

    // Remove o ouvinte de rolagem quando o componente é desmontado
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", verificarMostrarBotao);
    });

    return { mostrarBotao, scrollToTop };
  },
});
</script>

<style scoped>
.botao-voltar {
  position: fixed;
  bottom: -50px; /* Começa abaixo da tela */
  right: 16px;
  transition: bottom 50s ease-in-out; /* Ajuste a duração e a função de timing */
}

.botao-voltar.mostrar {
  bottom: 16px; /* Posição quando visível */
}
</style>
