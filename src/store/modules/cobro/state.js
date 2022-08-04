
import { subtractDays, currentDate } from '@/util/date.util'
export default {
  data: [],
  dataId: null,
  loading: false,
  params: {
    idusuario: null,
    idcliente: null,
    fechadesde: subtractDays(90),
    fechahasta: currentDate(),
    idestadocobro: 2
  }
}
