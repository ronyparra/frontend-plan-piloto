<template>
  <c-container fluid fill-height class="justify-center">
    <c-col
      cols="12"
      sm="6"
      md="4"
      class="fill-height d-flex flex-column justify-space-between "
    >
      <div class="d-flex flex-column align-center">
        <c-img
          class="d-sm-none d-md-flex"
          max-width="60%"
          :src="require('@/assets/login.jpg')"
        ></c-img>
        <div class="title text-h4 ">Bienvenido!</div>
        <div class="caption d-sm-none d-md-flex">
          Inicie sesión para continuar
        </div>
      </div>
      <c-container>
        <c-form ref="form">
          <c-text-field
            color="primary"
            outlined
            autocomplete="off"
            prepend-inner-icon="person_outline"
            rounded
            label="Usuario"
             :messages="isDemo? 'demo' : ''"
            v-model="data.username"
          ></c-text-field>
          <c-text-field
            color="pr"
            outlined
            rounded
            :type="visibility ? 'text' : 'password'"
            autocomplete="off"
            :messages="isDemo? 'demo' : ''"
            prepend-inner-icon="lock_open"
            :append-icon="visibility ? 'visibility_off' : 'visibility'"
            @click:append="visibility = !visibility"
            label="Contrasena"
            v-model="data.password"
          ></c-text-field>
         
        </c-form>
        <div class="mt-n8 d-flex justify-end">
          <c-switch
            label="Recuerdame"
            v-model="data.remember"
            inset
            class="mr-2"
          ></c-switch>
        </div>
         <c-alert dense text type="error" v-if="response" class="caption">{{response}}</c-alert>
      </c-container>

      <c-container>
        <c-btn block dark x-large rounded color="primary" @click="login()"
          >Iniciar Sesion</c-btn
        >
      </c-container>
    </c-col>
  </c-container>
</template>
<script>
import { mapActions } from "vuex";
import {baseURL} from "../../constans/appSettings"
export default {
  data: () => ({
    color: "#3FA9FB",
    visibility: false,
    data: {
      username: "",
      password: "",
      remember: false,
    },
    response: null
  }),
  computed:{
        isDemo(){
      if(baseURL === 'https://backendservicio.ronyparra.com/') return true;
      return false;
    },
  },
  methods: {
    ...mapActions("auth", ["loginAction"]),

    async login() {
      if (!this.$refs.form.validate()) return null;
      this.response = await this.loginAction(this.data);
    },
  },
};
</script>
