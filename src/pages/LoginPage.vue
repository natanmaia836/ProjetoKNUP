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
            v-model="usuario"
          ></q-input>
          <div><span class="text-subtitle1">Senha</span></div>
          <q-input
            dense
            rounded
            outlined
            bg-color="white"
            v-model="senha"
          ></q-input>
          <div class="text-center text-caption">
            <a href="esqueci-senha" class="senha">Esqueci minha senha</a>
          </div>
        </q-card-section>

        <q-card-actions class="flex flex-center"
          ><q-btn rounded color="secondary" text-color="dark" padding="sm xl"
            ><strong>Entrar</strong></q-btn
          ></q-card-actions
        >
        <q-card-actions class="flex flex-center text-secondary"
          ><a href="cadastro" class="cadastro"
            ><strong>Se cadastrar</strong></a
          ></q-card-actions
        >
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const form = ref({
      usuario: "",
      senha: "",
    });

    return {
      form,
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
