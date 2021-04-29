import { first_date_month, last_date_month } from "@/util/date.util";
export default {
  data: [],
  pendiente: [],
  cliente: [],
  concepto: [],
  tecnico:[],
  categoria: [],
  estado:[],
  cobrotecnico: [],
  params: {
    desde: first_date_month(),
    hasta: last_date_month(),
  },
  loading: false,
};
