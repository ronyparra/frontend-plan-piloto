import { subtractDays, currentDate } from '@/util/date.util'
export default {
  data: [],
  dataId: null,
  params: {
    idcliente: null,
    idsucursal: null,
    fechadesde: subtractDays(90),
    fechahasta: currentDate(),
    idestadocobro: 1
  },
  loading: false
}
