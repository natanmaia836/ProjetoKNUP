<template>
  <q-page class="sobre">
    <q-card class="q-pa-md">
      <form>
        <q-input
          class="q-mt-md"
          ref="nameRef"
          outlined
          v-model="form.login"
          label="usuário"
        />
        <q-input
          v-model="form.password"
          label="senha"
          outlined
          type="password"
        />
        <div>
          <q-btn
            no-caps
            class="full-width"
            size="lg"
            icon="login"
            label="Login"
            type="submit"
            color="brown"
          />
        </div>
      </form>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
export default {
  setup() {
    const form = ref({
      login: "",
      password: "",
    });
    return {
      form,
    };
  },
};
</script>
<style>
.sobre {
  position: absolute;
  top: 33%;
  left: 40%;
  width: 30%;
}
</style>
