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
          v-model:pagination="pagination"
          virtual-scroll
          row-key="id"
          dark
          color="amber"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                class="q-mr-sm"
                outline
                round
                dense
                color="negative"
                icon="delete"
                @click="cancelarCashback(props.row)"
                ><q-tooltip>Cancelar Cashback</q-tooltip></q-btn
              >
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuasar, Notify } from "quasar";
import firestoreService from "src/services/FireStoreService";
const cli_celular = ref("");
const pesquisav = ref(false);
const colunas = [
  {
    name: "id",
    required: true,
    label: "Celular",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "valor",
    align: "left",
    label: "Valor da Compra",
    field: "valor",
    sortable: true,
  },
  {
    name: "valorCash",
    align: "left",
    label: "Valor Cashback",
    field: "valorCash",
    sortable: true,
  },
  {
    name: "data_compra",
    align: "left",
    label: "Data da C.",
    field: "data_compra",
  },
  { name: "data_fim", align: "left", label: "Data Fim C.", field: "data_fim" },
  {
    name: "local_compra",
    align: "left",
    label: "Local de C.",
    field: "local_compra",
  },
  { name: "cashback", align: "center", label: "Cashback", field: "cashback" },
  { name: "status", align: "left", label: "Status", field: "status" },
  { name: "actions", align: "center", label: "Ações", field: "actions" },
];
const linhas = ref([]);
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 15,
  // rowsNumber: xx if getting data from a server
});

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
    const { salvaGenericaComID, buscarColecao } = firestoreService();

    onMounted(async () => {
      linhas.value = [];
      await metodoBuscarColecao();
    });

    const metodoBuscarColecao = async () => {
      const result = await buscarColecao("Bonus");

      if (result) {
        await mapeamentoTabela(result);
      }
    };

    const mapeamentoTabela = async (resultado) => {
      resultado.forEach((item) => {
        let itemLinha = {
          id: item.celular_cli,
          valor: item.valor_compra,
          valorCash: item.valor_cashback,
          data_compra: item.data_inicio,
          data_fim: item.data_fim,
          local_compra: item.local,
          cashback: item.cashback,
          status: item.status,
        };
        linhas.value.push(itemLinha);
      });
    };

    const cancelarCashback = () => {
      console.log("ai cancelou");
    };
    return {
      colunas,
      linhas,
      cli_celular,
      pesquisav,
      pagination,
      BuscarCliente,
      limparBusca,
      cancelarCashback,
      metodoBuscarColecao,
    };
  },
};
</script>

<style></style>
