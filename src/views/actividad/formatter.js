import { currencyFormatter } from "@/util/number.util";

export const formatLista = (lista) => {
  return lista.map((x) => {
    return [
      x.fecha,
      x.idcliente.razonsocial,
      x.idcliente_sucursal.descripcion,
      x.solicitante,
      formatDetalle(x.detalle),
      x.comentario,
    ];
  });
};

export const formatDetalle = (detalle) => {
  return detalle.reduce((acc, curr) => {
    if (acc != "") acc = acc + ", ";
    return (acc =
      acc +
      curr.cantidad +
      " " +
      curr.idconcepto.descripcion +
      " (" +
      currencyFormatter(curr.precio * curr.cantidad) +
      " "+curr.idmoneda.abreviatura+")");
  }, "");
};
export const formatTecnico = (tecnico) => {
  return tecnico.reduce((acc, curr) => {
    if (acc != "") acc = acc + ", ";
    return (acc = acc + curr.nombre);
  }, "");
};

export const  formatColor = (estadocobro)=>{
  if(estadocobro === 1) return 'red darken-1';
  if(estadocobro === 2) return 'amber darken-2';
  if(estadocobro === 3) return 'green accent-3';
  return 'light-blue darken-3'
};
