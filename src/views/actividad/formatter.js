import { currencyFormatter } from "@/util/number.util";

export const formatHeader = (header) => {

  return [
    header.map((x) => {
      return x.text;
    }),
  ];
};

export const formatLista = (lista) => {
  return lista.map((x) => {
    return [
      x.fecha,
      x.idcliente.razonsocial,
      x.idcliente_sucursal.descripcion,
      x.solicitante,
      x.idusuario.nombre,
      formatDetalle(x.detalle),
      formatTecnico(x.tecnico),
      x.comentario,
      x.idestadocobro.descripcion,
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
      ")");
  }, "");
};
export const formatTecnico = (tecnico) => {
  return tecnico.reduce((acc, curr) => {
    if (acc != "") acc = acc + ", ";
    return (acc = acc + curr.nombre);
  }, "");
};
