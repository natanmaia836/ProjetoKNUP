<template>
  <q-page class="q-pa-md">
    <div class="row window-height justify-center items-center">
      <div class="col-5">
        <q-card dark class="q-pa-md row column align-center text-center">
          <div class="col-12">
            <h5 style="font-weight: 600" v-show="passo == 1">
              Realize o Cashback...
            </h5>
            <h5 style="font-weight: 600" v-show="passo == 2">
              PIN enviado via SMS para {{ form.celular_cli }}
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
              <b style="color: darkgoldenrod">{{ form.valor_cashback }}</b> foi
              gerado sob o valor de R$
              <b style="color: darkgoldenrod">{{ form.valor_compra }}</b>
              para a próxima compra em até 30 dias, cliente:
              <b style="color: darkgoldenrod">{{ form.celular_cli }} </b>
            </p>
          </div>
          <div class="col-1">
            <q-input
              dark
              v-show="passo == 1"
              outlined
              style="font-size: large"
              input-style="text-align: center"
              hint="(XX) XXXXX-XXXX"
              v-model="form.celular_cli"
              mask="(##) #####-####"
            ></q-input>
            <q-input
              dark
              v-show="passo == 2"
              style="font-size: large"
              input-style="text-align: center"
              outlined
              v-model="form.codigo_sms"
              mask="####"
            ></q-input>
            <q-input
              dark
              v-show="passo == 3"
              style="font-size: large"
              input-style="text-align: center"
              outlined
              label="R$"
              v-model="valor"
              mask="#####,##"
              reverse-fill-mask
            ></q-input>
          </div>
          <div class="col q-mt-md" v-if="passo == 1">
            <q-btn
              :disable="form.celular_cli.length < 15"
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
              :disable="form.codigo_sms.length < 4"
              no-caps
              color="orange"
              label="Continuar"
              @click="Avançar2()"
            ></q-btn>
          </div>
          <div class="col q-mt-md q-gutter-x-md" v-if="passo == 3">
            <q-btn no-caps label="Cancelar" @click="Voltar()"></q-btn>
            <q-btn
              :disable="valor.length <= 0"
              no-caps
              color="orange"
              label="Continuar"
              @click="Avançar3()"
            ></q-btn>
          </div>
          <div class="col q-mt-md q-gutter-x-md" v-if="passo == 4">
            <q-btn icon="home" href="/"
              ><q-tooltip class="bg-dark">Home</q-tooltip></q-btn
            >
            <q-btn color="orange" icon="person" href="/clientes"
              ><q-tooltip class="bg-dark">Clientes</q-tooltip></q-btn
            >
          </div>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialogCancelar">
      <q-card dark class="q-pa-md">
        <div class="row">
          <h5>
            Deseja realmente <b style="color: orange">cancelar</b> a operação?
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
            <q-btn
              color="white"
              outline
              no-caps
              label="Sim, cancelar."
              @click="Cancelar()"
            ></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuasar, Notify, date } from "quasar";
import firestoreService from "src/services/FireStoreService";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const dialogCancelar = ref(false);
    const mensagem = ref("");
    const passo = ref(1);
    const valor = ref("");
    const cashback = ref(0);
    const form = ref({
      id: "",
      celular_cli: "",
      codigo_sms: "",
      valor_compra: 0,
      valor_cashback: 0,
      data_inicio: "",
      data_fim: "",
      local: "Loja 02 - Bresser Mooca",
      cashback: "5%",
      status: "Ativo",
    });
    const { salvaGenericaSemID } = firestoreService();

    onMounted(async () => {
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
    const moveToLoginPage = () => {
      // console.log(linha);
      let move_To = "";
      move_To = "/login";
      router.push(move_To);
    };
    // voltar
    const Voltar = () => {
      dialogCancelar.value = true;
    };

    // avançar
    const Avançar1 = () => {
      passo.value = 2;
      MsgSucesso("Código Enviado!");
    };
    const Avançar2 = () => {
      passo.value = 3;
      MsgSucesso("Código Verificado!");
    };
    const Avançar3 = async () => {
      passo.value = 4;
      MsgSucesso("Cashback realizado!");
      mapeamentoValores();
      const result = await salvaGenericaSemID("Bonus", form.value);
    };

    // métodos auxiliares
    const Cancelar = () => {
      passo.value = 1;
      valor.value = "";
      cashback.value = 0;
      form.value = {
        celular_cli: "",
        codigo_sms: "",
        valor_compra: 0,
        valor_cashback: 0,
        data_inicio: "",
        data_fim: "",
        local: "Loja 02 - Bresser Mooca",
        cashback: "5%",
        status: "ativo",
      };
      dialogCancelar.value = false;
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
    const mapeamentoValores = () => {
      // calculo e máscara (cashback e valor)
      cashback.value = (parseFloat(valor.value.replace(",", ".")) * 5) / 100;
      cashback.value = Math.round(cashback.value * 100) / 100;
      cashback.value = cashback.value.toString().replace(".", ",");
      form.value.valor_cashback = "R$" + "" + cashback.value;
      valor.value = valor.value.toString().replace(".", ",");
      form.value.valor_compra = "R$" + "" + valor.value;

      // mapeio de datas
      form.value.data_inicio = new Date().toLocaleDateString();
      const dataAtual = new Date();
      dataAtual.setDate(dataAtual.getDate() + 30);
      form.value.data_fim = dataAtual.toLocaleDateString();
      //
    };
    return {
      form,
      passo,
      dialogCancelar,
      mensagem,
      valor,
      cashback,
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
