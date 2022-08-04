<template>
  <v-container class="r-login fill-height pa-0 pa-md-1">
    <v-row dense class="r-login__content">
      <v-col cols="12" lg="8" class="d-none d-md-flex"></v-col>
      <v-col cols="12" lg="4" class="d-flex align-center justify-center pa-0">
        <v-sheet elevation="2" class="rounded-lg r-login__card">
          <v-container
            class="d-flex flex-column align-center justify-center fill-height px-10"
          >
            <div class="d-flex flex-column align-center">
              <div class="title text-h5">Bienvenido!</div>
              <img class="r-login__img my-4" :src="require('@/assets/login.jpg')" />
              <div class=" d-sm-none d-md-flex">
                Inicie sesión para continuar
              </div>
            </div>
            <v-form ref="form" @submit.prevent="login" class="my-6">
              <v-row>
                <v-col cols="12">
                  <c-text-field
                    dense
                    color="primary"
                    prepend-inner-icon="person_outline"
                    label="Usuario"
                    :messages="isDemo ? 'demo' : ''"
                    v-model="data.username"
                  ></c-text-field>
                </v-col>
                <v-col cols="12">
                  <c-text-field
                    dense
                    color="primary"
                    :type="visibility ? 'text' : 'password'"
                    :messages="isDemo ? 'demo' : ''"
                    prepend-inner-icon="lock_open"
                    :append-icon="visibility ? 'visibility_off' : 'visibility'"
                    @click:append="visibility = !visibility"
                    label="Contrasena"
                    v-model="data.password"
                  ></c-text-field>
                </v-col>

                <v-col cols="12">
                  <c-switch
                    class="mt-0 pt-0"
                    label="Recuerdame"
                    v-model="data.remember"
                    inset
                  ></c-switch>
                </v-col>
                <v-col cols="12" class="d-flex justify-center">
                  <c-alert
                    dense
                    text
                    type="error"
                    v-if="response"
                    class="caption"
                    >{{ response }}</c-alert
                  >

                  <v-btn type="submit" dark rounded color="primary" @click="login()"
                    >Iniciar Sesion</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import { baseURL } from '@/constans/appSettings'
export default {
  data: () => ({
    color: '#3FA9FB',
    visibility: false,
    data: {
      username: '',
      password: '',
      remember: false
    },
    response: null
  }),
  computed: {
    isDemo () {
      if (baseURL === 'https://backendservicio.ronyparra.com/') return true
      return false
    }
  },
  methods: {
    ...mapActions('auth', ['loginAction']),

    async login () {
      if (!this.$refs.form.validate()) return null
      this.response = await this.loginAction(this.data)
    }
  }
}
</script>
<style lang="scss" scoped>
.h100 {
  height: 100%;
}
.r-login {
  &__img {
    width: 100%;
    max-width: 200px;
    height: auto;
    object-fit: contain;
  }
  &__card {
    height: auto;
    max-width: 350px;
  }
  &__content {
    height: auto;
  }
}
@media (max-width: 500px) {
  .r-login {
    .elevation-2 {
      box-shadow: none !important;
    }
    &__content {
      height: 100%;
    }
    &__card {
      height: 100%;
      max-width: 100%;
    }
  }
}
</style>
