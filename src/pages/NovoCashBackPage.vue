<template>
  <q-page class="q-pa-md">
    <div class="row window-height justify-center items-center">
      <div class="col-5">
        <q-card class="q-pa-md row column align-center text-center">
          <div class="col-12">
            <h5 style="font-weight: 600" v-show="passo == 1">
              Realize o Cashback...
            </h5>
            <h5 style="font-weight: 600" v-show="passo == 2">
              PIN enviado via SMS para {{ celular_cli }}
            </h5>
            <h5 style="font-weight: 600" v-show="passo == 3">
              Para finalizar o processo...
            </h5>
            <h5 style="font-weight: 600" v-show="passo == 4">
              Cashback realizado!
            </h5>
          </div>
          <div class="col-12">
            <p v-show="passo == 1">1. Informe o celular do cliente</p>
            <p v-show="passo == 2">2. Insira o código (4 dígitos)</p>
            <p v-show="passo == 3">3. Insira o valor da compra</p>
            <p v-show="passo == 4">
              4. Parabéns!, o Cashback no valor de R$
              <b style="color: darkgoldenrod">{{ valor_cashback }}</b> foi
              gerado sob o valor de R$
              <b style="color: darkgoldenrod">{{ valor_compra }}</b>
              para a próxima compra em até 30 dias, cliente:
              <b style="color: darkgoldenrod">{{ celular_cli }} </b>
            </p>
          </div>
          <div class="col-1">
            <q-input
              v-show="passo == 1"
              outlined
              style="font-size: large"
              hint="(XX) XXXXX-XXXX"
              v-model="celular_cli"
              mask="(##) #####-####"
            ></q-input>
            <q-input
              v-show="passo == 2"
              style="font-size: large"
              outlined
              v-model="codigo_sms"
              mask="####"
            ></q-input>
            <q-input
              v-show="passo == 3"
              style="font-size: large"
              outlined
              label="R$"
              v-model="valor_compra"
              mask="#####,##"
              reverse-fill-mask
            ></q-input>
          </div>
          <div class="col q-mt-md" v-if="passo == 1">
            <q-btn
              :disable="celular_cli.length < 15"
              no-caps
              icon="send"
              color="orange"
              label="Continuar"
              @click="Avançar1()"
            ></q-btn>
          </div>
          <div class="col q-mt-md q-gutter-x-md" v-if="passo == 2">
            <q-btn no-caps label="Cancelar" @click="Voltar()"></q-btn>
            <q-btn
              :disable="codigo_sms.length < 4"
              no-caps
              color="orange"
              label="Continuar"
              @click="Avançar2()"
            ></q-btn>
          </div>
          <div class="col q-mt-md q-gutter-x-md" v-if="passo == 3">
            <q-btn no-caps label="Cancelar" @click="Voltar()"></q-btn>
            <q-btn
              :disable="codigo_sms.length < 4"
              no-caps
              color="orange"
              label="Continuar"
              @click="Avançar3()"
            ></q-btn>
          </div>
          <div class="col q-mt-md q-gutter-x-md" v-if="passo == 4">
            <q-btn icon="home" href="/"><q-tooltip>Home</q-tooltip></q-btn>
            <q-btn color="orange" icon="person" href="/clientes"
              ><q-tooltip>Clientes</q-tooltip></q-btn
            >
          </div>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialogCancelar">
      <q-card class="q-pa-md">
        <div class="row">
          <h5>
            Deseja realmente <b style="color: darkgoldenrod">cancelar</b> a
            operação?
          </h5>
        </div>
        <div class="row text-center column q-col-gutter-y-sm">
          <div class="col">
            <q-btn
              no-caps
              color="orange"
              label="Não"
              @click="dialogCancelar = false"
            ></q-btn>
          </div>
          <div class="col">
            <q-btn no-caps label="Sim, cancelar." @click="Cancelar()"></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
const dialogCancelar = ref(false);
const mensagem = ref("");
const celular_cli = ref("");
const codigo_sms = ref("");
const valor_compra = ref("");
const valor_cashback = ref(0);
const passo = ref(1);
export default {
  setup() {
    const Voltar = () => {
      dialogCancelar.value = true;
    };
    const Avançar1 = () => {
      passo.value = 2;
      MsgSucesso("Código Enviado!");
    };
    const Avançar2 = () => {
      passo.value = 3;
      MsgSucesso("Código Verificado!");
    };
    const Avançar3 = () => {
      passo.value = 4;
      MsgSucesso("Cashback realizado!");
      valor_cashback.value =
        (parseFloat(valor_compra.value.replace(",", ".")) * 5) / 100;
      valor_cashback.value = valor_cashback.value.replace(".", ",");
      valor_compra.value = valor_compra.value.replace(".", ",");
    };
    const Cancelar = () => {
      passo.value = 1;
      codigo_sms.value = "";
      celular_cli.value = "";
      mensagem.value = "";
      dialogCancelar.value = false;
      valor_compra.value = 0;
      valor_cashback.value = 0;
    };
    const MsgAtencao = () => {
      Notify.create({
        icon: "announcement",
        type: "warning",
        multiLine: true,
        progress: true,
        html: true,
        position: "top",
        message: "Selecione o tipo de pagamento!",
      });
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
    return {
      celular_cli,
      codigo_sms,
      passo,
      dialogCancelar,
      mensagem,
      valor_compra,
      valor_cashback,
      Voltar,
      Avançar1,
      Avançar2,
      Avançar3,
      Cancelar,
      MsgAtencao,
      MsgSucesso,
    };
  },
};
</script>

<style></style>
