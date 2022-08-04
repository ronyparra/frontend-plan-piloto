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
          <BtnClose to="/cobro" />
        </HeaderForm>
        <Delete
          v-model="deleteView"
          vuex-action="cobro/deleteCobro"
          :id-to-delete="$route.params.id"
          @success="$router.push({ path: '/cobro' })"
        />
      </div>
      <v-container>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" sm="4">
              <TextField
                readonly
                :rules="[]"
                label="Descripcion"
                v-model="form.descripcion"
              />
            </v-col>
            <v-col cols="6" sm="4">
              <TextField
                readonly
                label="Cliente"
                v-model="form.idcliente.razonsocial"
              />
            </v-col>
            <v-col cols="6" sm="4">
              <TextNumber
                readonly
                label="Saldo a Cobrar"
                v-model="form.saldoacobrar"
              />
            </v-col>
          </v-row>
        </v-form>

        <c-switch
          label="Aplicar Retencion"
          v-model="form.retencion"
          @change="calcularRetencion()"
        ></c-switch>
        <v-divider class="mb-3" v-if="form.retencion"></v-divider>
        <v-row dense v-if="form.retencion">
          <v-col cols="6" sm="6">
            <TextNumber
              readonly
              label="Saldo Cobrado"
              v-model="form.saldocobrado"
            />
          </v-col>
          <v-col cols="6" sm="6">
            <TextNumber
              readonly
              label="Saldo Retenido"
              v-model="form.saldoretencion"
            />
          </v-col>
        </v-row>

        <v-divider class="mb-3"></v-divider>
        <InputSelect
          label="Seleccione Estado"
          :items="select"
          v-model="form.idestadocobro.idestadocobro"
          item-value="value"
          item-text="text"
        ></InputSelect>
        <TextArea v-model="form.comentario" />
        <div class="d-flex justify-end">
          <v-col cols="12" md="4" lg="3">
            <v-btn block dark color="primary" rounded @click="guardar()"
              >Cobrar</v-btn
            >
          </v-col>
        </div>
      </v-container>
    </c-card>
  </div>
</template>
<script>
import BtnClose from '@/components/BtnClose'
import TextField from '@/components/TextField'
import TextNumber from '@/components/TextNumber'
import InputSelect from '@/components/InputSelect'
import TextArea from '@/components/TextArea'
import BtnDelete from '@/components/BtnDelete'
import Delete from '../delete/Delete'
import { mapActions, mapGetters } from 'vuex'
import HeaderForm from '../../components/HeaderForm'
export default {
  components: {
    HeaderForm,
    BtnDelete,
    BtnClose,
    Delete,
    TextField,
    TextNumber,
    TextArea,
    InputSelect
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    select: [
      {
        value: 3,
        text: 'Cobrado'
      },
      {
        value: 4,
        text: 'Entregado'
      }
    ],
    form: {
      idcliente_cobro: '',
      descripcion: '',
      idcliente: {
        idcliente: '',
        razonsocial: ''
      },
      retencion: false,
      saldoacobrar: 0,
      saldocobrado: 0,
      saldoretencion: 0,
      idestadocobro: {
        idestadocobro: 3
      },
      comentario: ''
    },
    default: {
      idcliente_cobro: '',
      descripcion: '',
      idcliente: {
        idcliente: '',
        razonsocial: ''
      },
      retencion: false,
      saldoacobrar: 0,
      saldocobrado: 0,
      saldoretencion: 0,
      idestadocobro: {
        idestadocobro: 3
      },
      comentario: ''
    }
  }),

  mounted () {
    if (this.$route.params.id) this.editHandler()
  },
  computed: {
    ...mapGetters('cobro', ['getCobroId'])
  },
  methods: {
    ...mapActions('cobro', ['createCobro', 'fetchCobroId', 'updateCobro']),
    async editHandler () {
      this.isEdit = true
      if (this.getCobroId) {
        this.form = JSON.parse(JSON.stringify(this.getCobroId))
        return (this.form.idestadocobro = JSON.parse(
          JSON.stringify(this.default.idestadocobro)
        ))
      }
      await this.fetchCobroId({ id: this.$route.params.id })
      this.form = JSON.parse(JSON.stringify(this.getCobroId))
      return (this.form.idestadocobro = JSON.parse(
        JSON.stringify(this.default.idestadocobro)
      ))
    },
    calcularRetencion () {
      const total = Number(this.form.saldoacobrar)
      if (this.form.retencion) {
        const iva = total / 11
        const retencion = iva * 0.3
        this.form.saldocobrado = Math.floor(total - retencion)
        this.form.saldoretencion = Math.floor(retencion)
      } else {
        this.form.saldocobrado = Math.floor(total)
      }
    },

    async guardar () {
      if (!this.form.retencion) this.form.saldocobrado = this.form.saldoacobrar
      if (!this.$refs.form.validate()) return null
      const response = this.isEdit
        ? await this.updateCobro({
          id: this.$route.params.id,
          form: this.form
        })
        : await this.createCobro(this.form)
      if (response.success) {
        const redirect = this.$router.history.current.query.redirect
        if (redirect) this.$router.replace({ path: redirect })
        if (this.isEdit) this.$router.replace({ path: '/cobro' })
        this.form = JSON.parse(JSON.stringify(this.default))
        this.$refs.form.resetValidation()
      }
    }
  }
}
</script>
