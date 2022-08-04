import { firstDateMonth, lastDateMonth } from '@/util/date.util'
export default {
  data: [],
  pendiente: [],
  cliente: [],
  concepto: [],
  tecnico: [],
  categoria: [],
  estado: [],
  cobrotecnico: [],
  params: {
    desde: firstDateMonth(),
    hasta: lastDateMonth()
  },
  loading: false
}
