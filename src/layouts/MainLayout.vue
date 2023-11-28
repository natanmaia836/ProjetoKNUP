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
        <q-btn href="" no-caps flat icon="home" color="amber"
          ><q-tooltip>Home</q-tooltip></q-btn
        >
        <q-btn
          href="novocashback"
          no-caps
          flat
          label="Novo Cashback"
          v-if="loginv == true"
        />
        <q-btn
          href="clientes"
          no-caps
          flat
          label="Clientes"
          v-if="loginv == true"
        />
        <q-btn href="faleconosco" no-caps flat label="Fale Conosco" />
        <q-btn href="sobrenos" no-caps flat label="Sobre nós" />
        <q-btn href="login" no-caps flat label="Login" v-if="loginv == false" />
        <q-btn
          href="cadastro"
          no-caps
          flat
          label="Cadastrar"
          v-if="permissaoAdministrador == true && loginv == true"
        />
        <q-btn
          v-if="loginv == true"
          round
          icon="logout"
          color="secondary"
          @click="fazerLogout()"
        >
          <q-tooltip>Desconectar</q-tooltip>
        </q-btn>
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
          style="bottom: calc(8% + 16px); right: calc(0.1vw + 0.1px)"
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
import firestoreService from "src/services/FireStoreService";
import ChatBot from "components/ChatBot.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MainLayout",

  components: {
    ChatBot,
  },

  setup() {
    const { buscarColecao } = firestoreService();
    const router = useRouter();
    const permissaoAdministrador = ref(false);
    const loginv = ref(false);
    const leftDrawerOpen = ref(false);

    const mostrarBotao = ref(false);

    onMounted(async () => {
      await metodoVerificaSeEstaLogado();
    });

    const metodoVerificaSeEstaLogado = async () => {
      loginv.value = false;
      permissaoAdministrador.value = false;
      const result = getUsuario();
      if (result) {
        const resultado = await buscarColecao("Usuarios");
        if (resultado) {
          resultado.forEach((user) => {
            if (result.id == user.id) {
              loginv.value = true;
              if (result.usuario == "admin") {
                permissaoAdministrador.value = true;
              }
            }
          });
        }
      }
      //console.log(result);
    };

    const getUsuario = () => {
      const result = JSON.parse(
        window.localStorage.getItem("Usuario_administrador")
      );
      if (result) {
        return result;
      } else {
        const result2 = JSON.parse(
          window.localStorage.getItem("Usuario_padrao")
        );
        if (result2) {
          return result2;
        }
      }
    };
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

    // Remove o ouvinte de rolagem quando o componente é desmontado
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", verificarMostrarBotao);
    });
    const fazerLogout = async () => {
      let usuario = await getUsuario();
      if (usuario.usuario == "admin") {
        window.localStorage.removeItem("Usuario_administrador");
      } else {
        window.localStorage.removeItem("Usuario_padrao");
      }
      refreshPage();
    };
    const moveToLoginPage = () => {
      // console.log(linha);
      let move_To = "";
      move_To = "/login";
      router.push(move_To);
    };
    const refreshPage = () => {
      location.reload();
    };

    return {
      mostrarBotao,
      scrollToTop,
      fazerLogout,
      permissaoAdministrador,
      loginv,
    };
  },
});
</script>

<style scoped>
.botao-voltar {
  position: fixed;
  bottom: -50px; /* Começa abaixo da tela */
  right: 16px;
  transition: bottom 0.5s ease-in-out; /* Ajuste a duração e a função de timing */
}

.botao-voltar.mostrar {
  bottom: 16px; /* Posição quando visível */
}
</style>
