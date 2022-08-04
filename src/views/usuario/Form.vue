<template>
  <div class="fill-height">
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <div>
        <HeaderForm>
          <v-toolbar-title class="flex text-center title">
            {{ $route.name }}
          </v-toolbar-title>
          <BtnDelete
            :text="false"
            v-if="isEdit"
            @click="deleteView = true"
            class="mr-1"
          />
          <BtnClose to="/usuario" />
        </HeaderForm>
        <Delete
          v-model="deleteView"
          vuex-action="usuario/deleteUsuario"
          :id-to-delete="$route.params.id"
          @success="$router.push({ path: '/usuario' })"
        />
      </div>
      <v-container>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" sm="6">
              <TextField ref="usuario1" label="Nombre" v-model="form.nombre" />
            </v-col>
            <v-col cols="12" sm="6">
              <TextField
                ref="usuario1"
                label="Apellido"
                v-model="form.apellido"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <TextField
                ref="usuario1"
                label="Username"
                v-model="form.username"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <TextField
                ref="usuario1"
                label="Password"
                :rules="isEdit ? [] : undefined"
                v-model="form.password"
              />
            </v-col>
            <v-col cols="12">
              <AutocompleteRol multiple v-model="form.usuario_rol_detalle" />
            </v-col>
          </v-row>
        </v-form>
        <div class="d-flex justify-end mt-10 mb-3">
          <v-col cols="12" md="4" lg="3">
            <v-row>
              <v-btn block dark color="primary" rounded @click="guardar()">
              {{ isEdit ? "Modificar" : "Registrar" }}</v-btn
            >
            </v-row>
          </v-col>
        </div>
      </v-container>
    </c-card>
  </div>
</template>
<script>
import BtnClose from '@/components/BtnClose'
import TextField from '@/components/TextField'
import BtnDelete from '@/components/BtnDelete'
import Delete from '../delete/Delete'
import AutocompleteRol from '../usuario_rol/Autocomplete'
import { mapActions, mapGetters } from 'vuex'
import HeaderForm from '../../components/HeaderForm'
export default {
  components: {
    HeaderForm,
    AutocompleteRol,
    BtnDelete,
    BtnClose,
    Delete,
    TextField
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    form: {
      username: '',
      password: '',
      nombre: '',
      apellido: '',
      usuario_rol_detalle: []
    },
    default: {
      username: '',
      password: '',
      nombre: '',
      apellido: '',
      usuario_rol_detalle: []
    }
  }),

  mounted () {
    if (this.$route.params.id) this.editHandler()
  },
  computed: {
    ...mapGetters('usuario', ['getUsuarioId'])
  },
  methods: {
    ...mapActions('usuario', [
      'createUsuario',
      'fetchUsuario',
      'fetchUsuarioId',
      'updateUsuario'
    ]),
    async editHandler () {
      this.isEdit = true
      if (this.getUsuarioId) {
        return (this.form = JSON.parse(JSON.stringify(this.getUsuarioId)))
      }
      await this.fetchUsuarioId({ id: this.$route.params.id })
      this.form = JSON.parse(JSON.stringify(this.getUsuarioId))
    },

    async guardar () {
      if (!this.$refs.form.validate()) return null
      const response = this.isEdit
        ? await this.updateUsuario({
          id: this.$route.params.id,
          form: this.form
        })
        : await this.createUsuario(this.form)
      if (response.success) {
        if (this.isEdit) this.$router.replace({ path: '/usuario' })
        this.form = JSON.parse(JSON.stringify(this.default))
        this.$refs.form.resetValidation()
        this.fetchUsuario()
      }
    }
  }
}
</script>
