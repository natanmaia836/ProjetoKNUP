<template>
  <q-page class="q-pa-sm">
    <h5><q-icon class="q-mb-sm" name="person"></q-icon>Clientes</h5>
    <div class="row">
      <q-card>
        <q-input
          style="color: whitesmoke"
          outlined
          label="Celular"
          v-model="cli_celular"
          mask="(##) #####-####"
        >
          <template v-if="!pesquisav" v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="search"
              color="primary"
              @click="BuscarCliente()"
            />
          </template>
          <template v-else v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="close"
              color="primary"
              @click="limparBusca()"
            />
          </template>
        </q-input>
      </q-card>
    </div>
    <hr />
    <div class="row">
      <div class="col">
        <q-table
          flat
          bordered
          :rows="linhas"
          :columns="colunas"
          row-key="name"
          dark
          color="amber"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
const cli_celular = ref("");
const pesquisav = ref(false);
const colunas = [
  {
    name: "name",
    required: true,
    label: "Celular",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "valor",
    align: "center",
    label: "Valor da Compra",
    field: "valor",
    sortable: true,
  },
  {
    name: "valorCash",
    label: "Valor Cashback",
    field: "valorCash",
    sortable: true,
  },
  { name: "data_compra", label: "Data da C.", field: "data_compra" },
  { name: "data_fim", label: "Data Fim C.", field: "data_fim" },
  { name: "local_compra", label: "Local de C.", field: "local_compra" },
  { name: "cashback", label: "Cashback", field: "cashback" },
  { name: "status", label: "Status", field: "status" },
];
const linhas = [
  {
    name: "(11) 97627-1753",
    valor: "R$ 120,00",
    valorCash: "R$ 6,00",
    data_compra: "01/11/2023",
    data_fim: "30/11/2023",
    local_compra: "Loja 02 - Bresser Mooca",
    cashback: "5%",
    status: "Ativo",
  },
  {
    name: "(11) 98856-1727",
    valor: "R$ 350,00",
    valorCash: "R$ 17,5",
    data_compra: "15/10/2023",
    data_fim: "15/11/2023",
    local_compra: "Loja 02 - Bresser Mooca",
    cashback: "5%",
    status: "Ativo",
  },
  {
    name: "(11) 97156-7727",
    valor: "R$ 623,00",
    valorCash: "R$ 31,15",
    data_compra: "01/10/2023",
    data_fim: "31/10/2023",
    local_compra: "Loja 02 - Bresser Mooca",
    cashback: "5%",
    status: "Expirado",
  },
  {
    name: "(11) 98922-2727",
    valor: "R$ 173,00",
    valorCash: "R$ 8,65",
    data_compra: "01/11/2023",
    data_fim: "30/11/2023",
    local_compra: "Loja 08 - Juiz de Fora",
    cashback: "5%",
    status: "Ativo",
  },
  {
    name: "(11) 95716-2887",
    valor: "R$ 63,00",
    valorCash: "R$ 3,15",
    data_compra: "07/09/2023",
    data_fim: "23/10/2023",
    local_compra: "Loja 02 - Bresser Mooca",
    cashback: "5%",
    status: "Expirado",
  },
  {
    name: "(11) 93321-1743",
    valor: "R$ 95,00",
    valorCash: "R$ 4,75",
    data_compra: "08/11/2023",
    data_fim: "22/12/2023",
    local_compra: "Loja 06 - Ribeirão Pires",
    cashback: "5%",
    status: "Utilizado",
  },
  {
    name: "(11) 93688-9733",
    valor: "R$ 105,00",
    valorCash: "R$ 1,05",
    data_compra: "02/11/2023",
    data_fim: "28/12/2023",
    local_compra: "Loja 02 - Bresser Mooca",
    cashback: "5%",
    status: "Ativo",
  },
  {
    name: "(11) 96617-2813",
    valor: "R$ 185,00",
    valorCash: "R$ 9,25",
    data_compra: "01/11/2023",
    data_fim: "30/11/2023",
    local_compra: "Loja 08 - Juiz de Fora",
    cashback: "5%",
    status: "Ativo",
  },
  {
    name: "(11) 98687-8883",
    valor: "R$ 765,00",
    valorCash: "R$ 38,25",
    data_compra: "05/07/2023",
    data_fim: "25/08/2023",
    local_compra: "Loja 08 - Juiz de Fora",
    cashback: "5%",
    status: "Ativo",
  },
  {
    name: "(11) 92937-5853",
    valor: "R$ 422,00",
    valorCash: "R$ 21,10",
    data_compra: "05/07/2023",
    data_fim: "25/08/2023",
    local_compra: "Loja 08 - Juiz de Fora",
    cashback: "5%",
    status: "Utilizado",
  },
];

const BuscarCliente = () => {
  if (cli_celular.value.length != 15) {
    pesquisav.value = false;
    MsgAtencao("Celular inválido ou incorreto!");
  } else {
    pesquisav.value = true;
    MsgSucesso("Busca realizada!");
  }
};
const limparBusca = () => {};
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
export default {
  setup() {
    return {
      colunas,
      linhas,
      cli_celular,
      pesquisav,
      BuscarCliente,
      limparBusca,
    };
  },
};
</script>

<style></style>
