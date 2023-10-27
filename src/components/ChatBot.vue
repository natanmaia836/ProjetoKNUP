<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab class="botao" icon="support_agent" @click="abrirDialog()">
      <q-tooltip
        class="bg-dark"
        anchor="center left"
        self="center right"
        :offset="[10, 10]"
        >Abrir chamado</q-tooltip
      >
    </q-btn>
  </q-page-sticky>

  <q-dialog v-model="travaDialog" position="right">
    <q-card class="q-pa-md bg-accent" style="max-width: 100%; width: 300px">
      <q-form @submit="enviarChamado">
        <div class="row text-center">
          <div class="col-md-12 col-xs-12 q-mb-sm">
            <span class="text-h6">Abra um chamado</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-if="!interruptor"
              bg-color="white"
              label="Título"
              v-model="form.titulo"
              rounded
              outlined
              lazy-rules="ondemand"
              :rules="[
                (val) => (val !== null && val !== '') || 'Campo obrigatório.',
              ]"
            ></q-input>

            <q-input
              v-else
              label="CPF ou CNPJ (Cliente)"
              v-model="form.cpfcnpj"
              mask="##############"
              outlined
              lazy-rules="ondemand"
              :rules="[
                (val) => (val !== null && val !== '') || 'Campo obrigatório.',
              ]"
            ></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              bg-color="white"
              label="Descreva o chamado"
              v-model="form.descricao"
              rounded
              outlined
              type="textarea"
              lazy-rules="ondemand"
              :rules="[
                (val) => (val !== null && val !== '') || 'Campo obrigatório.',
              ]"
            ></q-input>
          </div>
        </div>

        <div class="row" v-if="interruptor">
          <div class="col">
            <q-input
              label="Telefone (Opcional)"
              dense
              v-model="form.telefone"
              mask="(##) #####-####"
              outlined
            ></q-input>
          </div>
        </div>
        <div class="row q-mt-sm" v-if="interruptor">
          <div class="col">
            <q-input
              label="E-mail (Opcional)"
              dense
              v-model="form.email"
              type="email"
              outlined
            ></q-input>
          </div>
        </div>
        <div class="row q-mt-sm" v-if="interruptor">
          <div class="col">
            <q-input
              label="Endereço (Opcional)"
              dense
              v-model="form.endereco"
              outlined
            ></q-input>
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col">
            <q-btn
              no-caps
              class="full-width"
              size="lg"
              text-color="dark"
              color="secondary"
              outlined
              rounded
              label="Enviar"
              icon-right="send"
              type="submit"
            ></q-btn>
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AbrirChamado",

  setup() {
    const $q = useQuasar();

    const travaDialog = ref(false);
    const interruptor = ref(false);

    const form = ref({
      titulo: "",
      descricao: "",
      entidade: 1,
      //
      email: "",
      cpfcnpj: "",
      telefone: "",
      endereco: " ",
    });

    //ENVIAR
    const enviarChamado = async () => {
      mapeamentoDescricao();

      if (resultado) {
        travaDialog.value = false;
      }
    };

    //MAPEAMENTO

    //DESMAIS METODOS
    const limparAll = () => {
      form.value = {
        titulo: "",
        descricao: "",
        entidade: 1,
        //
        email: "",
        cpfcnpj: "",
        telefone: "",
        endereco: " ",
      };
    };
    const abrirDialog = () => {
      limparAll();
      travaDialog.value = true;
      interruptor.value = false;
    };

    return {
      form,
      interruptor,
      travaDialog,
      enviarChamado,
      abrirDialog,
      limparAll,
    };
  },
});
</script>

<style>
.botao {
  color: #1e1e1e;
  background-color: white;
}
</style>
