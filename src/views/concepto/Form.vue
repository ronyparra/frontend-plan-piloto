<template>
  <div class="fill-height">
    <c-card class="fill-height d-flex flex-column justify-space-between">
      <div>
        <HeaderForm>
          <v-toolbar-title class="flex text-center title">
            {{ $route.name }}
          </v-toolbar-title>
          <BtnDelete
            class="mr-1"
            :text="false"
            v-if="isEdit"
            @click="deleteView = true"
          />
          <BtnClose to="/concepto" />
        </HeaderForm>
        <Delete
          v-model="deleteView"
          vuex-action="concepto/deleteConcepto"
          :id-to-delete="$route.params.id"
          @success="$router.push({ path: '/concepto' })"
        />
      </div>
      <v-container>
        <v-form ref="form">
          <v-row >
            <v-col cols="12" sm="4">
              <TextField
                ref="concepto1"
                label="Descripcion"
                v-model="form.descripcion"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <TextNumber
                ref="concepto2"
                label="Precio"
                v-model="form.precio"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <AutocompleteMoneda v-model="form.idmoneda.idmoneda" />
            </v-col>
            <v-col cols="12" sm="4">
              <AutocompleteCategoria v-model="form.idcategoria.idcategoria" />
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
import TextNumber from '@/components/TextNumber'
import BtnDelete from '@/components/BtnDelete'
import Delete from '../delete/Delete'
import AutocompleteMoneda from '../moneda/Autocomplete'
import AutocompleteCategoria from '../categoria/Autocomplete'
import HeaderForm from '../../components/HeaderForm'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    AutocompleteCategoria,
    AutocompleteMoneda,
    BtnDelete,
    BtnClose,
    Delete,
    TextField,
    TextNumber,
    HeaderForm
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    form: {
      descripcion: '',
      precio: '',
      idmoneda: {
        idmoneda: null
      },
      idcategoria: {
        idcategoria: null
      }
    },
    default: {
      descripcion: '',
      precio: '',
      idmoneda: {
        idmoneda: null
      },
      idcategoria: {
        idcategoria: null
      }
    }
  }),

  mounted () {
    if (this.$route.params.id) this.editHandler()
  },
  computed: {
    ...mapGetters('concepto', ['getConceptoId'])
  },
  methods: {
    ...mapActions('concepto', [
      'createConcepto',
      'fetchConcepto',
      'fetchConceptoId',
      'updateConcepto'
    ]),
    async editHandler () {
      this.isEdit = true
      if (this.getConceptoId) {
        return (this.form = JSON.parse(JSON.stringify(this.getConceptoId)))
      }
      await this.fetchConceptoId({ id: this.$route.params.id })
      this.form = JSON.parse(JSON.stringify(this.getConceptoId))
    },

    async guardar () {
      if (!this.$refs.form.validate()) return null
      const response = this.isEdit
        ? await this.updateConcepto({
          id: this.$route.params.id,
          form: this.form
        })
        : await this.createConcepto(this.form)
      if (response.success) {
        const redirect = this.$router.history.current.query.redirect
        if (redirect) this.$router.replace({ path: redirect })
        if (this.isEdit) this.$router.replace({ path: '/concepto' })
        this.form = JSON.parse(JSON.stringify(this.default))
        this.$refs.form.resetValidation()
        this.fetchConcepto()
      }
    }
  }
}
</script>
