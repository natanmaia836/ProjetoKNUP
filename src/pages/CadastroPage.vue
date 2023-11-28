<template>
  <q-page class="flex flex-center">
    <div class="row">
      <q-card class="q-pa-xl rounded-border bg-dark text-white borda-card">
        <q-btn href="login" flat icon="arrow_back"> </q-btn>
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
          <div><span class="text-subtitle1">E-mail</span></div>
          <q-input
            dense
            rounded
            outlined
            bg-color="white"
            v-model="form.email"
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
        </q-card-section>

        <q-card-actions class="flex flex-center"
          ><q-btn
            @click="cadastrarNovoUsuario()"
            rounded
            color="secondary"
            text-color="dark"
            padding="sm lg"
            ><strong>Cadastrar</strong></q-btn
          ></q-card-actions
        >
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import firestoreService from "src/services/FireStoreService";
import { MsgAtencao, MsgSucesso } from "src/util/useMsg";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CadastroPage",

  setup() {
    const { salvaGenericaSemID } = firestoreService();
    const router = useRouter();
    const form = ref({
      usuario: "",
      email: "",
      senha: "",
    });
    onMounted(() => {
      let usuario = getUsuario();
      if (!usuario) {
        moveToLoginPage();
      }
    });
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

    const cadastrarNovoUsuario = async () => {
      const result = await salvaGenericaSemID("Usuarios", form.value);
      if (result) {
        MsgSucesso("Usuário Cadastrado!");
        moveToLoginPage();
      } else {
        MsgAtencao("Não foi possível realizar o cadastro!");
        return;
      }
    };
    const moveToLoginPage = () => {
      // console.log(linha);
      let move_To = "";
      move_To = "/login";
      router.push(move_To);
    };
    return {
      form,
      cadastrarNovoUsuario,
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
</style>
