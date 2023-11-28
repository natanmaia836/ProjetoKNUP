<template>
  <q-page class="q-pa-xl text-white bg-primary">
    <!-- Maximize Seus Ganhos com o Cashback! -->
    <div class="row items-center">
      <div class="col-md">
        <q-card class="row bg-black q-pa-md card">
          <div class="col-md-4 col-xs-12 text-center self-center">
            <q-img class="imgInicial" src="~assets/cashback.png" />
          </div>

          <div class="col-md col-xs-12">
            <div class="row text-center">
              <span class="text-h3 text-secondary"
                >Maximize Seus Ganhos com o Cashback!</span
              >
            </div>
            <div class="row q-mt-xl justify-center">
              <span class="text-h5"
                >Seus clientes adoram economizar dinheiro enquanto fazem suas
                compras? <br />
                <br />
                Se a resposta for sim, você está no lugar certo!
                <br />
                <br />
                Apresentamos o CashBach, a maneira mais inteligente de ganhar
                dinheiro de volta.</span
              >
            </div>
          </div></q-card
        >
      </div>
    </div>

    <!-- Como Funciona -->
    <div class="row q-mt-xl q-gutter-md">
      <div class="col-md">
        <q-card class="bg-black q-pa-md card">
          <div class="row justify-center text-center">
            <span class="text-h3 text-secondary">Como Funciona?</span>
          </div>

          <div class="row q-mt-xl justify-center">
            <span class="text-h5">
              Com o CashBack seus clientes recebem bonús para que possam ser
              usados na próxima compra. <br />
              <br />
              É fácil de usar e aumentarar seu número de vendas.</span
            >
          </div></q-card
        >
      </div>
      <div class="col-md-4 col-xs text-center">
        <q-img class="img" src="~assets/MoneyLanding.png" />
      </div>
    </div>

    <!-- Benefícios do CashBach -->
    <div class="row q-mt-xl justify-center">
      <div class="col-md-8 text-center">
        <q-card class="q-pa-xl bg-black card">
          <div class="row justify-center">
            <span class="text-h3 text-secondary">Benefícios do CashBach</span>
          </div>

          <div class="row q-mt-md q-gutter-md">
            <div class="col-md-12">
              <q-card class="card">
                <div class="row q-pa-md items-center">
                  <div class="col-md col-xs text-h6 text-black">
                    <span
                      >Quanto mais o cliente compra, mais bônus é gerado.</span
                    >
                  </div>
                </div></q-card
              >
            </div>

            <div class="col-md-12">
              <q-card class="card">
                <div class="row q-pa-md items-center q-gutter-x-md">
                  <div class="col-md-11 col-xs text-h6 text-black">
                    <span>Envio do SMS é feito na hora.</span>
                  </div>
                </div></q-card
              >
            </div>
          </div>

          <div class="row q-gutter-md q-mt-xs">
            <div class="col-md-12">
              <q-card class="card">
                <div class="row q-pa-md items-center">
                  <div class="col-md-11 col-xs text-h6 text-black">
                    <span
                      >Fácil usabilidade e intuitivo tornando o CashBack mais
                      ágil.</span
                    >
                  </div>
                </div></q-card
              >
            </div>

            <div class="col-md-12">
              <q-card class="card">
                <div class="row q-pa-md items-center q-gutter-x-md">
                  <div class="col-md-11 col-xs text-h6 text-black">
                    <span
                      >A cobrança é feita conforme o plano de sua escolha.</span
                    >
                  </div>
                </div></q-card
              >
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Junte-se a Nós Agora! -->
    <div class="row q-mt-xl q-gutter-md">
      <div class="col-md-8">
        <q-card class="bg-secondary q-pa-md card text-black">
          <div class="row justify-center texto text-center">
            <span class="text-h3">Junte-se a Nós Agora!</span>
          </div>
          <div class="row justify-center q-mt-xl">
            <span class="text-h5">
              Não perca mais tempo, junte-se à comunidade que está melhorando a
              qualidade de compra para seus clientes.
              <br /><br />
              Verifique qual o melhor plano para você e se cadastre.</span
            >
          </div></q-card
        >
      </div>
      <div class="col-md col-xs-12 text-center">
        <q-img class="img" src="~assets/comunidade.png" />
      </div>
    </div>

    <!-- Planos -->
    <div class="row q-mt-xl">
      <div class="col q-gutter-md">
        <div class="row justify-center text-secondary texto">
          <div class="col-md-12">
            <q-card class="bg-black text-center card q-pa-md">
              <span class="text-h3">Planos</span></q-card
            >
          </div>
        </div>

        <div class="row justify-center q-gutter-md">
          <div class="col-md-3">
            <q-btn round href="faleconosco">
              <q-card class="card q-pa-xl text-black">
                <div class="row">
                  <q-img src="~assets/numero1.png"></q-img>
                </div>
                <div class="row text-h6 justify-center q-mt-md">
                  <span>3 mil SMS por mês</span>
                </div>
                <div class="row text-h6 justify-center q-mt-md">
                  <span>10 Usuários</span>
                </div>
              </q-card></q-btn
            >
          </div>
          <div class="col-md-3">
            <q-btn round href="faleconosco">
              <q-card class="card q-pa-xl text-black">
                <div class="row">
                  <q-img src="~assets/numero2.png"></q-img>
                </div>
                <div class="row text-h6 justify-center q-mt-md">
                  <span>3 mil SMS por mês</span>
                </div>
                <div class="row text-h6 justify-center q-mt-md">
                  <span>10 Usuários</span>
                </div>
              </q-card>
            </q-btn>
          </div>
          <div class="col-md-2-3">
            <q-btn round href="faleconosco">
              <q-card class="card q-pa-xl text-black">
                <div class="row">
                  <q-img src="~assets/numero3.png"></q-img>
                </div>
                <div class="row text-h6 justify-center q-mt-md">
                  <span>3 mil SMS por mês</span>
                </div>
                <div class="row text-h6 justify-center q-mt-md">
                  <span>10 Usuários</span>
                </div>
              </q-card></q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingPage",
});
</script>

<style scoped>
.img {
  width: 250px;
  height: 250px;
}
.imgInicial {
  width: 250px;
  height: 160px;
}
.texto {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
.card {
  border-radius: 30px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.8);
}
.card:hover {
  background-color: #ffcd29; /* Cor de fundo quando hover */
  /* Adicione outros estilos conforme necessário */
}
</style>
