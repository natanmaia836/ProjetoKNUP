<template>
  <q-page class="q-pa-sm">
    <h5
      style="
        text-decoration: underline;
        font-weight: bold;
        border-bottom: solid 2px black;
      "
    >
      <q-icon size="md" name="person"></q-icon>Clientes
    </h5>
    <div class="row">
      <q-card>
        <q-input
          class="bg-dark"
          dark
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

    <div class="row q-mt-md">
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
                class="q-ml-sm q-mr-sm"
                outline
                round
                dense
                color="negative"
                icon="delete"
                @click="metodoPerguntaSeCancelaCashback(props.row)"
                ><q-tooltip>Cancelar Cashback</q-tooltip></q-btn
              >
              <q-btn
                class="q-mr-sm"
                outline
                round
                dense
                color="amber"
                icon="edit_note"
                @click="metodoPerguntaSeEditaCashback(props.row)"
                ><q-tooltip>Editar Celular</q-tooltip></q-btn
              >
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="dialogEditar">
      <q-card class="q-pa-md bg-dark">
        <div class="row justify-center">
          <h5 style="color: white">Editar - Número de Celular</h5>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              dark
              outlined
              label="Celular"
              style="font-size: medium"
              v-model="celularEditar"
              mask="(##) #####-####"
            ></q-input>
          </div>
        </div>
        <div class="row text-center q-col-gutter-x-md q-mt-md">
          <div class="col">
            <q-btn
              class="full-width"
              no-caps
              outline
              color="white"
              label="Cancelar"
              @click="cancelarEdicao()"
            ></q-btn>
          </div>
          <div class="col">
            <q-btn
              :disable="celularEditar.length < 15"
              class="full-width"
              no-caps
              color="orange"
              label="Editar"
              @click="metodoEditarCashback()"
            ></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuasar, Notify, QDialog, Dark } from "quasar";
import firestoreService from "src/services/FireStoreService";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const cli_celular = ref("");
    const celularEditar = ref("");
    const dialogEditar = ref(false);
    const pesquisav = ref(false);
    const colunas = [
      {
        name: "celular",
        required: true,
        label: "Clientes",
        align: "left",
        field: "celular",
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
      {
        name: "data_fim",
        align: "left",
        label: "Data Fim C.",
        field: "data_fim",
      },
      {
        name: "local_compra",
        align: "left",
        label: "Local de C.",
        field: "local_compra",
      },
      {
        name: "cashback",
        align: "center",
        label: "Cashback",
        field: "cashback",
      },
      { name: "status", align: "left", label: "Status", field: "status" },
      { name: "actions", align: "center", label: "Ações", field: "actions" },
    ];
    const linha = ref(null);
    const linhas = ref([]);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 15,
      // rowsNumber: xx if getting data from a server
    });
    const { atualizarParametroDocumento, buscarColecao, excluiDocumentoComID } =
      firestoreService();

    onMounted(async () => {
      let usuario = getUsuario();
      if (!usuario) {
        moveToLoginPage();
      }

      await metodoBuscarColecao("Todos");
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
    // Busca
    const metodoBuscarColecao = async (tipoDeBusca) => {
      linhas.value = [];
      const result = await buscarColecao("Bonus");

      if (result) {
        await mapeamentoTabela(result, tipoDeBusca);
      }
    };
    const mapeamentoTabela = async (resultado, tipoDeBusca) => {
      if (tipoDeBusca == "Todos") {
        resultado.forEach((item) => {
          let itemLinha = {
            id: item.id,
            celular: item.celular_cli,
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
        if (linhas.value.length == 0 || !linhas.value)
          MsgAtencao("Não há clientes!");
      } else {
        resultado.forEach((item) => {
          if (cli_celular.value == item.celular_cli) {
            let itemLinha = {
              id: item.id,
              celular: item.celular_cli,
              valor: item.valor_compra,
              valorCash: item.valor_cashback,
              data_compra: item.data_inicio,
              data_fim: item.data_fim,
              local_compra: item.local,
              cashback: item.cashback,
              status: item.status,
            };
            linhas.value.push(itemLinha);
          }
        });

        if (linhas.value.length == 0 || !linhas.value)
          MsgAtencao("Cliente não encontrado!");
      }
    };
    const BuscarCliente = async () => {
      if (cli_celular.value.length != 15) {
        pesquisav.value = false;
        MsgAtencao("Celular inválido ou incorreto!");
      } else {
        pesquisav.value = true;
        MsgSucesso("Busca realizada!");
        await metodoBuscarColecao("clienteUnico");
      }
    };
    const limparBusca = async () => {
      cli_celular.value = "";
      pesquisav.value = false;
      await metodoBuscarColecao("Todos");
    };

    // Exclusão
    const metodoPerguntaSeCancelaCashback = (linha) => {
      $q.dialog({
        dark: true,
        title: "Cancelar Cashback",
        message: `Deseja cancelar o cashback do cliente ${linha.celular} ?`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await cancelarCashback(linha.id);
      });
    };
    const cancelarCashback = async (linhaID) => {
      const result = await excluiDocumentoComID("Bonus", linhaID);
      if (result) {
        MsgSucesso("Cashback cancelado!");
        await metodoBuscarColecao("Todos");
      } else {
        MsgAtencao("Não foi possível Cancelar cashback!");
      }
    };

    // Edição
    const metodoPerguntaSeEditaCashback = async (linhaTab) => {
      linha.value = linhaTab;
      dialogEditar.value = true;
    };
    const metodoEditarCashback = async () => {
      const result = await atualizarParametroDocumento(
        "Bonus",
        linha.value.id,
        "celular_cli",
        celularEditar.value
      );
      console.log(result);
      if (result) {
        dialogEditar.value = false;
        MsgSucesso("Edição realizada!");
        await metodoBuscarColecao("Todos");
      } else {
        MsgAtencao("Não foi possível editar cashback!");
      }
    };
    const cancelarEdicao = () => {
      dialogEditar.value = false;
      celularEditar.value = "";
      linha.value = null;
    };

    //Métodos Auxiliares
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

    return {
      colunas,
      linhas,
      linha,
      cli_celular,
      celularEditar,
      pesquisav,
      pagination,
      dialogEditar,
      BuscarCliente,
      limparBusca,
      cancelarCashback,
      metodoBuscarColecao,
      metodoPerguntaSeCancelaCashback,
      metodoPerguntaSeEditaCashback,
      metodoEditarCashback,
      cancelarEdicao,
      MsgAtencao,
      MsgSucesso,
    };
  },
};
</script>

<style></style>
