<template>
  <div>
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <div>
        <v-toolbar flat>
          <v-toolbar-title class="flex text-center title">
            {{ $route.name }}
          </v-toolbar-title>
          <BtnDelete
            :text="false"
            v-if="isEdit && form.activo"
            @click="deleteView = true"
            class="mr-2"
          />
          <BtnClose to="/pendiente" />
        </v-toolbar>
        <Delete
          v-model="deleteView"
          vuex-action="pendiente/deletePendiente"
          :id-to-delete="$route.params.id"
          @success="$router.push({ path: '/pendiente' })"
        />
      </div>
      <v-container>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" sm="4">
              <TextDate
                ref="pendiente2"
                :readonly="!form.activo"
                label="Fecha"
                v-model="form.fecha"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <AutocompleteTipo
                :readonly="!form.activo"
                v-model="form.idtipo_pendiente.idtipo_pendiente"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <AutocompleteTecnico
                :readonly="!form.activo"
                label="Asignar pendiente a"
                multiple
                return-object
                :rules="[]"
                v-model="form.pendiente_tecnico"
              />
            </v-col>
            <v-col cols="12">
              <TextArea
                :readonly="!form.activo"
                ref="pendiente1"
                label="Descripcion"
                v-model="form.descripcion"
              />
            </v-col>
          </v-row>
        </v-form>
        <div class="d-flex justify-end">
          <v-col cols="12" md="8" lg="4">
          <v-row v-if="form.activo">
            <v-col>
              <v-btn block dark color="primary" rounded @click="guardar()">
                {{ isEdit ? "Modificar" : "Registrar" }}</v-btn
              >
            </v-col>
            <v-col v-if="isEdit">
              <v-btn
                block
                text
                elevation="2"
                color="primary"
                rounded
                @click="sheet = !sheet"
              >
                Finalizar</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        </div>
      </v-container>

      <Finalizar v-model="sheet" />
    </c-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { currentDate } from '@/util/date.util'

import BtnClose from '@/components/BtnClose'
import TextArea from '@/components/TextArea'
import TextDate from '@/components/TextDate'
import BtnDelete from '@/components/BtnDelete'
import Delete from '../delete/Delete'
import Finalizar from './Finalizar'
import AutocompleteTipo from '../tipo_pendiente/Autocomplete'
import AutocompleteTecnico from '../usuario/Autocomplete'
// import HeaderForm from '../../components/HeaderForm'
export default {
  components: {
    AutocompleteTecnico,
    AutocompleteTipo,
    Finalizar,
    BtnDelete,
    BtnClose,
    Delete,
    TextArea,
    TextDate
    // HeaderForm
  },
  data: () => ({
    sheet: false,
    isEdit: false,
    deleteView: false,
    form: {
      activo: true,
      idtipo_pendiente: {
        idtipo_pendiente: null
      },
      fecha: currentDate(),
      descripcion: '',
      pendiente_tecnico: []
    },
    default: {
      activo: true,
      idtipo_pendiente: {
        idtipo_pendiente: null
      },
      fecha: currentDate(),
      descripcion: '',
      pendiente_tecnico: []
    }
  }),

  mounted () {
    if (this.$route.params.id) this.editHandler()
  },
  computed: {
    ...mapGetters('pendiente', ['getPendienteId'])
  },
  methods: {
    ...mapActions('pendiente', [
      'createPendiente',
      'fetchPendiente',
      'fetchPendienteId',
      'updatePendiente',
      'setChangeStatus',
      'fetchDashboard'
    ]),
    async editHandler () {
      this.isEdit = true
      if (this.getPendienteId) {
        return (this.form = JSON.parse(JSON.stringify(this.getPendienteId)))
      }
      await this.fetchPendienteId({ id: this.$route.params.id })
      this.form = JSON.parse(JSON.stringify(this.getPendienteId))
    },

    async guardar () {
      if (!this.$refs.form.validate()) return null
      const response = this.isEdit
        ? await this.updatePendiente({
          id: this.$route.params.id,
          form: this.form
        })
        : await this.createPendiente(this.form)
      if (response.success) {
        if (this.isEdit) this.$router.replace({ path: '/pendiente' })
        this.form = JSON.parse(JSON.stringify(this.default))
        this.$refs.form.resetValidation()
        this.fetchPendiente()
        this.fetchDashboard()
      }
    }
  }
}
</script>
