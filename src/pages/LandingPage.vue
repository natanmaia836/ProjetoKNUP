<template>
  <q-page class="q-pa-md text-white">
    <div class="row column">
      <div class="col text-center">
        <h5 style="font-weight: bold">
          Bem-vindo a <b style="color: white">KN</b
          ><b style="color: orange">UP!</b>
        </h5>
        <div class="col-md-8">
          <span class="text-h5"> Venha alavancar as suas vendas!</span>
        </div>
        <div class="col">
          <q-img class="img" src="~assets/home.png" />
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
</style>
