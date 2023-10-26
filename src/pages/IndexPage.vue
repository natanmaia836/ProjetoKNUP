<template>
  <q-page style="background-color: bisque">
    <div class="row column">
      <div class="col text-center">
        <h5 style="font-weight: bold; box-shadow: ">
          Bem-vindo a <b style="color: white">KN</b
          ><b style="color: orange">UP!</b>
        </h5>
      </div>
      <div class="col">
        <q-img src="~assets/home.png" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
