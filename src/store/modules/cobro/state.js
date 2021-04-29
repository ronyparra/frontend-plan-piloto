
import { subtract_days, current_date } from "@/util/date.util";
export default {
  data: [],
  dataId: null,
  loading: false,
  params:{
    idcliente: null,
    fechadesde: subtract_days(90),
    fechahasta: current_date(),
    idestadocobro: 2,
  }
}
