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
          <BtnClose to="/categoria" />
        </HeaderForm>
        <Delete
          v-model="deleteView"
          vuex-action="categoria/deleteCategoria"
          :id-to-delete="$route.params.id"
          @success="$router.push({ path: '/categoria' })"
        />
      </div>
      <v-container>
        <v-form ref="form" @submit.prevent="">
          <v-row >
            <v-col cols="12" sm="12">
              <TextField
                ref="categoria1"
                label="Descripcion"
                v-model="form.descripcion"
              />
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
import { mapActions, mapGetters } from 'vuex'
import HeaderForm from '../../components/HeaderForm'
export default {
  components: {
    HeaderForm,
    BtnDelete,
    BtnClose,
    Delete,
    TextField
  },
  data: () => ({
    isEdit: false,
    deleteView: false,
    form: {
      descripcion: '',
      precio: '',
      idmoneda: {
        idmoneda: null
      }
    },
    default: {
      descripcion: '',
      precio: '',
      idmoneda: {
        idmoneda: null
      }
    }
  }),

  mounted () {
    if (this.$route.params.id) this.editHandler()
  },
  computed: {
    ...mapGetters('categoria', ['getCategoriaId'])
  },
  methods: {
    ...mapActions('categoria', [
      'createCategoria',
      'fetchCategoria',
      'fetchCategoriaId',
      'updateCategoria'
    ]),
    async editHandler () {
      this.isEdit = true
      if (this.getCategoriaId) {
        return (this.form = JSON.parse(JSON.stringify(this.getCategoriaId)))
      }
      await this.fetchCategoriaId({ id: this.$route.params.id })
      this.form = JSON.parse(JSON.stringify(this.getCategoriaId))
    },

    async guardar () {
      if (!this.$refs.form.validate()) return null
      const response = this.isEdit
        ? await this.updateCategoria({
          id: this.$route.params.id,
          form: this.form
        })
        : await this.createCategoria(this.form)
      if (response.success) {
        const redirect = this.$router.history.current.query.redirect
        if (redirect) this.$router.replace({ path: redirect })
        if (this.isEdit) this.$router.replace({ path: '/categoria' })
        this.form = JSON.parse(JSON.stringify(this.default))
        this.$refs.form.resetValidation()
        this.fetchCategoria()
      }
    }
  }
}
</script>
