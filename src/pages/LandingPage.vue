<template>
  <q-page class="q-pa-xl text-white bg-primary">
    <!-- Maximize Seus Ganhos com o Cashback! -->
    <div class="row items-center">
      <div class="col-md-8">
        <div class="row text-center textos">
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
      </div>
      <div class="col-md-4 text-center">
        <q-img class="img" src="~assets/home.png" />
      </div>
    </div>

    <!-- Como Funciona -->
    <div class="row q-mt-xl">
      <div class="col-md-4 text-center">
        <q-img class="img" src="~assets/MoneyLanding.png" />
      </div>

      <div class="col-md-8">
        <div class="row textos justify-center">
          <span class="text-h3 text-secondary">Como Funciona?</span>
        </div>

        <div class="row q-mt-xl justify-center">
          <span class="text-h5">
            Com o CashBack seus clientes recebem bonús para que possam ser
            usados na próxima compra. <br />
            <br />
            É fácil de usar e aumentarar seu número de vendas.</span
          >
        </div>
      </div>
    </div>

    <!-- Benefícios do CashBach -->
    <div class="row">
      <div class="col q-gutter-y-md">
        <div class="row textos justify-center">
          <span class="text-h3 text-secondary">Como Funciona?</span>
        </div>

        <div class="row q-mt-xl">
          <q-card class="bg-black">
            <div class="row q-pa-md items-center">
              <div class="col-md">
                <span
                  >Ganhe dinheiro de volta : Quanto mais o cliente compra, mais
                  bônus é gerado.</span
                >
              </div>

              <div class="col-md-2 text-center">
                <q-img src="~assets/MoneyBeneficios.png" />
              </div></div
          ></q-card>
        </div>

        <div class="row">
          <q-card class="bg-black">
            <div class="row q-pa-md items-center q-gutter-x-md">
              <div class="col-md-2 text-center">
                <q-img src="~assets/TempoRapido.png" />
              </div>

              <div class="col-md-8">
                <span
                  >Bônus rápidos: Receba o SMS com valor do bônus gerado na
                  hora.</span
                >
              </div>
            </div></q-card
          >
        </div>

        <div class="row">
          <q-card class="bg-black">
            <div class="row q-pa-md items-center">
              <div class="col-md-8">
                <span
                  >Fácil de usar: Nosso portal é intuitivo e amigável, tornando
                  o processo do CashBack de fácil uso.</span
                >
              </div>

              <div class="col-md-2 text-center">
                <q-img src="~assets/Celular.png" />
              </div></div
          ></q-card>
        </div>

        <div class="row">
          <q-card class="bg-black">
            <div class="row q-pa-md items-center q-gutter-x-md">
              <div class="col-md-2 text-center">
                <q-img src="~assets/Moedas.png" />
              </div>

              <div class="col-md-8">
                <span
                  >Sem custos ocultos: Não cobramos taxas para usar o CashBach.
                  O bônus gerado é 100% seu.</span
                >
              </div>
            </div></q-card
          >
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
  width: 300px;
  height: 300px;
}
.textos {
  text-shadow: 6px 0px 4px rgba(0, 0, 0, 0.7);
}
</style>
