<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg">
      <div class="row justify-center">
        <span class="text-h4 text-weight-bold">Fale Conosco:</span>
      </div>

      <div class="row justify-center q-gutter-md q-mt-sm">
        <div class="col-md-4 items-center">
          <div class="row column">
            <q-card class="q-pa-md bg-brown">
              <div class="flex justify-center">
                <span class="text-h6 text-weight-bold text-secondary q-mb-md">
                  Whatsapp
                </span>
                <a href="https://api.whatsapp.com/send?phone=5511974058218">
                  <img
                    src="~assets/whatsapp-logo2.png"
                    style="width: 35px; height: auto"
                /></a>
              </div>

              <div class="text-center">
                <span
                  class="text-subtittle2 text-weight-bold text-white text-center"
                >
                  <b>Whatsapp 1:</b>
                  &nbsp;<a
                    class="a"
                    href="https://api.whatsapp.com/send?phone=5511974058218"
                    >+55 (11) 97405-8218</a
                  >
                </span>
              </div>
              <div class="text-center q-mt-md">
                <span
                  class="text-subtittle2 text-weight-bold text-white text-center"
                >
                  <b>Whatsapp 2:</b> &nbsp;<a
                    class="a"
                    href="https://api.whatsapp.com/send?phone=5511974058218"
                    >+55 (11) 95290-6665</a
                  ></span
                >
              </div>
            </q-card>
          </div>
          <div class="row column q-mt-md">
            <q-card class="q-pa-md column bg-brown">
              <div class="flex justify-center">
                <span class="text-h6 text-weight-bold q-mb-md text-secondary">
                  Telefone
                </span>
                <a href="https://api.whatsapp.com/send?phone=5511974058218">
                  <q-icon
                    class="text-secondary"
                    size="sm"
                    name="phone_enabled"
                  ></q-icon>
                </a>
              </div>
              <div class="text-center">
                <span
                  class="text-subtittle2 text-weight-bold text-white text-center"
                >
                  <b>Telefone 1:</b>
                  &nbsp;<a
                    class="a"
                    href="https://api.whatsapp.com/send?phone=5511974058218"
                    >+55 (11) 97405-8218</a
                  >
                </span>
              </div>
              <div class="text-center q-mt-md">
                <span
                  class="text-subtittle2 text-weight-bold text-white text-center"
                >
                  <b>Telefone 2:</b> &nbsp;<a
                    class="a"
                    href="https://api.whatsapp.com/send?phone=5511974058218"
                    >+55 (11) 95290-6665</a
                  ></span
                >
              </div>
            </q-card>
          </div>
          <div class="row q-mt-md">
            <q-btn
              class="full-width"
              icon="send"
              color="black"
              no-caps
              @click="dialogEmail = true"
              label="Se Preferir envie-nos um e-mail"
            ></q-btn>
          </div>
        </div>
        <div class="col-md-4">
          <img
            src="~assets/faleconosco2.jpg"
            style="width: 422px; height: 423px"
          />
        </div>
      </div>
    </q-card>

    <q-dialog v-model="dialogEmail">
      <q-card class="q-pa-md" style="width: 700px; max-width: 80vw">
        <div class="row q-col-gutter-y-md column text-center">
          <div class="col-md">
            <q-input
              style="background-color: white"
              square
              outlined
              v-model="text"
              label="Nome"
            ></q-input>
          </div>
          <div class="col-md">
            <q-input
              style="background-color: white"
              square
              outlined
              v-model="text"
              label="E-mail"
            ></q-input>
          </div>
          <div class="col-md">
            <q-input
              style="background-color: white"
              square
              outlined
              v-model="text"
              label="Descrição"
              type="textarea"
            ></q-input>
          </div>
          <div class="col-md">
            <q-btn
              style="background-color: black"
              color="black"
              label="enviar"
              icon="send"
              @click="enviarEmail()"
              no-caps
            ></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, Notify } from "quasar";

export default defineComponent({
  name: "FaleConosco",

  setup() {
    const dialogEmail = ref(false);

    const enviarEmail = () => {
      dialogEmail.value = false;
      MsgSucesso();
    };

    const MsgSucesso = () => {
      Notify.create({
        icon: "announcement",
        type: "positive",
        progress: true,
        multiLine: true,
        html: true,
        position: "top",
        message: "E-mail enviado com sucesso!",
      });
    };

    return {
      dialogEmail,
      enviarEmail,
    };
  },
});
</script>

<style scoped>
.a {
  text-decoration: none;
  color: white;
}
</style>
