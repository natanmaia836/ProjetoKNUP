<template>
  <q-page class="flex flex-center">
    <div class="row">
      <q-card class="q-pa-xl rounded-border bg-dark text-white borda-card">
        <q-card-section class="flex flex-center">
          <span class="text-h3"
            ><strong>KN</strong><strong class="text-secondary">UP</strong></span
          >
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <div><span class="text-subtitle1">Usuário</span></div>
          <q-input
            dense
            rounded
            outlined
            bg-color="white"
            v-model="form.usuario"
          ></q-input>
          <div><span class="text-subtitle1">Senha</span></div>
          <q-input
            type="password"
            dense
            rounded
            outlined
            bg-color="white"
            v-model="form.senha"
          ></q-input>
          <div class="text-center text-caption">
            <a href="esqueci-senha" class="senha">Esqueci minha senha</a>
          </div>
        </q-card-section>

        <q-card-actions class="flex flex-center"
          ><q-btn
            rounded
            color="secondary"
            text-color="dark"
            padding="sm xl"
            @click="metodoLogin()"
            ><strong>Entrar</strong></q-btn
          ></q-card-actions
        >
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Notify } from "quasar";
import firestoreService from "src/services/FireStoreService";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const { buscarColecao } = firestoreService();

    const router = useRouter();

    const form = ref({
      usuario: "",
      senha: "",
    });

    onMounted(() => {
      let usuario = getUsuario();
      if (usuario) {
        moveToHome();
      }
    });
    const metodoLogin = async () => {
      const result = await buscarColecao("Usuarios");
      if (result) {
        let contador = 0;
        result.forEach(async (user) => {
          contador++;
          if (
            form.value.usuario == user.usuario &&
            form.value.senha == user.senha
          ) {
            if (user.usuario == "admin") {
              await setUsuario("Usuario_administrador", user);
              refreshPage();
            } else {
              await setUsuario("Usuario_padrao", user);
              refreshPage();
            }
          } else if (
            form.value.usuario != user.usuario &&
            form.value.senha != user.senha &&
            contador == result.length
          ) {
            MsgAtencao("Usuário não cadastro ou inválido!");
          }
        });
      }
    };
    const setUsuario = async (tipoUsuario, user) => {
      window.localStorage.setItem(tipoUsuario, JSON.stringify(user));
      MsgSucesso("Login realizado!");
    };
    const moveToHome = () => {
      // console.log(linha);
      let move_To = "";
      move_To = "/";
      router.push(move_To);
    };
    const MsgSucesso = (mensagem) => {
      Notify.create({
        icon: "announcement",
        type: "positive",
        progress: true,
        multiLine: true,
        html: true,
        position: "top",
        message: mensagem,
      });
    };
    const MsgAtencao = (mensagem) => {
      Notify.create({
        icon: "announcement",
        type: "warning",
        multiLine: true,
        progress: true,
        html: true,
        position: "top",
        message: mensagem,
      });
    };
    const refreshPage = () => {
      location.reload();
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
    return {
      form,
      metodoLogin,
    };
  },
});
</script>

<style scoped>
.rounded-border {
  border-radius: 40px; /* Ajuste o valor de acordo com o quanto você deseja arredondar as bordas */
}
.borda-card {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5); /* Sombreamento */
  padding: 50px; /* Espaçamento interno */
}
.cadastro {
  color: #ffcd29;
}
.senha {
  color: white;
  text-decoration: none;
}
</style>
